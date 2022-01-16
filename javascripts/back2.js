

let coin_data = [];
let url = window.location.href;
let urls = url.split("=",3);
let urla = decodeURIComponent(urls[0]);
let xtime = [];
let yprice = [];
let dataobj = [];
const coinname = decodeURIComponent(urls[2]);
console.log("!!!!!!!!!!!!");
console.log(coinname);
const ticker = decodeURIComponent(urls[1]);
let urlapi = 'https://api.coingecko.com/api/v3/coins/'+coinname+'/market_chart?vs_currency=usd&days=7'
var main2 = function() {
    let $divH = $("<div>").addClass("headerDiv"),
        $divg = $("<div>").addClass("graphDiv"),
        $divi = $("<div>").addClass("infoDiv"),
        $divB = $("<div>").addClass("divButton");
    setUpHDIV_Data($divH);
    let $button1 = $("<button>").addClass("button1").text("1D");
    let $button2 = $("<button>").addClass("button2").text("7D");
    let $button3 = $("<button>").addClass("button3").text("1M");
    $divB.append($button1)
        .append($button2)
        .append($button3);
    //setUpBDiv_Data($divB);
    $($button1).on("click", function(event) {
        console.log("aaaaa");
        urlapi = 'https://api.coingecko.com/api/v3/coins/'+coinname+'/market_chart?vs_currency=usd&days=1';
        addGraph($divg);
    });
    $($button2).on("click", function(event) {
        console.log("bbbbbbb");
        urlapi = 'https://api.coingecko.com/api/v3/coins/'+coinname+'/market_chart?vs_currency=usd&days=7';
        addGraph($divg);
    });
    $($button3).on("click", function(event) {
        console.log("cccc");
        urlapi = 'https://api.coingecko.com/api/v3/coins/'+coinname+'/market_chart?vs_currency=usd&days=30';
        addGraph($divg);
        
    });
   // copyData();
   console.log("gggggg");
    addGraph($divg);
    setUpIDivData($divi);
    $mainD = $("<div>").addClass("mainContent");
    $mainD.append($divH)
        .append($divB)
        .append($divg)
        .append($divi);
    $(".main2").append($mainD);

    $(".searchBarArea input").on("keypress", function(event) {
        val = $(".search").val();
        console.log(event);
        if (event.keyCode === 13) {
            retTicker(val);
        }
    });

    $(".searchBarArea button").on("click", function(event) {
        console.log("hello world");
        val = $(".search").val();
        console.log(val);
        retTicker(val);
    });
};
const setUpHDIV_Data = function($divH) {
    let $text = $("<h3>").addClass("title2")
        .text(ticker+"/USD");
    $divH.append($text);
}
const setUpIDivData = function($divi) {
    let $divi_1 = $("<div>").addClass("infoDiv1");
    let $divi_2 = $("<div>").addClass("infoDiv2");
    $divi.append($divi_1);
    $divi.append($divi_2);
}
/*const setUpBDiv_Data = function($divB) {
    let $button1 = $("<button>").addClass("button1").text("1D");
    let $button2 = $("<button>").addClass("button2").text("7D");
    let $button3 = $("<button>").addClass("button3").text("1M");
    $divB.append($button1)
        .append($button2)
        .append($button3);

}*/

const formatData = data => {
    return data.map(el =>{
        return {
            t: el[0],
            y: el[1].toFixed(2)
        }
    })

}
// buttton for time period function will call copyData and we will send using parameter so we can make url accordingly.
const copyData = async function() {
        //let url = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7';
        console.log("AAAAAAAAAA");
        console.log(urlapi);
        let response = await fetch(urlapi,{
            method: "GET",
        });
        let dataproc  = await response.json();
            //dataobj = formatData(data.prices);
        for(let i = 0; i<dataproc.prices.length; i++){
            xtime.push(dataproc.prices[i][0]);
            yprice.push(dataproc.prices[i][1]);
        }

        /*let api_key = "B1303CB3-695B-4CCB-B7B0-535896B9BB96",
            url = 'https://rest.coinapi.io/v1/trades/BINANCEUS_SPOT_'+ticker+'_USD/history?time_start=2016-01-01T00:00:00',
            i;

        fetch(url,{
            method: "GET",
            headers: {
                "X-CoinAPI-Key": api_key
            }
        })
        .then(response => {
            return response.json();
        }).then(function(data){
            console.log("*********");
            console.log(data.length);
            console.log("*********");
            for(i = 0; i<5; i++){
                let time = data[i].time_exchange;
                let times = time.split("T",2);
                let date = times[0];
                let hour = times[1];
                console.log("**************");
                console.log(date);
                console.log(hour);
                console.log("**************");
                xtime.push(data);
                yprice.push(data[i].price);
            }
        });
        console.log("AAAAAAA");
        console.log(xtime);
        console.log(yprice);
        //console.log(dataz);*/
    }
    //creates the graph;
const addGraph = async function(divg) {
    xtime = [];
    yprice = [];
    await copyData();
    divg.empty();
    let CanvasElement = $('<canvas/>', { 'width': 400, 'height': 400, 'id': 'mychart' });
    const ctx = CanvasElement.get(0).getContext("2d");;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xtime,
            datasets: [{
                label: ticker+ "/USD",
                data: yprice,
                backgroundColor:
                    'rgba(102, 178, 255, 0.4)',
                borderColor: 
                    'rgba(0, 0, 255, 0.4)', 

                pointRadius: 0,
                fill: {
                    target: 'origin',
                    above: 'rgb(102, 178, 255)',   // Area will be red above the origin
                    below: 'rgb(102, 178, 255)'    // And blue below the origin
                }
            }]
        },
        /*options: {
            scales: {
                xAxes: {
                    type: "time"
                }
            }
        }*/
        options: {
            lineHeightAnnotation: {
                always: true,
                hover: false,
                lineWeight: 1.5
            },
            animation: {
                duration: 2000
            },
            maintainAspectRation: false,
            responsive: true,
            scales: {
                xAxis: {
                        type: 'time',
                        duration: "linear"
                },
                //xAxis: {
                //    type: "type",
                //}
        //         bounds: 'data'
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x',
                        speed: 10,
                        threshold: 10
                    },
                    zoom: {
                        enabled: true,
                        mode: 'y'
                    }
                }
            }
        },
        
    });
    divg.append(CanvasElement);

}
$(document).ready(main2);