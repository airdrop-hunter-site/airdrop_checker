import axios from "axios";

let index = 0;

export async function getZkSyncPepeResults(wallet) {
    const url = `https://www.zksyncpepe.com/resources/amounts/${wallet.toLowerCase()}.json`;

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
            const response = await axios.get(url, config);

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
                result = [
                    {
                        url,
                        data: response.data,
                        wallet
                    },
                    parseInt(response.data[0])
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

    await new Promise(resolve => setTimeout(resolve, 500));

    return result;
}