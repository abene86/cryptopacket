//hold the value for mainDiv that hold our content
let mainDiv,
    //hold all the small div objects
    // we created through jquery
    divObjects = [],
    //the global variable the hold the data for api call
    CAP = 56,
    //for api value
    coinlist = [],
    //value for user input for search
    tickRet;



let main = function() {
    //console.log("*******************11111");
    createDyMainArea();
    createBoxesInsideMainArea(CAP);
    populateInfoInsideBoxes();

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
const createDyMainArea = function() {
        let titles;
        mainDiv = $("<div>").addClass("holdMainContent");
        titles = $("<h1>").text("CryptoPackets").addClass("maintitle");
        $(".main1").append(mainDiv);
        $(mainDiv).append(titles);
    }
    //this function dynamical creates the boxes based on the numbers
const createBoxesInsideMainArea = function(number) {
    let div1,
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
const getdata = async function() {
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    let rawdata = await fetch(url);
    let datax = await rawdata.json();
    console.log(datax);
    for (let i = 0; i < datax.length; i++) {
        coinlist.push(datax[i]);
    }
}
const retTicker = async function(userinput) {
    $("main").empty();
    tickRet = "failed";
    userinput = userinput.toLowerCase();
    let i = 0;
    let symbol;
    let name;
    await getdata();
    while (i < coinlist.length) {
        name = coinlist[i].name.toLowerCase();
        if (name === userinput || coinlist[i].symbol === userinput || coinlist[i].id === userinput) {
            tickRet = coinlist[i].symbol.toUpperCase();
            console.log(tickRet);
            window.location.href = "index2.html?=" + tickRet + "=" + coinlist[i].id;
            break;
        }
        i++;
    }
    if (tickRet === "failed")
        alert("NOT FOUND: please search again");
}

//it populates the information inside the boxes
const populateInfoInsideBoxes = async function() {
    let $a,
        $price,
        text_val,
        countofElement = 0,
        coinRank,
        actprice,
        coins = 1,
        count = 0;
    //we are fetch the api by using
    //the fetch fuction and converting tp
    //json
    //accessing the data through dataraw
    await getdata();
    while (true) {
        coinRank = coinlist[countofElement].market_cap_rank;
        if (coinRank === coins) {
            text_val = coinlist[countofElement].symbol.toUpperCase();
            actprice = coinlist[countofElement].current_price.toFixed(2)
            actprice = actprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            $a = $("<a>").addClass("tickerText")
                .attr("href", "index2.html?=" + text_val + "=" + coinlist[countofElement].id)
                .text(text_val);
            $price = $("<p>").addClass("currprice")
                .text("US:");
            let $span = $("<span>").text("$" + actprice);
            $price.append($span);
            if (coinlist[countofElement].price_change_24h < 0) {
                $span.css("color", "red");
            } else {
                $span.css("color", "green");
            }
            divObjects[coins - 1].append($a)
                .append($price);
            coins++;
            count++;
            countofElement = 0;
        } else if (count === CAP) {
            break;
        } else { countofElement++ }
    }
};