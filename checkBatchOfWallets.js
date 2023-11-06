import fs from "fs";
import {getPilotDogAirdropInfo} from "./scripts/checkers/pilotDog.js";

const filePath = './wal/arbNovaWallets.txt';

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n');

const responses = {
    pilotDog: [],
};

let pilotDogTotalAmount = 0;
let pilotDogAmountWallets = 0;

for (const line of lines) {
    const pilotDogDataArr = await getPilotDogAirdropInfo(line);

    responses.pilotDog.push(pilotDogDataArr[0]);

    pilotDogTotalAmount += pilotDogDataArr[1];

    if (pilotDogDataArr[0].data !== null) {
        pilotDogAmountWallets++;
    }
}

responses.pilotDog.push({
    totalTokens: pilotDogTotalAmount,
    totalWallets: pilotDogAmountWallets
});

const jsonFileName = 'airdrops.json';
fs.writeFileSync(`./wal/${jsonFileName}`, JSON.stringify(responses, null, 2));
console.log(`Responses saved to ${jsonFileName}`);

