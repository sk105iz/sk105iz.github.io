const chapter = getCookie("chapter");
const indexLabel = document.getElementById("index");
const chapterLabel = document.getElementById("chapter-label");
const clickable = document.getElementById("flashcard-clickable");
const image = document.getElementById("flashcard-image");
const answer = document.getElementById("flashcard-answer");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
const nextCardBtn = document.getElementById("forward");
const previousCardBtn = document.getElementById("backward");

chapterLabel.innerText = "Currently on Chapter: " + chapter;

var vocabList;
var index;

nextCardBtn.addEventListener("click", function() {
    if(index == (vocabList[chapter - 1].terms.length - 1))
        return;
    loadCardIndex(index + 1);
});

previousCardBtn.addEventListener("click", function() {
    if (index == 0)
        return;
    loadCardIndex(index - 1);
});



fetch('../scripts/vocab.json')
  .then(response => response.json())
  .then(data => loadFlashcards(data));

function loadFlashcards(data) {
    vocabList = data;
    loadCardIndex(0);
    indexLabel.innerText = (index + 1) + " out of " + vocabList[chapter - 1].terms.length;
}

function loadCardIndex(num) {
    image.src = "../img/" + vocabList[chapter - 1].url[num];
    answer.innerText = vocabList[chapter - 1].terms[num];
    index = num;
    if (answer.classList.contains("show"))
        answer.classList.remove("show");

    indexLabel.innerText = (index + 1) + " out of " + vocabList[chapter - 1].terms.length;
}

clickable.addEventListener("click", function() {
    (!answer.classList.contains("show") ? answer.classList.add("show") : answer.classList.remove("show"));
});

nextBtn.addEventListener("click", function() {
    window.location.href = "../html/quiz.html";
});

backBtn.addEventListener("click", function() {
    window.location.href = "../html/study.html";
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