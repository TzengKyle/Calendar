const change_btn = document.getElementById("change_btn")
const back_btn = document.getElementById("back_btn")
const username_input = document.getElementById("username_input")
const password_input = document.getElementById("password_input")
const confirm_input = document.getElementById("confirm_input")

username_input.value = JSON.parse(localStorage.getItem('account_info')).username

change_btn.addEventListener('click', change_btn_fun);
function change_btn_fun() {

    if (password_input.value == "") {
        alert("password_input is required")
        return
    }

    if (confirm_input.value == "") {
        alert("confirm_input is required")
        return
    }

    if (password_input.value == JSON.parse(localStorage.getItem("account_info")).password) {
        alert("password do not be changed")
        return
    }

    if (password_input.value != confirm_input.value) {
        alert("passward is not equal to confirm")
        return
    }

    if (password_input.value == confirm_input.value) {
        let info = {
            username: username_input.value,
            password: confirm_input.value
        }
        localStorage.setItem("account_info", JSON.stringify(info))
        alert("passward be changed successfully into " + JSON.parse(localStorage.getItem("account_info")).password)
        navigateTo("./main_page.html")
    }
}

back_btn.addEventListener('click', back_btn_fun);
function back_btn_fun() {
    navigateTo("./main_page.html")
}

function navigateTo(url) {
    window.location.href = url;
}
