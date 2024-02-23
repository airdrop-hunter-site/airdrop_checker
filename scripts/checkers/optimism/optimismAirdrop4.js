import {promises as fs} from "fs";

let index = 0;

export async function getOptimism4AirdropInfo(wallet) {
    const file = await fs.readFile('./scripts/checkers/optimism/info.txt', 'utf-8');
    const lines = file.split('\n').map(line => line.replace('\r', '').split(','));


    index++;

    for (const line of lines) {
        if (line[0].toLowerCase() === wallet.toLowerCase()) {
            return  [
                {
                    url: '',
                    data: line
                },
                parseInt(line[1])
            ];
        }
    }

    return  [
        {
            url: '',
            data: null
        },
        0,
    ]
}
