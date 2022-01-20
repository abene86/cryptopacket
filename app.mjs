import express from 'express';
import fetch from "node-fetch";
const app = express();
app.listen(3000, () => { console.log(3000); });
app.use(express.static('public'));

app.get('/market_cap_des', async(request, response) => {
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    let rawdata = await fetch(url);
    let datax = await rawdata.json();
    response.json(datax);
});

app.get('/history/:coinid', async(request2, response2) => {
    let coinname = request2.params['coinid'];
    console.log(coinname);
    let url = 'https://api.coingecko.com/api/v3/coins/' + coinname; + '/history';
    let rawdata = await fetch(url);
    let datax3 = await rawdata.json();
    response2.json(datax3);
});