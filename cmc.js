const axios = require('axios');

export
    let response = null;
    new Promise(async (resolve, reject) => {
        try {
            response = await axios.get(' https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=11419', {
                headers: {
                    'X-CMC_PRO_API_KEY': 'b85bd06c-19cd-486f-a304-f1ba22178f9c',
                },
            });
        } catch(ex) {
            response = null;
            // error
            console.log(ex);
            // reject(ex);
        }
        if (response) {
            // success
            const json = response.data;
            console.log(json);
            // resolve(json);
        }
    });