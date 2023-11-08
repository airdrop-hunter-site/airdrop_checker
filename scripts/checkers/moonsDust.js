import Web3 from "web3";
import fs from "fs";
import BigNumber from "bignumber.js";

let index = 0;

const abi = JSON.parse(fs.readFileSync('./abi/moonsDustAbi.json', 'utf-8'));

export async function getMoonsDustInfo(wallet) {
    index++;

    const web3 = new Web3('https://nova.arbitrum.io/rpc');

    try {
        // Подставляем данные из строки в URL
        const dropContract = new web3.eth.Contract(abi, '0xc7f63b54597d76e4dc122504391877c7a3de1a26');

        const dataFromContract = await dropContract.methods.airdrops(wallet.trim()).call()

        console.log(`Wallet: ${wallet}`);
        console.log(`Iteration: ${index}`);


        await new Promise(resolve => setTimeout(resolve, 100));

        return [
            {
                wallet,
                data: {
                    amount: dataFromContract.airdropAmount,
                    airdropped: dataFromContract.airdropped
                }
            },
            new BigNumber(dataFromContract.airdropAmount).dividedBy(10 ** 18).toNumber()
        ]
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}
