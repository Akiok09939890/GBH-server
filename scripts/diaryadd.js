var gp = document.getElementById("Formgruppa");

function addpole() {
    var gp = document.getElementById("Formgruppa");
    var dopinp = document.createElement("input");
    dopinp.classList.add("poleinput", "poleupr");
    dopinp.type = "text";

    gp.appendChild(dopinp);
}

function save() {
    var trenname = document.getElementById("Trenname").value;
    var dura = document.getElementById("Duration").value;
    var pereriv = document.getElementById("pereriv").value;
    var day = document.getElementById("Day").value;
    var trenstart = document.getElementById("trenstart").value;
    var zametki = document.getElementById("zametki").value;

    var upra = document.querySelectorAll(".poleupr")

    var massiveupra = [];

    for (let i = 0; i < upra.length; i++) {
        massiveupra.push(upra[i].value); 
    }

    var data = {
        trenname: trenname,
        duration: dura,
        pereriv: pereriv,
        day: day,
        trenstart: trenstart,
        zametki: zametki,
        upra: JSON.stringify(massiveupra)
    };

    fetch("/api/diary/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(function(r) { return r.json(); })
    .then(function(resp) {
        if (resp.success) {
            localStorage.setItem("trenname", trenname);
            localStorage.setItem("duration", dura);
            localStorage.setItem("pereriv", pereriv);
            localStorage.setItem("day", day);
            localStorage.setItem("trenstart", trenstart);
            localStorage.setItem("zametrki", zametki);
            localStorage.setItem("upra", massiveupra);
            localStorage.setItem("Havetrenya", true);
            document.location.href = "../diary/diary.html";
        } else {
            alert("Ошибка сохранения: " + resp.message);
        }
    });
}
