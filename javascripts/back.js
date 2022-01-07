//hold the value for mainDiv that hold our content
var mainDiv;
//hold all the small div objects
// we created through jquery
var divObjects=[];

var main=function(){
 var titles;
 mainDiv=$("<div>").addClass("holdMainContent");
 titles=$("<h1>").text("CryptoPackets").addClass("maintitle");
 $("main").append(mainDiv);
 $(mainDiv).append(titles);
 createBoxes(40);
 populate();

};

$(document).ready(main);
//creates the boxes
// var colorInnerBoxes= function(){

// };
var populate=function(){
   var i;
    for(i=0; i<divObjects.length; i++){
        var image=$("<img>").addClass("iconImage");
        var  $a=$("<a>").addClass("tickerText");
        $a.attr("href", "index2.html");
        $a.text();
        divObjects[i].append($a);
    }  
};
var createBoxes=function(number){
    var div1;
    var div2;
    var i;
    for(i=0; i<number; i++){
        if(i%8 === 0){
          div1=$("<div>").addClass("boxOutside");
          $(mainDiv).append(div1);
        }
        div2=$("<div>").addClass("boxInside");
        divObjects[i]=(div2);
        $(div1).append(div2);
   }
};