/*
-----------------------------------------------------------------------------------HEADER-------------------------------------------------------------------------------
*/

//for nav buttons to cycle through pages
const pageBtn = [
  page1btn,
  page2btn,
  page3btn,
  page4btn,
  page5btn,
];

var allpages = document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideallPG1();
function hideallPG1() { //function to hide all pages
  for (let onepage of allpages) { //go through all subtopic pages
      onepage.style.display = "none"; //hide it
  }
}
function showPG1(pgno) { //function to show selected page no
  hideallPG1();
  //select the page based on the parameter passed in
  let onepage = document.querySelector("#page" + pgno);
  //show the page
  onepage.style.display = "flex";
}

//show the main page as the initial page
showPG1(1);


/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
for (let i = 0; i < pageBtn.length; i++) {
  pageBtn[i].addEventListener("click", function () {
      var pageNumber = i + 1;
      showPG1(pageNumber);
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
if(document.body.offsetWidth < 800){

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

//call function to change background every 3 seconds
setInterval(changeBackground, 8000);

//make array of keyboard quotes for title box
const mainQuotes = [
  "I spent 500 dollars on shined out keycaps, but it was worth it",
  "Bro clearly razer keyboards are the best",
  "Bro it's a hobby, not an addiction",
];

//when give title card transition effect
const observerTitleBox = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
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
elements.forEach((element) => {
  observerTitleBox.observe(element);
});



/*
-----------------------------------------------------------------------------------PAGE 2-------------------------------------------------------------------------------
*/

//when give info card transition effect
const observerInfo = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting) {
          entry.target.classList.add("shown-page2-info");
      } else {
          entry.target.classList.remove("shown-page2-info");
      }
  });
});

const elementsPage2Info = document.querySelectorAll("#page2 .info");
elementsPage2Info.forEach((element) => {
  observerInfo.observe(element);
});

//code for typing test from online code
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;
//Display random quotes
const renderNewQuote = async () => {
//Fetch contents from url
const response = await fetch(quoteApiUrl);
//Store response
let data = await response.json();
//Access quote
quote = data.content;
//Array of characters in the quote
let arr = quote.split("").map((value) => {
  //wrap the characters in a span tag
  return "<span class='quote-chars'>" + value + "</span>";
});
//join array for displaying
quoteSection.innerHTML += arr.join("");
};
//Logic for comparing input words with quote
userInput.addEventListener("input", () => {
let quoteChars = document.querySelectorAll(".quote-chars");
//Create an arrat from received span tags
quoteChars = Array.from(quoteChars);
//array of user input characters
let userInputChars = userInput.value.split("");
//loop through each character in quote
quoteChars.forEach((char, index) => {
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
  let check = quoteChars.every((element) => {
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
const timeReduce = () => {
time = 60;
timer = setInterval(updateTimer, 1000);
};
//End Test
const displayResult = () => {
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
const startTest = () => {
mistakes = 0;
timer = "";
userInput.disabled = false;
timeReduce();
document.getElementById("start-test").style.display = "none";
document.getElementById("stop-test").style.display = "block";
};
window.onload = () => {
userInput.value = "";
document.getElementById("start-test").style.display = "block";
document.getElementById("stop-test").style.display = "none";
userInput.disabled = true;
renderNewQuote();
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
      if(allComponentInfo[i].classList.contains("shown-components-info")){
          allComponentInfo[i].classList.remove("shown-components-info");
      }
  }
}

function showComponentInfo(infoNumber) { //function to show selected page no
  
  hideallComponentInfo();

  let infoQuery = ".diagram-info .info:nth-child(" + infoNumber + ")";

  console.log(infoQuery)

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
showPG1(1);

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

//TODO: add interactable 
//TODO: make an interactable picture swapper
