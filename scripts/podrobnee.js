document.getElementById("Trenname").value = localStorage.getItem("trenname") || "";
document.getElementById("Duration").value = localStorage.getItem("duration") || "";
document.getElementById("pereriv").value = localStorage.getItem("pereriv") || "";
document.getElementById("Day").value = localStorage.getItem("day") || "";
document.getElementById("trenstart").value = localStorage.getItem("trenstart") || "";
document.getElementById("zametki").value = localStorage.getItem("zametrki") || "";

var upra = localStorage.getItem("upra");
if (upra) {
    var upraArray = upra.split(",");
    var formGruppa = document.getElementById("Formgruppa");
    formGruppa.innerHTML = "";
    var label = document.createElement("label");
    label.textContent = "Упражнение";
    formGruppa.appendChild(label);
    for (var i = 0; i < upraArray.length; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.classList.add("poleinput", "poleupr");
        input.value = upraArray[i];
        input.disabled = true;
        formGruppa.appendChild(input);
    }
}

var inputs = document.querySelectorAll(".poleinput, .textarea");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
}
