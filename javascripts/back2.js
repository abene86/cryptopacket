let coin_data = [];
var main = function() {
    $divH = $("<div>").addClass("headerDiv");
    $divg = $("<div>").addClass("graphDiv");
    addGraph($divg);
    $divi = $("<div>").addClass("infoDiv");
    $divi_1 = $("<div>").addClass("infoDiv1");
    $divi_2 = $("<div>").addClass("infoDiv2");
    $divi.append($divi_1);
    $divi.append($divi_2);
    $mainD = $("<div>").addClass("mainContent");
    $mainD.append($divH)
        .append($divg)
        .append($divi);
    $("main").append($mainD);


};
// var copyData = function() {
//     var api_key = "B1303CB3-695B-4CCB-B7B0-535896B9BB96",
//         url = 'https://rest.coinapi.io/v1/quotes/{symbol_id}/history?time_start={time_start}&time_end={time_end}&limit={limit}?CMC_PRO_API_KEY=' + api_key,
//         i;

//     fetch(url).then(response => {
//         return response.json();
//     }).then(coin_data => {

//     });
// }
var addGraph = function(divg) {
    let divbutton = $("<div>").addClass("divButton");
    let divAGraph = $("<div>").addClass("divAGraph");
    let $button1 = $("<button>").addClass("button1").text("1 day");
    let $button2 = $("<button>").addClass("button2").text("7 day");
    let $button3 = $("<button>").addClass("button2").text("1 month");
    divbutton.append($button1)
        .append($button2)
        .append($button3);
    divg.append(divAGraph);
    divg.append(divbutton);

}
$(document).ready(main);