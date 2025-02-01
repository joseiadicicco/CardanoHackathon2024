import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';
import { keepRelevant, MeshTxBuilder, Quantity, Unit } from "@meshsdk/core";

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  async function registrar() {
    if (wallet) {


        const dRep = await wallet.getDRep();
        const dRepId = dRep.dRepIDCip105;
        
        const anchorUrl = 'https://security.machost.co/plutus.json';
        const anchorHash = await getMeshJsonHash(anchorUrl);
        
        // get utxo to pay for the registration
        const utxos = await wallet.getUtxos();
        const registrationFee = "500000000";
        const assetMap = new Map<Unit, Quantity>();
        assetMap.set("lovelace", registrationFee);
        const selectedUtxos = keepRelevant(assetMap, utxos);
        
        const changeAddress = await wallet.getChangeAddress();
        
        txBuilder
          .drepRegistrationCertificate(dRepId, {
            anchorUrl: anchorUrl,
            anchorDataHash: anchorHash,
          })
          .changeAddress(changeAddress)
          .selectUtxosFrom(selectedUtxos);
        
        const unsignedTx = await txBuilder.complete();
        const signedTx = await wallet.signTx(unsignedTx);
        const txHash = await wallet.submitTx(signedTx);



    }
  }
  return (
    <div>
      <h1>Connect Wallet</h1>
      <CardanoWallet />
      {connected && (
        <>
          <h1>Registro DREP</h1>
            <button
              type="button"
              onClick={() => registrar()}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Registrar drep
            </button>
        </>
      )}
    </div>
  );
};

export default Home;

function getMeshJsonHash(anchorUrl: string) {
    throw new Error("Function not implemented.");
}
