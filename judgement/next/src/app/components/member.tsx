"use client"

import {ThumbsUp, ThumbsDown, Eye} from 'lucide-react'
import {useState} from "react";
import Score from "./score";
import { useWallet } from "@meshsdk/react";
import { BlockfrostProvider, MeshTxBuilder } from "@meshsdk/core";
import {trimString} from "../utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Member({ member, getJudgments }: { member: MemberInterface, getJudgments: (m: MemberInterface) => void }) {
  // State
  const [reason, setReason] = useState<string>('');

  // Wallet Hook
  const { wallet, connected, name, connect, disconnect, error } = useWallet();

  const blockchainProvider = new BlockfrostProvider('preprodhtDsvF5CZPKqa9njQcfoo55O7LP0xQON');

  const txBuilder = new MeshTxBuilder({
    fetcher: blockchainProvider,
    evaluator: blockchainProvider,
    verbose: true,
  });

  // Actions
  const judge = async (coldCredBech: string, judgment: 'up' | 'down') => {
    if (!reason) {
      toast.warn('Please add a reason for your judgment', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (!connected) {
        toast.warn('Please connect a wallet!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        try {
          const utxos = await wallet.getUtxos();
          const changeAddress = await wallet.getChangeAddress();

          const balance = (await wallet.getLovelace());

          const tag = "77777";
          const metadata = {
              "member": `${coldCredBech}`,
              "reason": `${reason}`,
              "balance": `${balance}`,
              "judgement": `${judgment}`
          };

          const unsignedTx = await txBuilder
            .changeAddress(changeAddress)
            .metadataValue(tag, metadata)
            .selectUtxosFrom(utxos)
            .complete();

          const signedTx = await wallet.signTx(unsignedTx);
          const txHash = await wallet.submitTx(signedTx);
          console.log("Transaction submitted:", txHash);

          // alert('Your sentiment: ' + judgment + '! With your reason: ' + reason + ' within transaction: ' + txHash)
          toast.success(`Your sentiment: ${judgment}! With your reason: ${reason}. Transaction: ${txHash}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } catch (error) {
          console.error("Error handling transaction:", error);
        }
      }
      getJudgments({ ...member, judgment, reason });
    }
  };

  return (
    <li key={member.coldCredBech} className="border p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-4 mb-2">
        <div className={'w-12 h-12 p-2 border rounded flex items-center'}>
          <a href={member.twitter} target="_blank" className={'hover:scale-[1.2] transition'}>
            <img
              className="dark:invert block"
              src={member.logoURI}
              alt={member.name}
              width={42}
              height={48}
            />
          </a>
        </div>
        <span className="font-semibold">{member.name}</span>
        <span>{trimString(member.coldCredBech)}</span>
        <div className="font-bold ml-auto flex gap-2" aria-live="polite">
          <button onClick={() => {
            getJudgments(member)
          }}>
            <Eye />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 border pl-2">
        <button
          onClick={() => judge(member.coldCredBech, 'up')}
        >
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span className="sr-only">Up judgment</span>
        </button>
        <button
          onClick={() => judge(member.coldCredBech, 'down')}
        >
          <ThumbsDown className="w-4 h-4 mr-1" />
          <span className="sr-only">Down judgment</span>
        </button>
        <input
          type="text"
          placeholder="Add a reason for your sentiment"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex-grow border-l p-1 px-2"
        />
      </div>
    </li>
  );
}
