var mainDiv;

var main=function(){
 var i;
 mainDiv=$("<div>").addClass("holdMainContent");
 var titles=$("<h1>").text("CryptoPackets").addClass("maintitle");
 $("main").append(mainDiv);
 $(mainDiv).append(titles);

//  for(i=0; i<5; i++){
//     createBoxes();
//  }


};
$(document).ready(main);

var createBoxes=function(){
    var div=$("<div>").addClass("boxInside");
    $(mainDiv).append(div);


};