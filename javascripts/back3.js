let curr = window.location.href;
let currurl = curr.split("=",5);
let urlf = decodeURIComponent(currurl[0]);
let start = decodeURIComponent(currurl[1]);
let amount = decodeURIComponent(currurl[2]);
let namecoin = decodeURIComponent(currurl[3]);
let tic = decodeURIComponent(currurl[4]);
let totalx = [];
let totaly = [];
let numofcoins;
let price;
console.log(start + " : "+ amount);

let main3 = function() {
    let $divh = $("<div>").addClass("head"),
        $divG = $("<div>").addClass("graph"),
        $divI = $("<div>").addClass("info");
    let $port = $("<h3>").addClass("portf").text("Your portfolio: ");
    $divh.append($port);
    backtesting(start,amount,$divG);
    //addgraph
    insertData($divI);
    $mainDiv = $("<div>").addClass("mainDiv");
    $mainDiv.append($divh)
            .append($divG)
            .append($divI);
    $(".main3").append($mainDiv);
}

const gettotaldata = async function(time) {
    let totalapi = 'https://api.coingecko.com/api/v3/coins/'+namecoin+'/market_chart/range?vs_currency=usd&from='+time+'&to=1641852359543';
    let response = await fetch(totalapi,{
        method: "GET",
    });
    let dataproc  = await response.json();
    price = dataproc.prices[0][1];
    numofcoins = amount/dataproc.prices[0][1];
    for(let i = 0; i<dataproc.prices.length; i++){
        totalx.push(dataproc.prices[i][0]);
        totaly.push(dataproc.prices[i][1] * numofcoins);
    }


}
const backtesting = async function(time, amount,$divG){
    totalx = [];
    totaly = [];
    // add becktesting here...
    await gettotaldata(time);
    console.log(numofcoins);
    $divG.empty();
    let CanvasElement = $('<canvas/>', { 'width': 400, 'height': 400, 'id': 'mychart' });
    const ctx = CanvasElement.get(0).getContext("2d");;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: totalx,
            datasets: [{
                label: "PORTFOLIO",
                data: totaly,
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
    $divG.append(CanvasElement);
    
}

const insertData = async function($divI) {
    await gettotaldata(start);
    console.log(numofcoins);
    let $info = $("<h3>").addClass("data").text("Estimated Position");
    let $numcoin = $("<p>").addClass("numcoin").text("Total: "+ numofcoins.toFixed(8) + tic);
    let $avg = $("<p>").addClass("avg").text("Average price: $" + price.toFixed(2));
    let $mv = $("<p>").addClass("mv").text("Market value: " + (numofcoins*totaly[totaly.length-1]).toFixed(2));
    let $ret = $("<p>").addClass("ret").text("Total Return: " + (((numofcoins*totaly[totaly.length-1])/amount)*100).toFixed(2) + "%");
    $divI.append($info)
        .append($numcoin)
        .append($avg)
        .append($mv)
        .append($ret);
}



$(document).ready(main3);