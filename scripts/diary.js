fetch("/api/check-auth")
.then(function(r) { return r.json(); })
.then(function(data) {
    if (!data.authenticated) {
        document.location.href = "../sign/sign.html";
        return;
    }

    fetch("/api/diary/get")
    .then(function(r) { return r.json(); })
    .then(function(resp) {
        var d = resp.data;
        var gethave = d ? "true" : localStorage.getItem("Havetrenya");

        if (gethave === "true" && d) {
            var elements = document.getElementsByClassName("hj");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }

            var element = document.getElementsByClassName("hide");
            for (let i = 0; i < element.length; i++) {
                element[i].style.display = "block";
            }

            var trenstart = d.trenstart || localStorage.getItem("trenstart") || "";
            if (trenstart.length === 4) {
                trenstart = trenstart.slice(0, 2) + ":" + trenstart.slice(2);
            }

            document.getElementById("time").innerText = trenstart;
            var day = d.day || localStorage.getItem("day") || "";
            document.getElementById("day").innerText = day;
            var dura = d.duration || localStorage.getItem("duration") || "";
            document.getElementById("dura").innerText = dura;
            var trenname = d.trenname || localStorage.getItem("trenname") || "";
            document.getElementById("trenname").innerText = trenname;
        } else if (gethave === "true") {
            var elements = document.getElementsByClassName("hj");
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.display = "none";
            }

            var element = document.getElementsByClassName("hide");
            for (let i = 0; i < element.length; i++) {
                element[i].style.display = "block";
            }

            var trenstart = localStorage.getItem("trenstart") || "";
            if (trenstart.length === 4) {
                trenstart = trenstart.slice(0, 2) + ":" + trenstart.slice(2);
            }

            document.getElementById("time").innerText = trenstart;
            document.getElementById("day").innerText = localStorage.getItem("day") || "";
            document.getElementById("dura").innerText = localStorage.getItem("duration") || "";
            document.getElementById("trenname").innerText = localStorage.getItem("trenname") || "";
        }
    });
});

function deletetrenya() {
    var elements = document.getElementsByClassName("hj");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
    var element = document.getElementsByClassName("hide");
    for (let i = 0; i < element.length; i++) {
        element[i].style.display = "none";
    }
    localStorage.removeItem("Havetrenya");
}
