let curr = window.location.href;
let currurl = curr.split("=", 6);
let urlf = decodeURIComponent(currurl[0]);
let start = decodeURIComponent(currurl[1]);
let amount = decodeURIComponent(currurl[2]);
let namecoin = decodeURIComponent(currurl[3]);
let tic = decodeURIComponent(currurl[4]);
let totalx = [];
let totaly = [];
let numofcoins;
let price;
let startdate = decodeURIComponent(currurl[5]);
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
today = new Date(mm + '.' + dd + '.' + yyyy).getTime() / 1000;
console.log(start + " : " + amount);
/* upadated */

let main3 = function() {
    let $divh = $("<div>").addClass("head"),
        $divG = $("<div>").addClass("graph"),
        $divI = $("<div>").addClass("info");
    let $port = $("<h3>").addClass("portf").text("Your portfolio: ");
    // let $line = $("<h3>").addClass("eline").text("Esitmated Position");
    $divh.append($port);
    // $dive.append($line);
    console.log(start + " must be buying time");
    backtesting(start, amount, $divG);
    //addgraph
    setUpIDiv($divI);
    $mainDiv = $("<div>").addClass("mainDiv");
    $mainDiv.append($divh)
        .append($divG)
        .append($divI);
    $(".main3").append($mainDiv);
    $(".bb").on("click", function(event) {
        console.log(startdate);
        console.log("helloworld");
        start = $(".date").val();
        start = new Date(start.split("-").join(".")).getTime() / 1000;
        /* if(typeof(startdate) === "string"){
             startdate = new Date(startdate.split("-").join(".")).getTime() / 1000;
         }*/
        console.log(startdate);
        amounts = $(".amountin").val();
        console.log(start);
        console.log(amounts);
        /*while(true){

        }*/
        //current date must be checked and.
        if (amounts === "" || start === "") {
            alert("please input the correct value.");
        } else if (start > today || start < startdate) {
            alert("invalid date");
        }
        //should find out date is valid some coin history start in 2017 if user put 2000
        else {
            window.location.href = "index3.html?=" + start + "=" + amounts + "=" + namecoin + "=" + tic + "=" + startdate;
        }

    });
}

const setUpIDiv = function($divI) {
    totalx = [];
    totaly = [];
    let $divs = $("<div>").addClass("currinfo");
    let $divsearch = $("<div>").addClass("searching");
    insertData($divs);
    //insertDatas($divs);
    createButtonDiv2($divsearch);
    $divI.append($divs)
        .append($divsearch);
}

const gettotaldata = async function(time) {
    //let totalapi = 'https://api.coingecko.com/api/v3/coins/' + namecoin + '/market_chart/range?vs_currency=usd&from=' + time + '&to=1641852359543';
    console.log(namecoin);
    console.log("hellooo"+time);
    //let urlapi = `/graphdata/${coinname}, ${days}`;
    let totalapi = `/gettotal/${namecoin},${time},${today}`;
    console.log(totalapi);
    let response = await fetch(totalapi);
    let dataproc = await response.json();
    console.log(dataproc);
    console.log("HERE from the api call in back3.js");
    price = dataproc.prices[0][1];
    numofcoins = amount / dataproc.prices[0][1];
    for (let i = 0; i < dataproc.prices.length; i++) {
        totalx.push(dataproc.prices[i][0]);
        totaly.push(dataproc.prices[i][1] * numofcoins);
    }


}



const backtesting = async function(time, amount, $divG) {
    totalx = [];
    totaly = [];
    // add becktesting here...
    console.log(time +" hhhhhhhhh");
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
                backgroundColor: 'rgba(102, 178, 255, 0.4)',
                borderColor: 'rgba(0, 0, 255, 0.4)',

                pointRadius: 0,
                fill: {
                    target: 'origin',
                    above: 'rgb(102, 178, 255)', // Area will be red above the origin
                    below: 'rgb(102, 178, 255)' // And blue below the origin
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

const insertData = async function($divc) {
    console.log(start + "what is htisss");
    await gettotaldata(start);
    console.log(numofcoins);
    let $info = $("<h3>").addClass("data").text("Estimated Position");
    let $numcoin = $("<p>").addClass("numcoin").text("Total: " + numofcoins.toFixed(8) + tic);
    let $avg = $("<p>").addClass("avg").text("Average price: $" + price.toFixed(2));
    let $mv = $("<p>").addClass("mv").text("Market value: " + (totaly[totaly.length - 1]).toFixed(2));
    let $ret = $("<p>").addClass("ret").text("Total Return: " + (((totaly[totaly.length - 1] / amount) - 1) * 100).toFixed(2) + "%");
    /*if(amount <= totaly[totaly.length-1]){
        console.log("222222");
        $ret = $("<p>").addClass("ret").text("Total Return: " + (((totaly[totaly.length-1]/amount))*100).toFixed(2)+"%");
    }
    else{
        console.log("1111111");
        console.log(totaly[totaly.length-1]);
        $ret = $("<p>").addClass("ret").text("Total Return: -" + ((1-(totaly[totaly.length-1]/amount))*100).toFixed(2)+"%");
    }*/
    $divc.append($info)
        .append($numcoin)
        .append($avg)
        .append($mv)
        .append($ret);
}

const createButtonDiv2 = function($divi_2) {
    let $header = $("<h4>").addClass("divi_2Header")
        .text("Back Testing");
    let $bbutton = $("<button>").addClass("bb").text("Search");
    $divi_2.append($header)
    $divi_2.append('<p class="textdate">Enter date:');
    $divi_2.append('<input type="date" class="date" placeholder="hello">');
    $divi_2.append('<p class="amount">Enter the amount in US($):');
    $divi_2.append('<input type="text" class="amountin">');
    $divi_2.append($bbutton);
}

/*const insertDatas = async function($divs){
    await gettotaldata(start);
    let $info = $("<h3>").addClass("data").text("Starting Position");
    let $numcoin = $("<p>").addClass("numcoin").text("Amount bought: "+ numofcoins.toFixed(8) + tic);
    let $avg = $("<p>").addClass("avg").text("Average price: $" + price.toFixed(2));
    let $mv = $("<p>").addClass("mv").text("Market value: $" + amount);
    $divs.append($info)
        .append($numcoin)
        .append($avg)
        .append($mv);

}*/



$(document).ready(main3);