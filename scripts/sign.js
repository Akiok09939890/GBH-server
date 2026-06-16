var signForm = document.querySelector(".loginform");
if (signForm) {
    signForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var usernameInput = document.getElementById("username").value;
        var passwordInput = document.getElementById("password").value;

        if (usernameInput.trim() === "" || passwordInput.trim() === "") {
            alert("Заполните все поля!");
            return;
        }

        fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.success) {
                document.location.href = "../main/main.html";
            } else {
                alert(data.message);
            }
        })
        .catch(function() {
            alert("Ошибка сервера");
        });
    });
}
