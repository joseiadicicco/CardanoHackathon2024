use aiken/collection/dict
use cardano/address.{Address, from_script}
use cardano/assets.{PolicyId, tokens}
use cardano/transaction.{
  InlineDatum, OutputReference, Transaction, find_script_outputs,
}
use loto

const fortuna_script_hash: ByteArray = #"e2782b6c218ee43c2f9940efc5f62195be0e6e3026e368fddc53f6ff"

pub type TargetState {
  nonce: ByteArray,
  miner: ByteArray,
  block_number: Int,
  current_hash: ByteArray,
  leading_zeros: Int,
  target_number: Int,
  epoch_time: Int,
}

// Lotocracy actions

pub type LotoRedeemer {
  Create
  Claim
  HardcoreClaim
}

pub type LotoDatum {
  participants: (ByteArray, ByteArray),
  block_commitment: Int,
}

validator lotocracy {
  mint(rdm: LotoRedeemer, policy_id: PolicyId, self: Transaction) {
    when rdm is {
      Create -> {
        // Get Fortuna reference input.
        expect [ref_input] = self.reference_inputs
        expect InlineDatum(fortuna_datum) = ref_input.output.datum
        expect TargetState { block_number, .. } = fortuna_datum

        // Is the reference input coming from the fortuna address?
        let fortuna_address = from_script(fortuna_script_hash)
        let is_reference_input_correct: Bool =
          fortuna_address.payment_credential == ref_input.output.address.payment_credential

        // Get minted Value
        expect [Pair(token_name, amount)] =
          self.mint
            |> tokens(policy_id)
            |> dict.to_pairs()

        // Get outputs sent to this script.
        expect [own_output] = find_script_outputs(self.outputs, policy_id)

        // Does output contains the Crown Token?
        expect [Pair(crown, crown_amount)] =
          tokens(own_output.value, policy_id) |> dict.to_pairs()

        // Get datum sent to this script 
        expect InlineDatum(own_dat) = own_output.datum
        expect LotoDatum { participants: _p, block_commitment: bc } = own_dat

        // Is block commitment greater than the current Fortuna block?
        let is_commitment_correct: Bool = bc > block_number

        and {
          is_reference_input_correct,
          token_name == #"4c6f746f",
          amount == 1,
          (crown, crown_amount) == (token_name, amount),
          is_commitment_correct,
        }
      }

      _ -> False
    }
  }

  spend(
    datum: Option<LotoDatum>,
    redeemer: LotoRedeemer,
    _utxo: OutputReference,
    self: Transaction,
  ) {
    // Get Fortuna reference input.
    expect [ref_input] = self.reference_inputs
    expect InlineDatum(fortuna_datum) = ref_input.output.datum
    expect TargetState { nonce, block_number, .. } = fortuna_datum

    // Is the reference input coming from the fortuna address?
    let fortuna_address = from_script(fortuna_script_hash)
    let is_reference_input_correct: Bool =
      fortuna_address.payment_credential == ref_input.output.address.payment_credential

    // Expect a Loto Datum from this script
    expect Some(dat) = datum
    let LotoDatum {
      participants: (delegate_1, delegate_2),
      block_commitment: bc,
    } = dat

    expect [signer] = self.extra_signatories

    let selected_delegate: ByteArray =
      if loto.hex_to_dec(nonce) % 2 == 0 {
        delegate_1
      } else {
        delegate_2
      }

    let delegate_is_correct = selected_delegate == signer

    when redeemer is {
      Claim -> and {
          is_reference_input_correct,
          bc >= block_number,
          delegate_is_correct,
        }

      HardcoreClaim -> and {
          is_reference_input_correct,
          bc == block_number,
          delegate_is_correct,
        }

      _ -> False
    }
  }

  else(_) {
    fail
  }
}

