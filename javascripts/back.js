//hold the value for mainDiv that hold our content
let mainDiv,
    //hold all the small div objects
    // we created through jquery
    divObjects = [],
    //the global variable the hold the data for api call
    CAP = 56,
    //for api value
    dataraw,
    //value for user input for search
    tickRet;



let main = function() {
    var titles,
        val,
        $a;

    mainDiv = $("<div>").addClass("holdMainContent");
    titles = $("<h1>").text("CryptoPackets").addClass("maintitle");
    $("main").append(mainDiv);
    $(mainDiv).append(titles);
    createBoxes(CAP);
    populate();
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

$(document).ready(main);
//it checks the userinput and returns a ticker
var retTicker = function(userinput) {
    var api_key = "61622442-ca19-484c-b97b-5c086b6ab312",
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + api_key,
        i;

    fetch(url).then(response => {
        return response.json();
    }).then(dataraw => {
        tickRet = "failed";
        userinput = userinput.toLowerCase();
        i = 0;
        while (i < dataraw.data.length) {
            console.log(i);
            if (dataraw.data[i].name === userinput || dataraw.data[i].symbol === userinput || dataraw.data[i].slug === userinput) {
                tickRet = dataraw.data[i].symbol;
                window.location.href = "index2.html?coin=" + tickRet;
            }
            i++;
        }
        if (tickRet === "failed")
            alert("NOT FOUND: please search again");
    });
};
//it populates the information inside the boxes
var populate = function() {
    //the api key
    var api_key = "61622442-ca19-484c-b97b-5c086b6ab312",
        //api url from coin market cap
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + api_key,
        $a,
        text_val,
        countofElement = 0,
        coinRank,
        coins = 1,
        count = 0;
    //we are fetch the api by using
    //the fetch fuction and converting tp
    //json
    //accessing the data through dataraw
    fetch(url).then(response => {
        return response.json();
    }).then(dataraw => {
        while (true) {
            coinRank = dataraw.data[countofElement].rank;
            if (coinRank === coins) {
                text_val = dataraw.data[countofElement].symbol;
                $a = $("<a>").addClass("tickerText");
                $a.attr("href", "index2.html?=" + text_val);
                $a.text(text_val);
                divObjects[coins - 1].append($a);
                coins++;
                count++;
                countofElement = 0;
            } else if (count === CAP) {
                break;
            } else {
                countofElement++;
            }
        }
    });
};

//this function dynamical creates the boxes based on the numbers
var createBoxes = function(number) {
    var div1,
        div2,
        i;
    for (i = 0; i < number; i++) {
        if (i % 8 === 0) {
            div1 = $("<div>").addClass("boxOutside");
            $(mainDiv).append(div1);
        }
        div2 = $("<div>").addClass("boxInside");
        divObjects[i] = (div2);
        $(div1).append(div2);
    }
};