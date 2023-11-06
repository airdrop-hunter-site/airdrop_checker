import axios from "axios";

let index = 0;

export async function getPilotDogAirdropInfo(wallet) {
    const baseUrl = 'https://www.pilotdog.tech/api/get_eligible?address=';

    index++;

    try {
        // Подставляем данные из строки в URL
        const url = baseUrl + wallet.trim(); // Убираем лишние пробелы и символы новой строки
        console.log(`Wallet: ${wallet}`);
        console.log(`Iteration: ${index}`);

        const response = await axios.get(url);

        if (response.data.data.error) {
            return  [
                {
                    url,
                    data: null
                },
                0
            ]
        }

        await new Promise(resolve => setTimeout(resolve, 100));

        return [
            {
                url,
                data: response.data
            },
            parseInt(response.data.data.claimable_amount)
        ]
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}
