let coin_data = [],
    url = window.location.href,
    urls = url.split("=", 3),
    urla = decodeURIComponent(urls[0]),
    xtime = [],
    yprice = [],
    dataobj = [],
    total = [],
    totalv = [];

const coinname = decodeURIComponent(urls[2]);
const ticker = decodeURIComponent(urls[1]);
let urlapi = 'https://api.coingecko.com/api/v3/coins/' + coinname + '/market_chart?vs_currency=usd&days=7'
var main2 = function() {
    let $divH = $("<div>").addClass("headerDiv"),
        $divg = $("<div>").addClass("graphDiv"),
        $divi = $("<div>").addClass("infoDiv"),
        $divB = $("<div>").addClass("divButton"),
        $pdesc = $("<p>");
    setUpHDIV_Data($divH);
    let $button1 = $("<button>").addClass("button1").text("1D");
    let $button2 = $("<button>").addClass("button2").text("7D");
    let $button3 = $("<button>").addClass("button3").text("1M");
    $divB.append($button1)
        .append($button2)
        .append($button3);
    $($button1).on("click", function(event) {
        console.log("aaaaa");
        urlapi = 'https://api.coingecko.com/api/v3/coins/' + coinname + '/market_chart?vs_currency=usd&days=1';
        drawGraph($divg);
    });
    $($button2).on("click", function(event) {
        console.log("bbbbbbb");
        urlapi = 'https://api.coingecko.com/api/v3/coins/' + coinname + '/market_chart?vs_currency=usd&days=7';
        drawGraph($divg);
    });
    $($button3).on("click", function(event) {
        console.log("cccc");
        urlapi = 'https://api.coingecko.com/api/v3/coins/' + coinname + '/market_chart?vs_currency=usd&days=30';
        drawGraph($divg);

    });
    drawGraph($divg);
    setUpIDivData($divi);
    $mainD = $("<div>").addClass("mainContent");
    $mainD.append($divH)
        .append($pdesc)
        .append($divB)
        .append($divg)
        .append($divi);
    $(".main2").append($mainD);

    $(".bb").on("click", function(event) {
        console.log("helloworld");
        start = $(".date").val();
        start = new Date(start.split("-").join(".")).getTime() / 1000;
        amounts = $(".amountin").val();
        console.log(start);
        console.log(amounts);
        //current date must be checked and.
        if (amounts === "" || start === "") {
            alert("please input the correct value.");
        }
        //should find out date is valid some coin history start in 2017 if user put 2000
        else {
            window.location.href = "index3.html?=" + start + "=" + amounts;
        }

    });


};

$(document).ready(main2);

const getDataInfo = async function() {
    let url = 'https://api.coingecko.com/api/v3/coins/' + coinname; + '/history';
    let rawdata = await fetch(url);
    let datax = await rawdata.json();
    console.log(datax);
    //depending on the index of the array we hold informations
    //index 0-image(size small) 1-desc about the coin 2-the rank of the coin
    //index 3 holds the current price of the coin index 4 holds the market cap of the coin
    //index 5 holds the market supply of the coin  index6 holds info  about twitter followers
    coin_data.push(datax.image.small)
    coin_data.push(datax.description.en)
    coin_data.push(datax.coingecko_rank);
    coin_data.push(datax.market_data.current_price.usd);
    coin_data.push(datax.market_data.market_cap.aed);
    coin_data.push(datax.market_data.max_supply)
    coin_data.push(datax.community_data.twitter_followers);
    console.log(coin_data);

}

const getDataGraph = async function() {
    let response = await fetch(urlapi, {
        method: "GET",
    });

    let dataproc = await response.json();
    for (let i = 0; i < dataproc.prices.length; i++) {
        xtime.push(dataproc.prices[i][0]);
        yprice.push(dataproc.prices[i][1]);
    }
};

const setUpHDIV_Data = async function($divH) {
    await getDataInfo();
    let $coinTick,
        $priceinfo,
        $infodiv,
        $infodiv2,
        $coinlogo,
        $twitterinfo,
        $coinrank;
    $coinTick = $("<h3>").addClass("title2")
        .text(ticker + "/USD");
    $coinlogo = $("<img>").addClass("logoimg")
        .attr("src", coin_data[0]);
    $infodiv2 = $("<div>").addClass("logotitleareas")
        .append($coinlogo)
        .append($coinTick);
    $priceinfo = $("<p>")
        .addClass("infoH")
        .text("Current Price USD:$" + coin_data[3]);
    $coinrank = $("<p>")
        .addClass("infoH")
        .text("Rank:" + coin_data[2]);
    $twitterinfo = $("<p>")
        .addClass("infoH")
        .text("Twitter Followers:" + coin_data[6]);
    $infodiv = $("<div>").addClass("infocoinH")
        .append($twitterinfo)
        .append($priceinfo)
        .append($coinrank);
    $divH.append($infodiv2)
        .append($infodiv);
}

const setUpIDivData = async function($divi) {
    let $divi_1 = $("<div>").addClass("infoDiv1");
    let $divi_2 = $("<div>").addClass("infoDiv2");
    let $bbutton = $("<button>").addClass("bb").text("Back-Test");
    $divi_2.append('<p class="textdate">DATE');
    $divi_2.append('<input type="date" class="date" placeholder="hello">');
    $divi_2.append('<p class="amount">amount');
    $divi_2.append('<input type="text" class="amountin">');
    $divi_2.append($bbutton);

    //let $inday = $("<input>").attr("type", "date");
    //$divi_2.append(day);
    $divi.append($divi_1);
    $divi.append($divi_2);
}


const formatData = data => {
    return data.map(el => {
        return {
            t: el[0],
            y: el[1].toFixed(2)
        }
    })

}

//creates the graph;
const drawGraph = async function(divg) {
    xtime = [];
    yprice = [];
    await getDataGraph();
    divg.empty();
    let CanvasElement = $('<canvas/>', { 'width': 400, 'height': 400, 'id': 'mychart' });
    const ctx = CanvasElement.get(0).getContext("2d");;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: xtime,
            datasets: [{
                label: ticker + "/USD",
                data: yprice,
                backgroundColor: 'rgba(102, 178, 255, 0.4)',
                borderColor: 'rgba(0, 0, 255, 0.4)',
                fill: {
                    target: 'origin',
                    above: 'rgb(102, 178, 255)', // Area will be red above the origin
                    below: 'rgb(102, 178, 255)' // And blue below the origin
                }
            }]
        },
        options: {
            lineHeightAnnotation: {
                always: true,
                hover: false,
                lineWeight: 1.5
            },

            maintainAspectRation: false,
            responsive: true,
            scales: {
                xAxis: {
                    type: 'time',
                    duration: "linear"
                },

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