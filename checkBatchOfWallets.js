import fs from "fs";
import {getZkFairResults} from "./scripts/checkers/zkfair.js";
import {getStrakRocketResults} from "./scripts/checkers/strakRocket.js";

const filePath = './wal/wallets/starknet.json';
//const filePath2 = './wal/zkSyncWallets.txt';

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//const data2 = fs.readFileSync(filePath2, 'utf8');
//const lines = data2.split('\n');

//const filteredData = data.filter(item => !lines.includes(item));


const responses = {
    starkRocket: [],
    starkRocketTotal: {
        totalTokens: 0,
        totalWallets: 0
    }
};


for (const line of data) {
    const data = await getStrakRocketResults(line.trim());
    responses.starkRocket.push(data);

    if (data[1] !== 0) {
        responses.starkRocketTotal.totalTokens = responses.starkRocketTotal.totalTokens + data[1];
        console.log(`Add New tokens Total ZkFairTokens: ${responses.starkRocketTotal.totalTokens}`)
        responses.starkRocketTotal.totalWallets++;
    }

    const jsonFileName = 'airdrops.json';
    fs.writeFileSync(`./wal/${jsonFileName}`, JSON.stringify(responses, null, 2));
    console.log(`Responses saved to ${jsonFileName}`);
}



