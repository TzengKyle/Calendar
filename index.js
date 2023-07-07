const login_btn = document.getElementById("login_btn")
const username_input = document.getElementById("username_input")
const password_input = document.getElementById("password_input")

if (localStorage.getItem("account_info") == null) {
    let info = {
        username: 'kyletzeng',
        password: 'kyletzeng'
    }
    localStorage.setItem("account_info", JSON.stringify(info))
}



login_btn.addEventListener('click', login_btn_fun);
function login_btn_fun() {

    if (username_input.value == "") {
        alert("username_input is required")
        return
    }

    if (password_input.value == "") {
        alert("password_input is required")
        return
    }

    if (username_input.value == JSON.parse(localStorage.getItem("account_info")).username && password_input.value == JSON.parse(localStorage.getItem("account_info")).password) {
        localStorage.setItem('access', 'yes')

        navigateTo("./main_page.html")
    } else {
        alert("wrong username or password")
        return
    }

}

function navigateTo(url) {
    window.location.href = url;
}
