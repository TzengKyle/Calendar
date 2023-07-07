var advertisement_iframe = document.getElementById('advertisement_iframe');

var home_btn = document.getElementById('home_btn');
var feature_btn = document.getElementById('feature_btn');
var register_btn = document.getElementById('register_btn');

home_btn.addEventListener('click', function () {
    advertisement_iframe.setAttribute('src', './advertisement_home_page.html');
})

feature_btn.addEventListener('click', function () {
    advertisement_iframe.setAttribute('src', './advertisement_feature_page.html');
})

register_btn.addEventListener('click', function () {
    advertisement_iframe.setAttribute('src', './advertisement_register_page.html');
})
