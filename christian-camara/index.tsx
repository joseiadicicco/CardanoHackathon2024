import { useState } from "react";
import type { NextPage } from "next";
import { useWallet } from '@meshsdk/react';
import { CardanoWallet } from '@meshsdk/react';

const Home: NextPage = () => {
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function votar( voto: String) {
    if (wallet) {






      const dRep = await wallet.getDRep();
      const dRepId = dRep.dRepIDCip105;
      
      const utxos = await wallet.getUtxos();
      const changeAddress = await wallet.getChangeAddress();
      
      const txBuilder = getTxBuilder();
      txBuilder
        .vote(
          {
            type: "DRep",
            drepId: dRepId,
          },
          {
            txHash: 'aff2909f8175ee02a8c1bf96ff516685d25bf0c6b95aac91f4dfd53a5c0867cc',
            txIndex: 0,
          },
          {
            voteKind: voto,
          },
        )
        .selectUtxosFrom(utxos)
        .changeAddress(changeAddress);
      
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
          <h1>Votar propuesta</h1>
            <button
              type="button"
              onClick={() => votar("Yes")}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Votar SI
            </button>
            <button
              type="button"
              onClick={() => votar("No")}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Votar NO
            </button>
            <button
              type="button"
              onClick={() => votar("Abstend")}
              disabled={loading}
              style={{
                margin: "8px",
                backgroundColor: loading ? "orange" : "grey",
              }}
            >
              Votar Neutral
            </button>
        </>
      )}
    </div>
  );
};

export default Home;