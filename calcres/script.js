
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

document.getElementById("cal").innerText = localStorage.getItem("calccal");
document.getElementById("belValue").innerText = localStorage.getItem("calcbel");
document.getElementById("zhirValue").innerText = localStorage.getItem("calczhir");
document.getElementById("uglValue").innerText = localStorage.getItem("calcugl");
document.getElementById("bmrValue").innerText = localStorage.getItem("totalbrm");
document.getElementById("tdeeValue").innerText = localStorage.getItem("totaldayact");