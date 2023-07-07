menuToggle = document.querySelector('.toggle');
navigation = document.getElementById('navigation');
toggleIcon = document.getElementById('toggleIcon');

var menuToggle_flag = 1
menuToggle.onclick = function () {

    if (menuToggle_flag == 1) {
        toggleIcon.name = 'menu-outline'
        navigation.style.width = '70px'
        this.style.left = '30px'
        menuToggle_flag = 0;
    } else {
        toggleIcon.name = 'chevron-back-outline'
        navigation.style.width = '300px'
        this.style.left = '260px'
        menuToggle_flag = 1;
    }
    console.log(menuToggle_flag);
}

var list = document.querySelectorAll(".list");
for (var i = 0; i < list.length; i++) {
    list[i].onclick = function () {
        j = 0;
        while (j < list.length) {
            list[j++].className = "list";
        }
        this.className = "list active";
    };
}

window.addEventListener('message', function (event) {
    var color_message = event.data;

    const rootStyles = document.documentElement.style;
    rootStyles.setProperty('--primary-color', color_message);
});