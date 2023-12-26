import axios from "axios";
import BigNumber from "bignumber.js";

let index = 0;

export async function getZkFairResults(wallet) {
    const url = `https://api.zkfair.io/data/api/community-airdrop?address=${wallet.toLowerCase()}`;

    console.log(`Wallet: ${wallet}`);
    console.log(`Iteration: ${index}`);

    index++;

    let config = {
        timeout: 5000,
        headers: {
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,pt;q=0.6',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
        }
    }

    let result = [];

    let isBalancesFetched = false
    while (!isBalancesFetched) {
        try {
            const response = await axios.get(url, config);

            const polygonValue = new BigNumber(response.data.community_airdrop["Polygon zkEVM"].value)
            const lumozValue = new BigNumber(response.data.community_airdrop["Lumoz"].value)
            const zkRollupsValue = new BigNumber(response.data.community_airdrop["zkRollups"].value)

            const totalAirdrop = polygonValue.plus(lumozValue).plus(zkRollupsValue).dividedBy(10 ** 18).toNumber();

            result = [
                    {
                        url,
                        data: response.data,
                        wallet
                    },
                    totalAirdrop
                ];

            isBalancesFetched = true
        } catch (err) {
            if (err.toString().includes('AxiosError: Request failed with status code 429') || err.toString().includes('AxiosError: timeout of 5000ms exceeded')) {
                console.log('error: ', err.toString())
                await new Promise(resolve => setTimeout(resolve, 120000));
            } else {
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
    }

    await new Promise(resolve => setTimeout(resolve, 3000));

    return result;
}