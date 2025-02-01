use aiken/collection/list
use cardano/address.{Script, VerificationKey}
use cardano/governance.{
  Abstain, ConstitutionalCommitteeMember, DelegateRepresentative,
  GovernanceActionId, No, StakePool, Voter, Yes,
}
use cardano/transaction.{Transaction}

type Foo {
  Foo(Int)
}
validator elecciones {
  vote(redeemer: Data, _voter: Voter, transaction: Transaction) {
    assert_redeemer(redeemer)

//    let votes = transaction.votes
//list.at(votes, 0)

    True
  }

  else(_ctx) {
    fail
  }
}

fn assert_redeemer(data: Data) {
  let is_valid =
    if data is Foo(42): Foo {
      trace data
      True
    } else if data is Void {
      trace data
      True
    } else {
      False
    }

  expect is_valid
  Void
}