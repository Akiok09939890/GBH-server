
function toggleMenu() { 
    document.getElementById("sideMenu").style.display = "block";
}

function closeMenu() {
    document.getElementById("sideMenu").style.display = "none";
}

var home = document.getElementById("home");
home.addEventListener("click", function() {
    document.location.href = "../main/main.html";
});