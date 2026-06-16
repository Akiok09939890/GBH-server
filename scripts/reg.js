var regForm = document.querySelector(".loginform");
if (regForm) {
    regForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var usernameInput = document.getElementById("username").value;
        var passwordInput = document.getElementById("password").value;
        var passwordConfirmInput = document.getElementById("passwordconfirm").value;
        var rulesCheckbox = document.getElementById("rules").checked;

        if (usernameInput.trim() === "" || passwordInput.trim() === "" || passwordConfirmInput.trim() === "") {
            alert("Заполните все поля формы!");
            return;
        }

        if (passwordInput !== passwordConfirmInput) {
            alert("Пароли не совпадают!");
            return;
        }

        if (!rulesCheckbox) {
            alert("Необходимо согласиться с правилами платформы!");
            return;
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput,
                passwordconfirm: passwordConfirmInput
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
