
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

function calculate() {
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var age = parseFloat(document.getElementById("age").value);
    var maleRadio = document.getElementById("male");
    var femaleRadio = document.getElementById("female");

    var gender = "male";

    if (!height || !weight || !age) {
        alert("Пожалуйста, заполните рост, вес и возраст!");
        return;
    }
    if (femaleRadio && femaleRadio.checked) {
        gender = "female";
    } else if (maleRadio && maleRadio.checked) {
        gender = "male";
    } else {
        alert("Выберите пол!");
        return;
    }

    // для мужчин: BMR = (10 × вес в кг) + (6.25 × рост в см) - (5 × возраст) + 5

    //  для женщин: BMR = (10 × вес в кг) + (6.25 × рост в см) - (5 × возраст) - 161
    var bmr = 0;
    //базовый метаболизм BMR 
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // коэф активности для суточной нормы

    var activitySelect = document.getElementById("activity").value;
    var activityMult = 1.2;
    if (activitySelect == "0") {
        activityMult = 1.2;
    } else if (activitySelect == "1") {
        activityMult = 1.375;
    } else if (activitySelect == "2") {
        activityMult = 1.55;
    } else if (activitySelect == "3") {
        activityMult = 1.725;
    } else if (activitySelect == "4") {
        activityMult = 1.9;
    }

    var totaldayact = bmr * activityMult; 

    var aimSelect = document.getElementById("Aim").value;

    if (aimSelect == "0") {
        targetcal = totaldayact;
        proteines = 1.6;
        kfZhir = 1.0;
    } else if (aimSelect == "1") { 
        targetcal = totaldayact * 0.85; // 15 процентов -
        proteines = 2.0;
        kfZhir = 0.9;
    } else if (aimSelect == "2") { 
        targetcal = totaldayact * 1.15; // 15 процентов плюс
        proteines = 2.2;
        kfZhir = 1.2;
    }

    var proteins = weight * proteines;
    var Zhir = weight * kfZhir;
    var calfromUgl = targetcal - (proteins * 4) - (Zhir * 9);
    var ugl = calfromUgl / 4;

    var finalBmr = Math.round(bmr);
    var finaltotaldayact = Math.round(totaldayact);
    var finalCal = Math.round(targetcal);
    var finalBel = Math.round(proteins);
    var finalZhir = Math.round(Zhir);
    var finalugl = Math.round(ugl);

    console.log("Базовый метаболизм (BMR):", finalBmr);
    console.log("Суточная норма с активностью:", finaltotaldayact);
    console.log("Целевые калории (с учетом цели):", finalCal);
    console.log("Белки (г):", finalBel);
    console.log("Жиры (г):", finalZhir);
    console.log("Углеводы (г):", finalugl);

    localStorage.setItem("totalbrm", finalBmr);
    localStorage.setItem("totaldayact", finaltotaldayact); 
    localStorage.setItem("calccal", finalCal);
    localStorage.setItem("calcbel", finalBel);
    localStorage.setItem("calczhir", finalZhir);
    localStorage.setItem("calcugl", finalugl);

    document.location.href="../calcres/calcres.html"
}   