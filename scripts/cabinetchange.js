
var geninp = document.querySelectorAll("input[name='gender']")
var setgender = "";

geninp[0].addEventListener("change", function() {
    if (geninp[0].checked) {
        setgender = geninp[0].value;
    }
    console.log(setgender);
});

geninp[1].addEventListener("change", function() {
    if (geninp[1].checked) {
        setgender = geninp[1].value; 
    }
    console.log(setgender);
});

function savedata() {
    var nickname = document.getElementById("Nickname").value;
    var goals = document.getElementById("Goals").value;
    var fio =  document.getElementById("Fio").value;
    var level =  document.getElementById("Level").value;
    var email = document.getElementById("Email").value;
    var height =  document.getElementById("Height").value;
    var age =  document.getElementById("Age").value;
    var weight =  document.getElementById("Weight").value;

    if (isNaN(height) || isNaN(age) || isNaN(weight)) {
        alert("Рост, возраст и вес должны быть числами");
        return;
    }

    if (height < 60) {
        alert("Рост не меньше 60см");
        return;
    }
    if (height > 300) {
        alert("Рост не больше 300см");
        return;
    }

    if (nickname.length > 15) {
        alert("Ник не больше 15 символов");
        return;
    }

    if (age < 0) {
        alert("Возраст не может быть отрицательным");
        return;
    }
    if (age > 150) {
        alert("Не может быть");
        return;
    }
    if (age == 67) {
        alert("Хахаха");
        return;
    }
    if (fio.length > 60) {
        alert("Слишком длинное ФИО")
        return;
    }
    if (weight < 0) {
        alert("Вес не может быть отрицательным");
        return;
    }

    var data = {
        nickname: nickname,
        goals: goals,
        fio: fio,
        level: level,
        email: email,
        height: height,
        age: age,
        weight: weight,
        gender: setgender
    };

    fetch("/api/cabinet/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(function(r) { return r.json(); })
    .then(function(resp) {
        if (resp.success) {
            localStorage.setItem("Nickname", nickname);
            localStorage.setItem("Goals", goals);
            localStorage.setItem("Fio", fio);
            localStorage.setItem("Level", level);
            localStorage.setItem("Email", email);
            localStorage.setItem("Height", height);
            localStorage.setItem("Age", age);
            localStorage.setItem("Weight", weight);
            localStorage.setItem("Gender", setgender);
            document.location.href = "../cabinet/cabinet.html";
        } else {
            alert("Ошибка сохранения: " + resp.message);
        }
    });
}
