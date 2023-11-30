import fs from "fs";
import {getZkSyncPepeResults} from "./scripts/checkers/zkSyncPepe.js";

const filePath = './wal/zkPepe.json';
//const filePath2 = './wal/zkSyncWallets.txt';

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//const data2 = fs.readFileSync(filePath2, 'utf8');
//const lines = data2.split('\n');

//const filteredData = data.filter(item => !lines.includes(item));


const responses = {
    //pilotDog: [],
    //moonsDust: [],
    zkSyncPepe: [],
};

let pilotDogTotalAmount = 0;
let moonsDustTotalAmount = 0;
let zkSyncPepeTotalTotalAmount = 0;
let pilotDogAmountWallets = 0;
let moonsDustAmountWallets = 0;
let zkSyncPepeAmountWallets = 0;

for (const line of data) {
    //const pilotDogDataArr = await getPilotDogAirdropInfo(line);
    //const moonsDustDataArr = await getMoonsDustInfo(line);
    const zkSyncPepe = await getZkSyncPepeResults(line.trim());

    // responses.pilotDog.push(pilotDogDataArr[0]);
    // responses.moonsDust.push(moonsDustDataArr[0]);
    responses.zkSyncPepe.push(zkSyncPepe);

    //pilotDogTotalAmount += pilotDogDataArr[1];
    //moonsDustTotalAmount += moonsDustDataArr[1];
    zkSyncPepeTotalTotalAmount += zkSyncPepe[1];

    console.log(`Total ZkSyncPepeTokens: ${zkSyncPepeTotalTotalAmount}`)

    // if (pilotDogDataArr[1] !== 0) {
    //     pilotDogAmountWallets++;
    // }
    //
    // if (moonsDustDataArr[1] !== 0) {
    //     moonsDustAmountWallets++;
    // }

    if (zkSyncPepe[1] !== 0) {
        zkSyncPepeAmountWallets++;
    }
}
//
// responses.pilotDog.push({
//     totalTokens: pilotDogTotalAmount,
//     totalWallets: pilotDogAmountWallets
// });
//
// responses.moonsDust.push({
//     totalTokens: moonsDustTotalAmount,
//     totalWallets: moonsDustAmountWallets
// });

responses.zkSyncPepe.push({
    totalTokens: zkSyncPepeTotalTotalAmount,
    totalWallets: zkSyncPepeAmountWallets
});

const jsonFileName = 'airdrops.json';
fs.writeFileSync(`./wal/${jsonFileName}`, JSON.stringify(responses, null, 2));
console.log(`Responses saved to ${jsonFileName}`);

