/*
-----------------------------------------------------------------------------------NAV-------------------------------------------------------------------------------
*/

//for nav buttons to cycle through pages
const pageBtn = [
  document.querySelector("#page1btn"),
  document.querySelector("#page2btn"),
  document.querySelector("#page3btn"),
  document.querySelector("#page4btn"),
];

var allpages = document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideallPGNav();
function hideallPGNav() { //function to hide all pages
  for (let onepage of allpages) { //go through all subtopic pages
    onepage.style.display = "none"; //hide it
  }
}
function showPGNav(pgno) { //function to show selected page no
  hideallPGNav();
  //select the page based on the parameter passed in
  let onepage = document.querySelector("#page" + pgno);
  //show the page
  onepage.style.display = "flex";
}

//show the main page as the initial page
showPGNav(1);


/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
for (let i = 0; i < pageBtn.length; i++) {
  pageBtn[i].addEventListener("click", function () {
    var pageNumber = i + 1;
    showPGNav(pageNumber);
  });
}

/*JS for hamMenu */
const hamBtn = document.querySelector("#hamIcon");
hamBtn.addEventListener("click", toggleMenus);
const navButtonsItemsList = document.querySelector("ul");
function toggleMenus() { /*open and close menu*/

  //toggle the menu on and off
  navButtonsItemsList.classList.toggle("nav-button-hide");

  // if (navButtonsItemsList.style.display == "none") {
  //     navButtonsItemsList.style.display = "inline-block";
  // } else {
  //     navButtonsItemsList.style.display = "none";
  // }


  // if (menuItemsList.style.display == "block")
  //     menuItemsList.style.display = "none";
  // else menuItemsList.style.display = "block";
}

//when screen resizes
if (document.body.offsetWidth < 800) {

}

//TODO: use condition to check if page display is not equals to none, then add class for transition

/*
-----------------------------------------------------------------------------------PAGE 1-------------------------------------------------------------------------------
*/

//change background at timed intervals
let headerBackgrounds = document.querySelectorAll(".background img");//get all background images
let imageIndex = 0;//which background to show

function changeBackground() {
  headerBackgrounds[imageIndex].classList.remove("shown-background");
  imageIndex++;
  imageIndex = imageIndex % headerBackgrounds.length;
  headerBackgrounds[imageIndex].classList.add("shown-background");
}

//call function to change background every 8 seconds
setInterval(changeBackground, 8000);

//make array of keyboard quotes for title box
const mainQuotes = [
  "I spent 500 dollars on shined out keycaps, but it was worth it - Average user on r/mechmarket",
  "bro cleArLY RazeR KEyboARDs ArE ThE besT - Some razer shill",
  "Bro it's a hobby, not an addiction - me",
  "Nice keyboard, but wooting clears - at least one mf in the video comments",

];

//when give title card transition effect
const observerTitleBox = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("shown-title-box");

      //add a random quote to title box
      var titleboxQuote = document.querySelector("#page1 .title-box p");
      const randomIndex = Math.floor(Math.random() * mainQuotes.length);
      const randomQuote = mainQuotes[randomIndex];
      titleboxQuote.textContent = randomQuote;
    } else {
      entry.target.classList.remove("shown-title-box");
    }
  });
});

const elements = document.querySelectorAll("#page1 .title-box");
//add elements to observer
elements.forEach(function(element) {
  observerTitleBox.observe(element);
});

function updateQR() {

  let qr = document.querySelector(".qrBackground");

  if (window.innerWidth < 800) {
    qr.style.display = "none";
  } else {
    qr.style.display = "block";
  }
}

// Run the function on initial load
updateQR();

// Add event listener for window resize
window.addEventListener('resize', updateQR);

/*
-----------------------------------------------------------------------------------PAGE 2-------------------------------------------------------------------------------
*/

//when give info card transition effect
const observerInfo = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("shown-page2-info");
    } else {
      entry.target.classList.remove("shown-page2-info");
    }
  });
});


const elementsPage2Info = document.querySelectorAll("#page2 .info");
//add elements to observer
elementsPage2Info.forEach(function (element) {
  observerInfo.observe(element);
});

//code for typing test from online code

//array of random words
const wordArray = [
  "it", "I", "is", "am", "are",
  "the", "a", "an", "he", "she",
  "we", "they", "you", "this", "that",
  "these", "those", "has", "have", "had",
  "run", "jump", "write", "read", "eat",
  "drink", "play", "sleep", "think", "talk",
  "walk", "drive", "sing", "dance", "listen",
  "speak", "hear", "see", "look", "watch",
  "feel", "touch", "smell", "taste", "bring",
  "take", "give", "show", "find", "make",
  "know", "understand", "believe", "want", "need"
];


const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let wordCountInput = document.querySelector("#page2 #wordCount");

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;


const renderNewText = function () {

  //clear out the quotes string 
  if (quote !== "") {
    quote = "";
  }

  // Get input button for word count
  let wordCount = parseInt(wordCountInput.value); // Convert input value to an integer

  for (let i = 0; i < wordCount; i++) { // Repeat adding words up to the inputted number
    // Get a random word from the word array
    let randomWordIndex = Math.floor(Math.random() * wordArray.length);

    // Add random word to string
    if (i === wordCount - 1) {
      // Don't add space at the end of the word if it's the last word
      quote += wordArray[randomWordIndex];
    } else {
      // Else add the space at the end of the word
      quote += wordArray[randomWordIndex] + " ";
    }

    //clear everything in the quoteSection div first
    quoteSection.innerHTML = "";

    //Array of characters in the quote
    let arr = quote.split("").map(function (value) {
      //wrap the characters in a span tag
      return "<span class='quote-chars'>" + value + "</span>";
    });


    //join array for displaying
    quoteSection.innerHTML += arr.join("");
  }

  //debug to check quote
  console.log(quote);
};


//TODO: add sound for every click

//Logic for comparing input words with quote
userInput.addEventListener("input", function () {
  let quoteChars = document.querySelectorAll(".quote-chars");
  //Create an array from received span tags
  quoteChars = Array.from(quoteChars);
  //array of user input characters
  let userInputChars = userInput.value.split("");
  //loop through each character in quote
  quoteChars.forEach(function (char, index) {
    //Check if char(quote character) = userInputChars[index](input character)
    if (char.innerText == userInputChars[index]) {
      char.classList.add("success");
    }
    //If user hasn't entered anything or backspaced
    else if (userInputChars[index] == null) {
      //Remove class if any
      if (char.classList.contains("success")) {
        char.classList.remove("success");
      } else {
        char.classList.remove("fail");
      }
    }
    //If user enter wrong character
    else {
      //Checks if we alreasy have added fail class
      if (!char.classList.contains("fail")) {
        //increment and display mistakes
        mistakes += 1;
        char.classList.add("fail");
      }
      document.getElementById("mistakes").innerText = mistakes;
    }
    //Returns true if all the characters are entered correctly
    let check = quoteChars.every(function (element) {
      return element.classList.contains("success");
    });
    //End test if all characters are correct
    if (check) {
      displayResult();
    }
  });
});
//Update Timer on screen
function updateTimer() {
  if (time == 0) {
    //End test if timer reaches 0
    displayResult();
  } else {
    document.getElementById("timer").innerText = --time + "s";
  }
}
//Sets timer
const timeReduce = function () {
  time = 60;
  timer = setInterval(updateTimer, 1000);
};
//End Test
const displayResult = function () {
  //display result div
  document.querySelector(".result").style.display = "block";
  clearInterval(timer);
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  let timeTaken = 1;
  if (time != 0) {
    timeTaken = (60 - time) / 100;
  }
  document.getElementById("wpm").innerText =
    (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
  document.getElementById("accuracy").innerText =
    Math.round(
      ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + " %";
};
//Start Test
const startTest = function() {
  mistakes = 0;
  timer = "";
  userInput.disabled = false;
  timeReduce();
  document.getElementById("start-test").style.display = "none";
  document.getElementById("stop-test").style.display = "block";
};
window.onload = function() {
  userInput.value = "";
  document.getElementById("start-test").style.display = "block";
  document.getElementById("stop-test").style.display = "none";
  userInput.disabled = true;
  renderNewText();

  //check for any changes to word Count input, and change length of test string
  wordCountInput.addEventListener("change", function () {
    //clear everything in the quoteSection div first
    quoteSection.innerHTML = "";

    //Then make the new text string
    renderNewText();
  });


};

/*
-----------------------------------------------------------------------------------PAGE 3-------------------------------------------------------------------------------
*/

//TODO: add interactable image with buttons, when buttons are clicked, resize the info from 0 height to desired height. Add transitions if needed
//TODO: add delay for info appearance, can use the delay component in the css
//TODO: add option for second interactable image

//Buttons to alternate between the 2 images

// function hideallPG3() { //function to hide keyboard info
//     for (let onepage of allpages) { //go through all subtopic pages

//     }
// }

let keyboardComponentBtn = [
  document.querySelector(".CasingBtn"),
  document.querySelector(".SwitchesBtn"),
  document.querySelector(".KeycapsBtn"),
  document.querySelector(".PCBBtn"),
  document.querySelector(".CaseFoamBtn"),
  document.querySelector(".PlateBtn"),
];

var allComponentInfo = document.querySelectorAll(".box .info");

function hideallComponentInfo() { //function to hide all pages
  for (let i = 0; i < allComponentInfo.length; i++) {

    //check if any of the component infos have shown-components-info class, and remove it if true
    if (allComponentInfo[i].classList.contains("shown-components-info")) {
      allComponentInfo[i].classList.remove("shown-components-info");
    }
  }
}

function showComponentInfo(infoNumber) { //function to show selected info no

  hideallComponentInfo();

  let infoQuery = ".diagram-info .info:nth-child(" + infoNumber + ")";

  console.log(infoQuery);

  let info = document.querySelector(infoQuery);

  info.classList.add("shown-components-info");
}

showComponentInfo(1);

for (let i = 0; i < keyboardComponentBtn.length; i++) {
  keyboardComponentBtn[i].addEventListener("click", function () {
    var infoNumber = i + 1;
    showComponentInfo(infoNumber);
  });
}

//show the main page as the initial page
showPGNav(1);

var keyboardImageList = document.querySelectorAll(".diagram-image");
function switchDiagramImage() { /*alternate between the two images*/

  //check if first image has shown-image class so add class to other image
  if (keyboardImageList[0].classList.contains('shown-image')) {
    keyboardImageList[0].classList.remove('shown-image');
    keyboardImageList[1].classList.add('shown-image');
  }
  //else it means that the other image has shown-image class so add class to first image
  else {
    keyboardImageList[0].classList.add('shown-image');
    keyboardImageList[1].classList.remove('shown-image');
  }
}

//for first image
const openKeyboardButton = document.querySelector(".diagram-image1 .diagram-button:nth-child(1)");
openKeyboardButton.addEventListener("click", switchDiagramImage);

//for second image
const reassembleKeyboardButton = document.querySelector(".diagram-image2 .diagram-button:nth-child(1)");
reassembleKeyboardButton.addEventListener("click", switchDiagramImage);


/*
-----------------------------------------------------------------------------------PAGE 4-------------------------------------------------------------------------------
*/

let switchImageElementArray = [
  document.querySelector("#linear img"),
  document.querySelector("#tactile img"),
  document.querySelector("#clicky img"),
];

let switchImageArray = [
  "images/redswitchimg.gif",
  "images/brownswitchimg.gif",
  "images/blueswitchimg.gif",
];

let switchGifArray = [
  "images/redswitch.gif",
  "images/brownswitch.gif",
  "images/blueswitch.gif",
];

//get all switch info divs
let switchInfo = document.querySelectorAll("#page4 .info");

//make index the first switch info
var switchInfoIndex = 0;

let goBack = document.querySelector("#page4 .goBack");
//minus 1 to switchInfoIndex
goBack.addEventListener("click", function() {
  //reset all switch images
  for (let i = 0; i < switchImageElementArray.length; i++){
    switchImageElementArray[i].src = switchImageArray[i];
  }

  for(let info of switchInfo){
    if(info.style.display !== "none"){
      info.style.display = "none";
    }
  }

  //only add info index if doesnt exceed length
  if(switchInfoIndex !== 0){
    switchInfoIndex--;
    console.log(switchInfoIndex); // For debugging
  }

  switchInfo[switchInfoIndex].style.display = "flex";
});

//get go front button 
let goFront = document.querySelector("#page4 .goFront");
//add 1 to switchInfoIndex
goFront.addEventListener("click", function() {
  //reset all switch images
  for (let i = 0; i < switchImageElementArray.length; i++){
    switchImageElementArray[i].src = switchImageArray[i];
  }

  for(let info of switchInfo){
    if(info.style.display !== "none"){
      info.style.display = "none";
    }
  }

  //only add info index if doesnt exceed length
  if(switchInfoIndex !== switchInfo.length - 1){
    switchInfoIndex++;
    console.log(switchInfoIndex); // For debugging
  }

  switchInfo[switchInfoIndex].style.display = "flex";
});

for (let i = 0; i < switchImageElementArray.length; i++) {
  console.log(switchImageElementArray[i]);
  switchImageElementArray[i].addEventListener("click", function(){
    switchImageElementArray[i].src = switchGifArray[i];
  });
}

