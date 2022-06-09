const startBtn = document.getElementById("start");
const instructionsBtn = document.getElementById("instructions");
const modalContainer = document.getElementById("modal-container");
const closeModalBtn = document.getElementById("close");

startBtn.addEventListener("click", function() {
    window.location.href = "../html/study.html";
});

instructionsBtn.addEventListener("click", function() {
    modalContainer.classList.add("show");
    console.log(modalContainer.classList);
});

closeModalBtn.addEventListener("click", function() {
    modalContainer.classList.remove("show");
});