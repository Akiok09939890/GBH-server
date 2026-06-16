fetch("/api/check-auth")
.then(function(r) { return r.json(); })
.then(function(data) {
    if (!data.authenticated) {
        document.location.href = "../sign/sign.html";
        return;
    }

    fetch("/api/cabinet/get")
    .then(function(r) { return r.json(); })
    .then(function(resp) {
        if (!resp.success) return;

        var d = resp.data;
        var nickname = d.nickname || localStorage.getItem("Nickname") || "Никнейм";
        var goals = d.goals || localStorage.getItem("Goals") || "";
        var fio = d.fio || localStorage.getItem("Fio") || "";
        var level = d.level || localStorage.getItem("Level") || "";
        var email = d.email || localStorage.getItem("Email") || "";
        var height = d.height || localStorage.getItem("Height") || "";
        var age = d.age || localStorage.getItem("Age") || "";
        var weight = d.weight || localStorage.getItem("Weight") || "";
        var gender = d.gender || localStorage.getItem("Gender") || "";

        var rusificator = "";
        if (gender === "male") {
            rusificator = "Мужчина";
        } else if (gender === "female") {
            rusificator = "Женщина";
        } else {
            rusificator = " ";
        }

        var setgg = " ";
        switch(goals){
            case "0": setgg = " "; break;
            case "1": setgg = "Поддержание веса"; break;
            case "2": setgg = "Похудение"; break;
            case "3": setgg = "Набор мышечной массы"; break;
        }

        var setlevel = " ";
        switch(level){
            case "0": setlevel = " "; break;
            case "1": setlevel = "Новичок"; break;
            case "2": setlevel = "Средний"; break;
            case "3": setlevel = "Профи"; break;
        }

        document.getElementById("Nickname").innerText = nickname;
        document.getElementById("Fio").innerText = fio;
        document.getElementById("Goal").innerText = setgg;
        document.getElementById("Level").innerText = setlevel;
        document.getElementById("Email").innerText = email;
        document.getElementById("Height").innerText = height;
        document.getElementById("Weight").innerText = weight;
        document.getElementById("Age").innerText = age;
        document.getElementById("Gender").innerText = rusificator;
    });
});
