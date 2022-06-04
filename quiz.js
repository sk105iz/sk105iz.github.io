const chapter = getCookie("chapter");
const chapterLabel = document.getElementById("chapter-label");
const numCorrectLabel = document.getElementById("number-correct");
const image = document.getElementById("quiz-image");
const choice1Btn = document.getElementById("choice1");
const choice2Btn = document.getElementById("choice2");
const choice3Btn = document.getElementById("choice3");
const choice4Btn = document.getElementById("choice4");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");

chapterLabel.innerText = "Currently on Chapter: " + chapter;

var vocabList;
var wrongTerms = [];
var index;
var numCorrect = 0;
var answer;
var answerIndex;

function loadQuestion(num) {
    let shuffleArr = shuffle(vocabList[chapter - 1].terms);
    answer = vocabList[chapter - 1].terms[num];
    let choiceArr = [];
    let filled = 0;
    let i = 0;

    while (filled < 3) {
        if (shuffleArr[i] == answer) {
            i++;
            continue;
        }

        choiceArr.push(shuffleArr[i]);
        filled++;
        i++;
    }
    choiceArr.push(answer);
    choiceArr = shuffle(choiceArr);

    choice1Btn.innerText = choiceArr[0];
    choice2Btn.innerText = choiceArr[1];
    choice3Btn.innerText = choiceArr[2];
    choice4Btn.innerText = choiceArr[3];

    answerIndex = choiceArr.indexOf(answer);

    choice1Btn.addEventListener("click", wrongChoiceHandler);
    choice2Btn.addEventListener("click", wrongChoiceHandler);
    choice3Btn.addEventListener("click", wrongChoiceHandler);
    choice4Btn.addEventListener("click", wrongChoiceHandler);
    choice1Btn.className = '';
    choice2Btn.className = '';
    choice3Btn.className = '';
    choice4Btn.className = '';

    switch(answerIndex) {
        case 0:
            choice1Btn.removeEventListener("click", wrongChoiceHandler);
            choice1Btn.addEventListener("click", correctChoiceHandler);
            break;
        case 1:
            choice2Btn.removeEventListener("click", wrongChoiceHandler);
            choice2Btn.addEventListener("click", correctChoiceHandler);
            break;
        case 2:
            choice3Btn.removeEventListener("click", wrongChoiceHandler);
            choice3Btn.addEventListener("click", correctChoiceHandler);
            break;
        case 3:
            choice4Btn.removeEventListener("click", wrongChoiceHandler);
            choice4Btn.addEventListener("click", correctChoiceHandler);
            break;
    }
}

function wrongChoiceHandler() {
    choice1Btn.classList.add("wrong");
    choice2Btn.classList.add("wrong");
    choice3Btn.classList.add("wrong");
    choice4Btn.classList.add("wrong");

    wrongTerms.push(answer);

    correctChoiceHandler();
}

function correctChoiceHandler(gotCorrect) {
    switch(answerIndex) {
        case 0:
            choice1Btn.classList.add("correct");
            break;
        case 1:
            choice2Btn.classList.add("correct");
            break;
        case 2:
            choice3Btn.classList.add("correct");
            break;
        case 3:
            choice4Btn.classList.add("correct");
            break;
    }
    if (gotCorrect)
        numCorrect++;
    removeAllChoiceEvents();

    numCorrectLabel.innerText = "Number of Questions Correct: " + numCorrect + " out of " + vocabList[chapter - 1].terms.length;
}

function removeAllChoiceEvents() {
    choice1Btn.removeEventListener("click", wrongChoiceHandler);
    choice2Btn.removeEventListener("click", wrongChoiceHandler);
    choice3Btn.removeEventListener("click", wrongChoiceHandler);
    choice4Btn.removeEventListener("click", wrongChoiceHandler);

    switch(answerIndex) {
        case 0:
            choice1Btn.removeEventListener("click", correctChoiceHandler);
            choice1Btn.addEventListener("click", moveChoiceHandler);
            break;
        case 1:
            choice2Btn.removeEventListener("click", correctChoiceHandler);
            choice2Btn.addEventListener("click", moveChoiceHandler);
            break;
        case 2:
            choice3Btn.removeEventListener("click", correctChoiceHandler);
            choice3Btn.addEventListener("click", moveChoiceHandler);
            break;
        case 3:
            choice4Btn.removeEventListener("click", correctChoiceHandler);
            choice4Btn.addEventListener("click", moveChoiceHandler);
            break;
    }
}

function moveChoiceHandler() {
    if(index == (vocabList[chapter - 1].terms.length - 1)) {
        finishQuiz();
        return;
    }
    index++;

    switch(answerIndex) {
        case 0:
            choice1Btn.removeEventListener("click", moveChoiceHandler);
            break;
        case 1:
            choice2Btn.removeEventListener("click", moveChoiceHandler);
            break;
        case 2:
            choice3Btn.removeEventListener("click", moveChoiceHandler);
            break;
        case 3:
            choice4Btn.removeEventListener("click", moveChoiceHandler);
            break;
    }
    loadCardIndex(index);
}

function finishQuiz() {
    choice1Btn.remove();
    choice2Btn.remove();
    choice3Btn.remove();
    choice4Btn.remove();
    image.remove();

    let review = "Good job on completing the quiz! Here are the terms that you got wrong that is recommended for review: ";

    for (let i = 0; i < wrongTerms.length; i++) {
        review += "\n" + wrongTerms[i];
        console.log("rip");
    }

    document.getElementById("review").innerText = review;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    let copy = array.slice();

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [copy[currentIndex], copy[randomIndex]] = [
        copy[randomIndex], copy[currentIndex]];
    }
  
    return copy;
  }

fetch('../scripts/vocab.json')
  .then(response => response.json())
  .then(data => loadQuiz(data));

function loadQuiz(data) {
    vocabList = data;
    loadCardIndex(0);
}

function loadCardIndex(num) {
    image.src = "../img/" + vocabList[chapter - 1].url[num];
    index = num;
    loadQuestion(num);
}

nextBtn.addEventListener("click", function() {
    window.location.href = "../html/study.html";
});

backBtn.addEventListener("click", function() {
    window.location.href = "../html/flashcards.html";
});
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}