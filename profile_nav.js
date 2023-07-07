var select_photo_btn = document.getElementById('select_photo_btn')
var file_input = document.getElementById("file_input");
var setting_btn = document.getElementById("setting_btn");
var info_username = document.getElementById('info_username')

const color = {
    dark: "rgb(50, 49, 62)",
    yellow: "rgb(255, 217, 0)",
    green: "rgb(32, 143, 32)",
    blue: "rgb(25, 25, 177)",
    brown: "rgb(97, 43, 43)"
}

info_username.innerHTML = JSON.parse(localStorage.getItem('account_info')).username

// window.addEventListener('storage', function (event) {
//     if (event.key === '2023/4/15') {
//         alert(event.newValue);
//         console.log('新的值为: ', event.newValue);
//     }
// });

function addSelectionsListener() {
    var selections = document.querySelectorAll(".selection")
    selections.forEach((selection) => {
        selection.addEventListener('click', function () {

            selections.forEach((selection) => {
                selection.classList.remove('active');
            });

            this.classList.add('active');

            const rootStyles = document.documentElement.style;
            const color_message = color[this.querySelector("div").id];

            rootStyles.setProperty('--primary-color', color_message);
            parent.postMessage(color_message, '*');
        })
    });
}

logout_btn.addEventListener('click', logout_btn_func)
function logout_btn_func() {
    parent.postMessage('logout', '*')
}
setting_btn.addEventListener('click', setting_btn_func)
function setting_btn_func() {
    parent.postMessage('setting', '*')
}

addSelectionsListener()

