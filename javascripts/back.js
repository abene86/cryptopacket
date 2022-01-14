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
    let api_key = "61622442-ca19-484c-b97b-5c086b6ab312",
        url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=' + api_key;
    let rawdata = await fetch(url);
    let datax = await rawdata.json();
    let length = datax.data.length;
    console.log(length);
    for (let i = 0; i < length; i++) {
        coinlist.push(datax.data[i]);
    }
}
const retTicker = async function(userinput) {
    tickRet = "failed";
    userinput = userinput.toLowerCase();
    let i = 0;
    await getdata();
    while (i < coinlist.length) {
        if (coinlist[i].name === userinput || coinlist[i].symbol.toLowerCase() === userinput || coinlist[i].slug === userinput) {
            tickRet = coinlist[i].symbol;
            window.location.href = "index2.html?coin=" + tickRet;
        }
        i++;
    }
    if (tickRet === "failed")
        alert("NOT FOUND: please search again");
}

//it populates the information inside the boxes
const populateInfoInsideBoxes = async function() {
    let $a,
        text_val,
        countofElement = 0,
        coinRank,
        coins = 1,
        count = 0;
    //we are fetch the api by using
    //the fetch fuction and converting tp
    //json
    //accessing the data through dataraw
    await getdata();
    while (true) {
        coinRank = coinlist[countofElement].rank;
        if (coinRank === coins) {
            text_val = coinlist[countofElement].symbol;
            $a = $("<a>").addClass("tickerText")
                .attr("href", "index2.html?=" + text_val)
                .text(text_val);
            divObjects[coins - 1].append($a);
            coins++;
            count++;
            countofElement = 0;
        } else if (count === CAP) {
            break;
        } else { countofElement++ }
    }
};