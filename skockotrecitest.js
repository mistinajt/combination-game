// global variables
const gameArea = document.querySelector('.area');
const startButton = document.querySelector('.start');
let checkButton, currentRow, tryDiv;
let chooseBtnsArr = [];
let tryBoxes = [];
let disabledBoxes = [];
let currentDivs = [];
let inputs = [];
let imageInputs = [];
const arrSigns = ["club", "diam", "heart", "smile", "spade", "star"];
const arrSignsImg = ["club.png", "diam.png", "heart.png", "smile.png", "spade.png", "star.png"];
let arrChecker = [];
let fullNumber = [];
let x = 1;
let y = 0;
let finish = 0;

// start game eventlistener
startButton.addEventListener('click', startGame);

// setting secret combination function
function setCombination() {
  for(let z=0;z<4;z++){
    let number = Math.floor(Math.random() * arrSigns.length);
    fullNumber.push(number);
  }
  // console.log(fullNumber);
}

// start game function
function startGame() {
  startButton.classList.add("hide");

  let first = document.createElement("div");
  first.classList.add("first");
  gameArea.appendChild(first);

  setCombination();
  newRow();

// choosing one of 6 signs
  arrSigns.forEach(function(item, index) {
    let chooseButton = document.createElement("div");
    chooseButton.classList.add('chooseSign')
    chooseButton.classList.add(`chooseBtn${index}`);
    chooseButton.style.backgroundImage = `url(${arrSignsImg[index]})`;
    first.appendChild(chooseButton);
  })

// creating button for choosing sign out of chooseButton div
  chooseBtnsArr = document.querySelectorAll('.chooseSign');

  chooseBtnsArr.forEach(function(item, index) {
    item.addEventListener('click', function(e) {
      if(inputs.length < 4){
          inputs.push(index);
          imageInputs.push(arrSignsImg[index]);
          console.log(imageInputs);
          for(let i=0; i<inputs.length; i++) {
            currentDivs[i].style.backgroundImage = `url(${imageInputs[i]})`;
          }
      }
      else {
        e.preventDefault;
      }
    });
  });
}

// creating new row if combination is wrong or if game is starting
function newRow() {
    let row = document.createElement("div");
    row.classList.add("row");
    gameArea.appendChild(row);

    currentRow = gameArea.lastChild;

    for(x=0;x<4;x++) {
    tryDiv = document.createElement("div");
    tryDiv.classList.add("tryBox");
    tryDiv.classList.add(`input${x}`);
    tryDiv.style.top = "10px";
    let tryPosition = 10;
    tryDiv.style.left = tryPosition + (50*x) + "px";
    currentRow.appendChild(tryDiv);
    }

    currentDivs = document.querySelectorAll('.tryBox');

    checkButton = document.createElement("button");
    checkButton.classList.add('check');
    checkButton.innerText = 'check';
    currentRow.appendChild(checkButton);
    checkButton.addEventListener('click', checkResult);
}

// comparing entered and secret combination
function checkResult() {
  checkButton.classList.add("hide");

// checking!
let fullNumberClone = fullNumber.slice();
let inputsClone = inputs.slice();

 if(inputs[0] == fullNumber[0] && inputs[1] == fullNumber[1] && inputs[2] == fullNumber[2] && inputs[3] == fullNumber[3]){
   alert('YOU WON!');
   finish = 1;
 }

 if(inputs[0] == fullNumber[0]) {
   arrChecker.push('R');
   fullNumber[0] = 8;
   inputs[0] = 8;

 }
 if(inputs[1] == fullNumber[1]) {
   arrChecker.push('R');
   fullNumber[1] = 8;
   inputs[1] = 8;
 }
 if(inputs[2] == fullNumber[2]) {
   arrChecker.push('R');
   fullNumber[2] = 8;
   inputs[2] = 8;
 }
 if(inputs[3] == fullNumber[3]) {
   arrChecker.push('R');
   fullNumber[3] = 8;
   inputs[3] = 8;
 }

   switch(inputs[0]) {
     case 8:
     break;
     case fullNumber[1]:
     arrChecker.push('Y');
     fullNumber[1] = 8;
     break;
     case fullNumber[2]:
     arrChecker.push('Y');
     fullNumber[2] = 8;
     break;
     case fullNumber[3]:
     arrChecker.push('Y');
     fullNumber[3] = 8;
     break;
   }

   switch(inputs[1]) {
     case 8:
     break;
     case fullNumber[0]:
     arrChecker.push('Y');
     fullNumber[0] = 8;
     break;
     case fullNumber[2]:
     arrChecker.push('Y');
     fullNumber[2] = 8;
     break;
     case fullNumber[3]:
     arrChecker.push('Y');
     fullNumber[3] = 8;
     break;
   }

   switch(inputs[2]) {
     case 8:
     break;
     case fullNumber[1]:
     arrChecker.push('Y');
     fullNumber[1] = 8;
     break;
     case fullNumber[0]:
     arrChecker.push('Y');
     fullNumber[0] = 8;
     break;
     case fullNumber[3]:
     arrChecker.push('Y');
     fullNumber[3] = 8;
     break;
   }

   switch(inputs[3]) {
     case 8:
     break;
     case fullNumber[1]:
     arrChecker.push('Y');
     fullNumber[1] = 8;
     break;
     case fullNumber[2]:
     arrChecker.push('Y');
     fullNumber[2] = 8;
     break;
     case fullNumber[0]:
     arrChecker.push('Y');
     fullNumber[0] = 8;
     break;
   }

 // console.log(fullNumber);
 fullNumber = fullNumberClone;
 inputs = inputsClone;
 // console.log(fullNumber);

// coloring checking lights
arrChecker.sort();
console.log(arrChecker);
arrChecker.forEach(function(item, index) {
  if(item == 'R'){
  let checkDiv = document.createElement("div");
  checkDiv.classList.add("checkBox");
  checkDiv.style.backgroundColor = "red"
  checkDiv.style.top = "2px";
  let checkPosition = 320;
  checkDiv.style.left = checkPosition + (50*index) + "px";
  currentRow.appendChild(checkDiv);
  }
  if(item == 'Y'){
  let checkDiv = document.createElement("div");
  checkDiv.classList.add("checkBox");
  checkDiv.style.backgroundColor = "yellow"
  checkDiv.style.top = "2px";
  let checkPosition = 320;
  checkDiv.style.left = checkPosition + (50*index) + "px";
  currentRow.appendChild(checkDiv);
  }
 });

// new row if combination is wrong
 y++;
 clearPrev();
 console.log(arrChecker);

 if(y<7 && finish != 1) {
   newRow();
 }
 else{
   endGame();
 }
}

// clearing input fields
function clearPrev() {
  tryBoxes = document.querySelectorAll(".tryBox");
  for (let i=0;i<tryBoxes.length;i++){
    tryBoxes[i].classList.remove("tryBox");
    tryBoxes[i].classList.add("disabledBox");
    disabledBoxes = document.querySelectorAll(".disabledBox");
    tryBoxes[i].classList.remove(`input${i}`);
  }
  disabledBoxes.forEach(function(item) {
    item.setAttribute("disabled", true);
  })
  arrChecker = [];
  inputs = [];
  imageInputs = [];
}

// ending game, displaying solution 
function endGame() {
  let displaySolution = document.createElement("div");
  displaySolution.classList.add('displaySol');
  let solution = [];
  fullNumber.forEach(function(item) {
    switch(item) {
      case 0:
      item = arrSignsImg[0];
      solution.push(item);
      break;
      case 1:
      item = arrSignsImg[1];
      solution.push(item);
      break;
      case 2:
      item = arrSignsImg[2];
      solution.push(item);
      break;
      case 3:
      item = arrSignsImg[3];
      solution.push(item);
      break;
      case 4:
      item = arrSignsImg[4];
      solution.push(item);
      break;
      case 5:
      item = arrSignsImg[5];
      solution.push(item);
      break;
    }
  });
  console.log(solution);

  displaySolution.innerHTML = `<img src=${solution[0]}></img> <img src=${solution[1]}></img> <img src=${solution[2]}></img> <img src=${solution[3]}></img>`
  gameArea.appendChild(displaySolution);
}
