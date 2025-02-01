import { Tuple } from "@lucid-evolution/lucid";
import { BlockfrostProvider, Data, deserializeAddress, Asset, MeshWallet, serializePlutusScript, deserializeDatum, Transaction, AssetMetadata, mConStr, Mint, MeshTxBuilder, ForgeScript, resolveScriptHash, byteString, conStr, ConStr0, integer, Integer, ByteString, PubKeyAddress } from "@meshsdk/core";
import {addrBech32ToHex, skeyToPubKeyHash} from "@meshsdk/core-csl";
import type { PlutusScript } from '@meshsdk/core';


//import blueprint from "./plutus.json";
//import { typeText } from './typewriter';

// CLI-Start

console.log(`
▗▖    ▗▄▖▗▄▄▄▖▗▄▄▄▖▗▄▄▖ ▗▄▄▄▖ ▗▄▖     ▗▄▄▄▖▗▖  ▗▖    ▗▄▄▖  ▗▄▖ ▗▄▄▖ ▗▄▄▄▖▗▖    ▗▄▖ ▗▖  ▗▖▗▄▄▄▖ ▗▄▖ 
▐▌   ▐▌ ▐▌ █  ▐▌   ▐▌ ▐▌  █  ▐▌ ▐▌    ▐▌   ▐▛▚▖▐▌    ▐▌ ▐▌▐▌ ▐▌▐▌ ▐▌  █  ▐▌   ▐▌ ▐▌▐▛▚▖▐▌  █  ▐▌ ▐▌
▐▌   ▐▌ ▐▌ █  ▐▛▀▀▘▐▛▀▚▖  █  ▐▛▀▜▌    ▐▛▀▀▘▐▌ ▝▜▌    ▐▛▀▚▖▐▛▀▜▌▐▛▀▚▖  █  ▐▌   ▐▌ ▐▌▐▌ ▝▜▌  █  ▐▛▀▜▌
▐▙▄▄▖▝▚▄▞▘ █  ▐▙▄▄▖▐▌ ▐▌▗▄█▄▖▐▌ ▐▌    ▐▙▄▄▖▐▌  ▐▌    ▐▙▄▞▘▐▌ ▐▌▐▙▄▞▘▗▄█▄▖▐▙▄▄▖▝▚▄▞▘▐▌  ▐▌▗▄█▄▖▐▌ ▐▌
`);

console.log("A lotocracy experiment...");
console.log("");
console.log("");
console.log("Type '1' if you want to use the first user, type '2' otherwise:");


function hexToDecimal(hex: string): number {
  // Normalize the input to always include the prefix
  if (!hex.startsWith("0x")) {
      hex = "0x" + hex;
  }

  // Convert the hex string to a decimal number
  return parseInt(hex, 16);
}

//import * as readline from 'readline';
//
//const rl = readline.createInterface({
//  input: process.stdin,
//  output: process.stdout
//});
//
//var which_user = true;
//
//
//function getUserChoice() {
//    return new Promise<string>((resolve) => {
//      rl.question('', (answer) => {
//        if (answer === '1') {
//          which_user = true;
//          console.log("You chose the first user.");
//          resolve('user1');  // Resolve with the first user choice
//        } else if (answer === '2') {
//          which_user = false;
//          console.log("You chose another user.");
//          resolve('user2');  // Resolve with the second user choice
//        } else {
//          console.log("Invalid input, please type '1' or '2'.");
//          getUserChoice().then(resolve);  // Ask again if input is invalid
//        }
//      });
//    });
//  }
//
//
//async function execute() {Cannot find name 'getTxBuilder'. Did you mean 'txBuilder'?ts(2552)

//  const userChoice = await getUserChoice();  // Wait for the user input
//  rl.close();  // Close the readline interface after processing input
//}
//  
//// Start the process
//execute();

//console.log(which_user);

const lotocracy_script: PlutusScript = {
    version: "V3",
    code: "59059c59059901010032323232323232253330023232323232323232323232323232533301030040091323300200c1533301130053012375401826464a66602c6032004264a666028600c602a6ea80044c94ccc054c024c058dd500089919191919191919191919191919299981318148010991919192999815181680109919191929998171818801099192999818181980109919192999818181118189baa0011325333031302530323754002264646464a66607060760042646464a666076607c004264a66607202c2a66607266e3c049221044c6f746f0015333039302c011153330393375e6e9ccc0f4dd48061981e9ba800b4bd701ba73303d37520246607a6ea00452f5c0200229405280a5014a066e2007801058dd7181e000981e0021bae303a00316375a607200260720046eb0c0dc004c0ccdd50008b181a98191baa0011630253031375400a6eb4c0c0008dd718170008b1818800998039bab3020302d37540020362c605e00264660020026eb0c080c0b0dd50131129998170008a5eb804cc894ccc0b4c94ccc0b8c084c0bcdd5000899b8f01e375c606660606ea8004528181298179baa3025302f375400426606200466008008002266008008002606000260620026eb4c0a8008dd718140008b1815800998009bab302a302b302b302b302b3027375404202a4464a66604e603460506ea800452f5bded8c026eacc0b0c0a4dd500099198008008019129998158008a6103d87a8000132333222533302c3372200e0062a66605866e3c01c00c4cdd2a4000660606e980092f5c02980103d87a8000133006006001375c60540026eacc0ac004c0bc008c0b4004cdd7980d98129baa301a48811ce2782b6c218ee43c2f9940efc5f62195be0e6e3026e368fddc53f6ff00301b302537546036604a6ea8c060c094dd50088b1bad30270013027002375a604a002604a0046eb4c08c004c08c008dd7181080098108011bad301f001301f002375c603a002603a0046eb8c06c004c05cdd50008b180c980b1baa001163009301537546010602a6ea800458c05c004dd6180318099baa00d14a06eb8c054c048dd50050a999808180180489919911980200709919299980c180d801099299980b1804180b9baa0011325333017300b3018375400226464646464646464646464646464a6660506056004264a66604c6034604e6ea80504c8c8c8c8c8c8c94ccc0c0c0cc0084c8c94ccc0bcc08800454ccc0bc02854ccc0bccdc480980288010a5014a02a66605e60420022a66605e0142a66605e66e1c01404c40085280a5014a0605e6ea80a4cdc7a999816981099b86323233300100148001200022253330313370e0020082004266600600666e00cdc1001241000866e38064004cdc0000a40046e3405520041005100400116375c60620026eb0c0c0c0c4c0c4c0c4c0c4c0c4c0c4c0c4c0c4c0b4dd50139bad302f3030004375c605c605e0046eb8c0b4004dd6181600098141baa302b302837540282c66ebcc074c09cdd5180e24411ce2782b6c218ee43c2f9940efc5f62195be0e6e3026e368fddc53f6ff00301d30273754603a604e6ea8c068c09cdd50088b1bad30290013029002375a604e002604e0046eb4c094004c094008dd7181180098118011bad30210013021002375c603e002603e0046eb8c074004c064dd50008b180d980c1baa00116300b301737546014602e6ea800458c064004dd61804180a9baa00f301600130163017001301237540142c4464a666024600c0022a66602a60286ea800c0085854ccc048c01400454ccc054c050dd50018010b0a99980918020008a99980a980a1baa0030021616301237540046e1d2004370e90011b87480008c044c0480048c040c044c0440048cdd2a40006601c66e9520023300e375200297ae03300e4c103d87a80004bd701180700098041baa001300b300c003300a002300900230090013004375400229309b2b2b9a5573aaae7955cfaba05742ae881"
}


const { address: scriptAddress } = serializePlutusScript(lotocracy_script, undefined, 1, false);
console.log("Loto script address:" + " " + scriptAddress);



const blockchainProvider = new BlockfrostProvider('mainnetUL5mZhjwzx74yL1FU4FaSMfXNmSz8oFy');


//const fortuna_utxos = await blockchainProvider.get('/addresses/addr1w838s2mvyx8wg0p0n9qwl30kyx2murnwxqnwx68am3fldlc5ecphg/utxos');
//console.log(fortuna_utxos[0]);

type FortunaDatum = {
    constructor: number;
    fields: [
      { int: number },
      { bytes: string },
      { int: number },
      { int: number },
      { int: number },
      { int: number },
      { bytes: string }
    ];
  };


const utxos = await blockchainProvider.fetchAddressUTxOs('addr1w838s2mvyx8wg0p0n9qwl30kyx2murnwxqnwx68am3fldlc5ecphg');
console.log(utxos);
const serialized_datum = utxos[0].output.plutusData;
const deserialize_datum: FortunaDatum = deserializeDatum(serialized_datum ?? 'undefined');
const current_block = deserialize_datum.fields[0].int;
console.log("Fortuna current block:" + current_block);
console.log(deserialize_datum.fields[1].bytes);


var arbitrageNumber = hexToDecimal(current_block.toString()) % 2 
console.log("Arbiatrage number:" + " " + arbitrageNumber);



const sk_2 = "xprv1pzau0m3m4k22a7lyqummqg5h2g6wh96f3emxr7f7gppnehru04gqr5c3acvn92gpypsq6agm6c3m7q8q788pjjts3kcpmyjlk4gd5jv922jupppcg4cymva5jr5lw4lxng4u0wtw6wppymwtytyl98qqdv96ccxx" 
const sk_1 = "xprv1zp6frpv9hu5y8nvcdz3umv9z4wang0f5k433rzyvj7xlefxmy3f20hg30jsnwyvazz87e80fzngd9tgcdmut62n80ve3cq8c7px7lg6tc4vtaqxrg8nkqtx4jxkqm4sgt0as4hc70q29xkxrzzmk64f38yr2ns3p"


const wallet_2 = new MeshWallet({
    networkId: 1, 
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: 'root',
      bech32: sk_2,
    },
});


const wallet_1 = new MeshWallet({
    networkId: 1, 
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
      type: 'root',
      bech32: sk_1,
    },
});

//console.log(wallet_1);
//console.log(wallet_2);


const wallet_1_base_address = 'addr1qx3pp83wjr4jzvtac7d68st408c4tss7qqgtv0xs85q4madcnh2jd4zc9ed9qm70del3swqhc0ppfxdvh3vjssq60y0szdny6y';
const wallet_2_base_address = 'addr1q9sqhzs5jpcnwrtyr87pfmclpslen2j5elyljcax996g9hv3f8kvwmsu6xfajlg7luwcv6jp8f94lgppcpdhykd4wlksdg92ku';
const pkh_1 = 'a2109e2e90eb21317dc79ba3c17579f155c21e0010b63cd03d015df5'
const pkh_2 = '600b8a149071370d6419fc14ef1f0c3f99aa54cfc9f963a6297482dd'
console.log(deserializeAddress(wallet_1_base_address));
console.log(deserializeAddress(wallet_2_base_address));
const wallet_1_utxos = await blockchainProvider.fetchAddressUTxOs(wallet_1_base_address);



const redeemerCreate = {
  data: { alternative: 0, fields: [] },
};


//export type LotoDatum  = ConStr0<[
//  Tuple<ByteString, ByteString>,
//  Integer
//]>

//const LotoDatum = {
//  data: { alternative: 0, fields: [(byteString("a0bd"),byteString("a0bd")), integer(1000000)] },
//};

const lotoDatum_Mint = conStr(0, [(byteString(pkh_1), byteString(pkh_2)),  integer(current_block + 1)]);

const assetMetadata: AssetMetadata = {
  "name": "Loto",
  "image": "",
  "mediaType": "",
  "description": "This is a lotocracy token!"
};



//const balance = await wallet.getBalance();
// const collateralUtxos = await wallet.getCollateral();
// const txHash = await wallet.submitTx(signedTx);
// const txhash = await wallet.createCollateral();


// Define datum


const mint_loto_value: Asset[] = [
  { unit: "lovelace", quantity: "1500000" },
  { unit: "4c6f746fb01ffa5e2e88ffdcd672a6a9d6ffa699b06e61feb817f7b42bb23cd2", quantity: "1" },
];


console.log(await wallet_1.getUtxos());

const collateral: Asset[] = [
  { unit: "lovelace", quantity: "5000000" },
];

//const collateral: UTxO = (await wallet.getCollateral())[0]!;

const reference_input = (utxos[0].input.txHash);

const txBuilder = new MeshTxBuilder({
  fetcher: blockchainProvider, 
  evaluator: blockchainProvider,
  verbose: true,
});


const unsignedMintTx = await txBuilder
  .txIn("8230dfdb64735001072d7cb02f355dc680560127305be9c1316b03e0b8ea1e56",0)
  .setNetwork("mainnet")
  .mintPlutusScriptV3()
  .mint("1","b01ffa5e2e88ffdcd672a6a9d6ffa699b06e61feb817f7b42bb23cd2", "4c6f746f")
  .mintingScript(lotocracy_script.code)
  .mintRedeemerValue(redeemerCreate)
  .metadataValue("721", assetMetadata)
  .readOnlyTxInReference(reference_input, 0)
  .selectUtxosFrom(wallet_1_utxos)
  .txInCollateral("d5b182f947df15ed34ff0b5500c5b9012504b791d06182e22172c5f9648a34e9", 0, collateral, wallet_1_base_address)
  .txOut(scriptAddress, mint_loto_value)
  .changeAddress(wallet_1_base_address)
  .complete()



const signedTx =  wallet_1.signTx(unsignedMintTx, true);
const txHash = await wallet_1.submitTx(signedTx);
console.log(txHash);




  //.txIn(txHash: [string](/types/string), txIndex: [number](/types/number), amount: Asset[], address: [string](/types/string), scriptSize: [number](/types/number))

  
//txBuilder
//  .mintPlutusScriptV3()
//  .mint("1", policyId, CIP68_100(tokenNameHex))
//  .mintingScript(scriptCode)
//  .mintRedeemerValue(mConStr0([]))
//  .mintPlutusScriptV2()
//  .mint("1", policyId, CIP68_222(tokenNameHex))
//  .mintingScript(scriptCode)
//  .mintRedeemerValue(mConStr0([]))


//const unsignedTx = await MeshTxBuilder 
//  .mint("1", policyId, tokenNameHex)
//  .mintingScript(forgingScript)
//  .metadataValue("721", metadata)
//  .changeAddress(changeAddress)
//  .selectUtxosFrom(utxos)
//  .complete()



// const tx = new Transaction({ initiator: wallet_1, fetcher: blockchainProvider, verbose: true }).
//  mintAsset(lotocracy_script, asset, redeemerCreate)

//const unsignedTx = await tx.build();
//const signedTx = await wallet_1.signTx(unsignedTx, true);
//const txHash = await wallet_1.submitTx(signedTx);
//console.log(txHash);

//const txhash = await wallet.createCollateral();

//const asset: Mint = {
//  assetName: 'MeshToken',
//  assetQuantity: '1',
//  metadata: assetMetadata,
//  label: '721',changeAddress(addr: [string](/types/string))
//  recipient: 'addr_test1vpvx0sacufuypa2k4sngk7q40zc5c4npl337uusdh64kv0c7e4cxr' 
//};





