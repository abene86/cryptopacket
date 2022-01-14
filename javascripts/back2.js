let coin_data = [];
var main = function() {
    let $divH = $("<div>").addClass("headerDiv"),
        $divg = $("<div>").addClass("graphDiv"),
        $divi = $("<div>").addClass("infoDiv"),
        $divB = $("<div>").addClass("divButton");
    setUpHDIV_Data($divH);
    setUpBDiv_Data($divB)
    addGraph($divg);
    setUpIDivData($divi);
    $mainD = $("<div>").addClass("mainContent");
    $mainD.append($divH)
        .append($divB)
        .append($divg)
        .append($divi);
    $("main").append($mainD);
};
const setUpHDIV_Data = function($divH) {
    let $text = $("<h3>").text("BITCOIN: (BTC)");
    $divH.append($text);
}
const setUpIDivData = function($divi) {
    let $divi_1 = $("<div>").addClass("infoDiv1");
    let $divi_2 = $("<div>").addClass("infoDiv2");
    $divi.append($divi_1);
    $divi.append($divi_2);
}
const setUpBDiv_Data = function($divB) {
    let $button1 = $("<button>").addClass("button1").text("1D");
    let $button2 = $("<button>").addClass("button2").text("7D");
    let $button3 = $("<button>").addClass("button2").text("1M");
    $divB.append($button1)
        .append($button2)
        .append($button3);

}
const copyData = async function() {
        let api_key = "B1303CB3-695B-4CCB-B7B0-535896B9BB96",
            url = 'https://rest.coinapi.io/v1/trades/BITSTAMP_SPOT_BTC_USD/history?time_start=2016-01-01T00:00:00?X-CoinAPI-Key=' + api_key,
            i;

        let rawdata = await fetch(url);
        let dataz = await rawdata.json();
        console.log(dataz);
    }
    //creates the graph;
const addGraph = function(divg) {
    let CanvasElement = $('<canvas/>', { 'width': 800, 'height': 200, 'id': 'mychart' })
    const ctx = CanvasElement.get(0).getContext("2d");;
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
    });
    divg.append(CanvasElement);

}
$(document).ready(main);