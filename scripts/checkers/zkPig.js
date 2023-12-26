import axios from "axios";
import BigNumber from "bignumber.js";

let index = 0;

export async function getZkSyncPigResults(wallet) {
    const url = `https://api.pigtime.meme/v1/account/check-eligible/${wallet}`;

    console.log(`Wallet: ${wallet}`);
    console.log(`Iteration: ${index}`);

    index++;

    let config = {
        timeout: 5000
    }

    let result = [];

    let isBalancesFetched = false
    while (!isBalancesFetched) {
        try {
            const response = await axios.post(url, config);

            if (response.data[0] === '<') {
                result = [
                    {
                        url,
                        data: null,
                        wallet
                    },
                    0
                ];
            } else {
                const tokenValue = new BigNumber(9940000000)
                    .times( parseInt(response.data.rewardPercent) / 100)
                    .toNumber();

                result = [
                    {
                        url,
                        data: response.data,
                        wallet
                    },
                    tokenValue
                ];
            }
            isBalancesFetched = true
        } catch (err) {
            result = [
                {
                    url,
                    data: null,
                    wallet
                },
                0
            ];
            console.log('error: ', err.toString())
        }
    }

    await new Promise(resolve => setTimeout(resolve, 100));

    return result;
}