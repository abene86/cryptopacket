import express from 'express';
import fetch from "node-fetch";
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(3000); });
//------------------------------
app.use(express.static('public'));
//----------------------------------
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
    //console.log(datax3);
    response2.json(datax3);
});

app.get('/graphdata/:data', async(request3, response3) => {
    let data = request3.params.data.split(',');
    //console.log("hello" + data);
    let coinname = data[0];
    console.log(coinname);
    let date = data[1];
    //console.log(data);
    let urlapi = 'https://api.coingecko.com/api/v3/coins/' + coinname + '/market_chart?vs_currency=usd&days=' + date;
    console.log(urlapi);
    let response = await fetch(urlapi, {
        method: "GET",
    });
    let dataproc = await response.json();
    response3.json(dataproc);

});
app.get('/gettotal/:data1', async(request4, response4) => {
    console.log("HERE in back3.js");
    let data1 = request4.params.data1.split(',');
    let namecoin = data1[0];
    //console.log(namecoin);
    let time = data1[1];
    let day = data1[2];
    //console.log("aaaaa" + time);
    let totalapi = 'https://api.coingecko.com/api/v3/coins/' + namecoin + '/market_chart/range?vs_currency=usd&from=' + time + '&to=' + day;
    //console.log(totalapi);
    let response0 = await fetch(totalapi, {
        method: "GET",
    });
    let dataproc3 = await response0.json();
    //console.log(totalapi);
    console.log("hello" + dataproc3);
    response4.json(dataproc3);
});