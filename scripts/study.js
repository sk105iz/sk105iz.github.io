const chapterSelect = document.getElementById("chapters");
const nextBtn = document.getElementById("next");
const homeBtn = document.getElementById("home");

window.addEventListener('beforeunload', function() {
    setCookie("chapter", chapterSelect.value);
  });

if (checkCookie("chapter"))
    chapterSelect.value = getCookie("chapter");

nextBtn.addEventListener("click", function() {
    window.location.href = "../html/flashcards.html";
});

homeBtn.addEventListener("click", function() {
    window.location.href = "../index.html";
});

function setCookie(cname, cvalue) {
    document.cookie = cname + "=" + cvalue + ";";
}

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
  
function checkCookie(cname) {
    return (getCookie(cname) != "");
}