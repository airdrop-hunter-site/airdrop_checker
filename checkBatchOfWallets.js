import fs from "fs";
import {getSmartLayerAirdrop} from "./scripts/checkers/smartLayerChecker.js";

const filePath = './wal/wallets/bonus27.json';
//const filePath2 = './wal/zkSyncWallets.txt';

const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//const data2 = fs.readFileSync(filePath2, 'utf8');
//const lines = data2.split('\n');

//const filteredData = data.filter(item => !lines.includes(item));


const responses = {
    data: [],
    total: {
        totalTokens: 0,
        totalWallets: 0
    }
};


for (const line of data) {
    const data = await getSmartLayerAirdrop(line.trim());
    responses.data.push(data);

    if (data[1] !== 0) {
        responses.total.totalTokens = responses.total.totalTokens + data[1];
        console.log(`Add New tokens Total Opt: ${responses.total.totalTokens}`)
        responses.total.totalWallets++;
    }

    const jsonFileName = 'airdrops_smart_layer_1.json';
    fs.writeFileSync(`./wal/${jsonFileName}`, JSON.stringify(responses, null, 2));
    //console.log(`Responses saved to ${jsonFileName}`);
}



