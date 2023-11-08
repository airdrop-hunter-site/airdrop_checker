import fs from "fs";
import {getPilotDogAirdropInfo} from "./scripts/checkers/pilotDog.js";
import {getMoonsDustInfo} from "./scripts/checkers/moonsDust.js";

const filePath = './wal/arbNovaWallets.txt';

const data = fs.readFileSync(filePath, 'utf8');
const lines = data.split('\n');

const responses = {
    pilotDog: [],
    moonsDust: [],
};

let pilotDogTotalAmount = 0;
let moonsDustTotalAmount = 0;
let pilotDogAmountWallets = 0;
let moonsDustAmountWallets = 0;

for (const line of lines) {
    const pilotDogDataArr = await getPilotDogAirdropInfo(line);
    const moonsDustDataArr = await getMoonsDustInfo(line);

    responses.pilotDog.push(pilotDogDataArr[0]);
    responses.moonsDust.push(moonsDustDataArr[0]);

    pilotDogTotalAmount += pilotDogDataArr[1];
    moonsDustTotalAmount += moonsDustDataArr[1];

    console.log(`Total MoonDustTokens: ${moonsDustTotalAmount}`)

    if (pilotDogDataArr[1] !== 0) {
        pilotDogAmountWallets++;
    }

    if (moonsDustDataArr[1] !== 0) {
        moonsDustAmountWallets++;
    }
}

responses.pilotDog.push({
    totalTokens: pilotDogTotalAmount,
    totalWallets: pilotDogAmountWallets
});

responses.moonsDust.push({
    totalTokens: moonsDustTotalAmount,
    totalWallets: moonsDustAmountWallets
});

const jsonFileName = 'airdrops.json';
fs.writeFileSync(`./wal/${jsonFileName}`, JSON.stringify(responses, null, 2));
console.log(`Responses saved to ${jsonFileName}`);

