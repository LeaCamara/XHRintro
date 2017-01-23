

// everything in JSON is a string
console.log("hello XHR");

// asynchronous = two things going on simultaneously
// XHR enables you to switch data on a page w/o going to a brand new page
// you can continually modify a loaded web page

// Ex of how some things will take a little while to complete:

var startTime = Date.now();
// when page loaded
// console.log("Date Begin:", startTime);

// for (var i = 0; i < 2000000; i++) {
//   //running a loop
//   var x = i + 1/1 * 6 - 4;
// }

// console.log("I just looped ", i, " times")
// var nextTime = Date.now();

// console.log("Delay", nextTime - startTime);

// produced a 9-millisecond delay

var dataRequest = new XMLHttpRequest();
// setting a variable up, anticipating to be an XMLHttpRequest
// XMLHttpRequest is an object that's built into Javascript

dataRequest.addEventListener("load", dataRequestComplete);
dataRequest.addEventListener("error", dataRequestFailed);

// two others that are built in:
// 1. progress event - to have a progress bar
// 2. abort - to cancel if it's stalling too long

function dataRequestComplete(event){
  console.log("The BIG transfer is complete and we have data");
  var dataDumpTime = Date.now();
  console.log("Date of dataDumpTime ", dataDumpTime, "since beginning", dataDumpTime - startTime);
  var data = JSON.parse(event.target.responseText);
  console.log("the BIG data", data);
  console.log("how long to process: ", Date.now() - startTime);
}
// this function is anticipating an object for the event

function dataRequestFailed(event){
  console.log("Oops, an error occurred while transferring the file");
}

dataRequest.open("GET", "COLOR.json");

dataRequest.send();
// this goes & gets it & adds it to the event loop

// ***   asynchronous is all about multi-tasking  *****

////////////// get the colors

var dataRequest2 = new XMLHttpRequest();
dataRequest2.addEventListener("load", dataRequest2LoadComplete);
dataRequest2.addEventListener("error", dataRequestFailed);

// it knows what you're taking about because load & error are built into XHR

// function to handle when the load DOES happen:
function dataRequest2LoadComplete(event) {
  console.log("Small data has loaded");
  // process to parse JSON file (converting from JSON format into array that we can actually use:
  var smallData = JSON.parse(event.target.responseText);
  console.log("smallData", smallData);
  showData(smallData);
}

dataRequest2.open("GET", "color.json");
dataRequest2.send();

console.log("Date at end of page", Date.now());
// *******   console.logs DO NOT COME BACK IN THE ORDER THEY WERE CALLED   ******

// we use these kinds of calls so that we can have event listeners listening for when that data is called
// this gives it something to populate the DOM with

// calling a function to display colors in the DOM:
function showData(itDontMatter) {
  var colorDiv = document.getElementById("all-my-colors");

  for (whatever in itDontMatter){
    var colorData = ``;
    var colorItem = itDontMatter[whatever];

    colorData += `<div><h2>${colorItem.color}: ${colorItem.value}</h2</div>`;
    // $ means we have a variable that we want to evaluate
    colorDiv.innerHTML += colorData;
  }
}

dataRequest2.open("GET", "color.json");
dataRequest2.send();

console.log("Date at end of page", Date.now());

// if you don't pass the data in, you won't know what data to use

// 4 STEPS TO XHR REQUEST (from Random User exercise):
  // var userRequest = new XMLHttpRequest()
  // userRequest.addEventListener("load", saveUser)
  // userRequest.open("GET", "https://randomuser.me/api/")
  // userRequest.send()
