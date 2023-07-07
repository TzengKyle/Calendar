checkAccess()

const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    days_div = document.querySelector(".days"),
    search_year = document.getElementById("search-year"),
    search_month = document.getElementById("search-month"),
    prevMonth_btn = document.getElementById("prevMonth"),
    nextMonth_btn = document.getElementById("nextMonth"),
    gotoDate_btn = document.getElementById("gotoDate"),
    gotoToday_btn = document.getElementById("gotoToday"),
    diary_box = document.getElementById("test"),
    diary_save_btn = document.getElementById("diary_save_btn")

// 記得month是從0開始
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

// 這裡是存表情符號的html格式
const emo = {
    bigLaugh: "<i class=\"fa-regular fa-face-laugh-squint\"></i>",
    Laugh: "<i class=\"fa-regular fa-face-laugh\"></i>",
    noFace: "<i class=\"fa-regular fa-face-meh\"></i>",
    sad: "<i class=\"fa-regular fa-face-frown-open\"></i>",
    bigSad: "<i class=\"fa-regular fa-face-frown\"></i>",
    tear: "<i class=\"fa-regular fa-face-sad-tear\"></i>",
    angry: "<i class=\"fa-regular fa-face-angry\"></i>",
    bigTear: "<i class=\"fa-regular fa-face-sad-cry\"></i>",
    whiteEye: "<i class=\"fa-regular fa-face-rolling-eyes\"></i>",
    shock: "<i class=\"fa-regular fa-face-flushed\"></i>",
    deadFace: "<i class=\"fa-regular fa-face-dizzy\"></i>"
}

// 這裡還是0用到在assign一次
let days = document.querySelectorAll(".day");
let event_day = document.querySelector(".event_day");
let event_date = document.querySelector(".event_date");
let side_nav = document.getElementById('side_nav')
let profile_nav = document.getElementById('profile_nav')

//先存起來的要global的day資訊
let today = new Date();
let activeDay = new Date();
let month = today.getMonth();
let year = today.getFullYear();
let firstDay = new Date(year, month, 1);
let lastDay = new Date(year, month + 1, 0);

// 先把todoList的標題顯示
event_day.innerHTML = weekdays[today.getDay()];
event_date.innerHTML = today.getDate() + "th " + months[month] + " " + year;




////////////////////////////////////////////////////////
//_______________________檢聽messgae_____________________
window.addEventListener('message', function (event) {
    // 检查消息来源是否为特定的iframe
    if (event.source === profile_nav.contentWindow) {
        if (event.data == 'logout') {
            localStorage.setItem('access', 'no')
            navigateTo("./index.html")
        } else if (event.data == 'setting') {
            navigateTo("./setting_page.html")
        } else {
            var color_message = event.data;

            const rootStyles = document.documentElement.style;
            rootStyles.setProperty('--primary-color', color_message);

            side_nav.contentWindow.postMessage(color_message, '*');
        }
    }
});

function navigateTo(url) {
    window.location.href = url;
}


//_______________________檢聽messgae_____________________
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
//_______________________載入時判斷權限___________________
function checkAccess() {

    if (localStorage.getItem('access') == null) {
        localStorage.setItem('access', 'no')
    }

    if (localStorage.getItem('access') == 'no') {
        alert('You have not login yet')
        window.location.href = './index.html';
    }
}
//_______________________載入時判斷權限___________________
////////////////////////////////////////////////////////











function initCalendar() {
    let days = "";

    // calendar標題先設好
    date.innerHTML = months[month] + " " + year;

    // 該月的第一天跟最後一天
    firstDay = new Date(year, month, 1);
    lastDay = new Date(year, month + 1, 0);


    // 讀該月第一天是星期幾
    let firstDay_day;
    if (firstDay.getDay() != 0) {
        firstDay_day = firstDay.getDay();
    } else {
        firstDay_day = 7;
    }
    ////////////////////////////////////////////////////////
    //____________________建月曆畫面第一步____________________
    for (let j = 1; j <= firstDay_day - 1; j++) {
        days += `<div class="day unvalid"></div>`;
    }

    //____________________建月曆畫面第二步____________________
    //let today = new Date();
    if (year == today.getFullYear() && month == today.getMonth()) {
        for (let j = 1; j <= lastDay.getDate(); j++) {
            if (j == today.getDate()) {
                days += `<div class="day currentDay" id="${j}">${j}</div>`; //${emo['sad']}
            } else {
                days += `<div class="day" id="${j}">${j}</div>`;
            }
        }
    } else {
        for (let j = 1; j <= lastDay.getDate(); j++) {
            days += `<div class="day" id="${j}">${j}</div>`;
        }
    }
    //____________________建月曆畫面第三步____________________
    let row_num;
    if (firstDay.getDay() + lastDay.getDate() - 1 <= 35) {
        row_num = 5;
    } else {
        row_num = 6;
    }
    for (let j = firstDay.getDay() + lastDay.getDate(); j <= 7 * row_num; j++) {
        days += `<div class="day unvalid"></div>`;
    }
    //_______________________________________________________
    ////////////////////////////////////////////////////////

    //這裡才把東西放回去 要注意
    days_div.innerHTML = days;



    ////////////////////////////////////////////////////////
    //_______________________加入標記_________________________

    //標記active的day_div
    if (year == activeDay.getFullYear() && month == activeDay.getMonth()) {
        let activeDay_div = document.getElementById(activeDay.getDate().toString());
        // console.log(activeDay_div);
        activeDay_div.classList.add("active");
    }
    //_______________________________________________________
    ////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////
    //_______________________將重建的day加上listener_________
    addDayListener();
    //_______________________在day_div加上emoIcon_________
    addEmoIconOnDayDiv();
    //_______________________________________________________
    ////////////////////////////////////////////////////////

}

initCalendar();

////////////////////////////////////////////////////////
//_______________________各種日曆上按鈕接上onclick_____________
prevMonth_btn.addEventListener("click", prevMonth);
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}
nextMonth_btn.addEventListener("click", nextMonth);
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}
gotoDate_btn.addEventListener("click", gotoDate);
function gotoDate() {
    if (search_month.value == "" && search_year.value == "") {
        alert("Month and Year!!!");
    } else if (search_month.value == "") {
        alert("Month!!!");
    } else if (search_year.value == "") {
        alert("Year!!!");
    } else {
        if (search_year.value >= 0 && search_month.value >= 1 && search_month.value <= 12) {
            month = search_month.value - 1;
            year = search_year.value;
            initCalendar();
        } else {
            alert("Invalid!!!");
        }
    }
}
gotoToday_btn.addEventListener('click', gotoToday);
function gotoToday() {
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
}
//_______________________________________________________
////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
//_______________________所有day_div接上onclick__________
function addDayListener() {
    days = document.querySelectorAll(".day");
    // console.log(days.length)
    // / e.target就是this 只是因為這個函式會被多次呼叫所以不要用addEventListener("click", function(){...})的形式
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            let active_day = e.target;
            // 先移除全部


            //在把點擊的變active
            if (!active_day.classList.contains("unvalid")) {
                days.forEach((day) => {
                    day.classList.remove("active");
                });

                active_day.classList.add("active");

                activeDay = new Date(year, month, active_day.id);
                let activeDay_day = activeDay.getDay();
                let activeDay_date = activeDay.getDate();
                let activeDay_month = month;
                let activeDay_year = year;

                event_day.innerHTML = weekdays[activeDay_day];
                event_date.innerHTML = activeDay_date + "th " + months[activeDay_month] + " " + activeDay_year;

                update_diary_box();
                update_emoIcons();
            } else {

            }
        });
    });
}
//_______________________________________________________
////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
//_______________________在day_div上顯示emoIcon__________
function addEmoIconOnDayDiv() {
    days = document.querySelectorAll(".day");
    // console.log(days.length)
    // e.target就是this 只是因為這個函式會被多次呼叫所以不要用addEventListener("click", function(){...})的形式
    days.forEach((day) => {
        let key = year + "/" + month + "/" + day.id;

        if (localStorage.getItem(key) != null) {
            if (JSON.parse(localStorage.getItem(key)).diary.emotion != "") {
                day.innerHTML += emo[JSON.parse(localStorage.getItem(key)).diary.emotion];
            }
        }
    });
}
//_______________________________________________________
////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
//_______________________更新寫日記區域的文字內容_________
function update_diary_box() {
    key = day_key_convert(activeDay);
    if (localStorage.getItem(key) != null) {
        diary_box.value = JSON.parse(localStorage.getItem(key)).diary.content;
    } else {
        diary_box.value = "";
    }
}
//_______________________________________________________
////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
//_______________________更新日記區域的表情符號_______
function update_emoIcons() {
    key = day_key_convert(activeDay);
    let emo_icons = document.querySelectorAll(".emo_icon");
    if (localStorage.getItem(key) != null) {
        if (JSON.parse(localStorage.getItem(key)).diary.emotion != "") {
            var the_emoIcon = document.getElementById(JSON.parse(localStorage.getItem(key)).diary.emotion)
            the_emoIcon.click()
        }
    } else {
        emo_icons.forEach((emo_icon) => {
            emo_icon.classList.remove("active");
        });
    }
}
//_______________________________________________________
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
//_______________________儲存日記文字內容_______
diary_save_btn.addEventListener('click', saveDiary);
function saveDiary() {
    key = day_key_convert(activeDay);

    if (localStorage.getItem(key) == null) {
        //Creat
        let data = {
            diary: {
                content: '',
                emotion: ''
            }
        };
        data.diary.content = diary_box.value;
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        //Update
        let activeDay_data = JSON.parse(localStorage.getItem(key));
        activeDay_data.diary.content = diary_box.value;
        localStorage.setItem(key, JSON.stringify(activeDay_data));
    }
}
//_______________________________________________________
////////////////////////////////////////////////////////




let emo_icons = document.querySelectorAll(".emo_icon");
function addEmoIconListener() {
    emo_icons.forEach((emo_icon) => {
        emo_icon.addEventListener("click", function () {
            // alert("被觸發了");
            var previousActiveEmoIcon_id = ""

            // 先把另一個active刪掉 但是要存那個active的是誰以用來判斷是否可能是取消表情
            emo_icons.forEach((emo_icon) => {
                if (emo_icon.classList.contains("active")) {
                    previousActiveEmoIcon_id = emo_icon.id
                    emo_icon.classList.remove("active");
                }
            });

            let activeDay_div = document.getElementById((activeDay.getDate()).toString());

            if (previousActiveEmoIcon_id != this.id || previousActiveEmoIcon_id == "") {
                this.classList.add("active")
                key = day_key_convert(activeDay);
                // console.log(key);
                if (localStorage.getItem(key) == null) {
                    //Creat
                    let data = {
                        diary: {
                            content: '',
                            emotion: ''
                        }
                    };
                    data.diary.emotion = this.id;
                    localStorage.setItem(key, JSON.stringify(data));
                } else {
                    //Update
                    let activeDay_data = JSON.parse(localStorage.getItem(key));
                    activeDay_data.diary.emotion = this.id
                    localStorage.setItem(key, JSON.stringify(activeDay_data));
                }

                if (activeDay_div.querySelector('i') == null) {
                    activeDay_div.innerHTML += emo[this.id];
                } else {
                    activeDay_div.querySelector('i').remove()
                    activeDay_div.innerHTML += emo[this.id];
                }

            } else { // previousActiveEmoIcon_id == this.id

                activeDay_div.querySelector('i').remove();
                key = day_key_convert(activeDay);

                let activeDay_data = JSON.parse(localStorage.getItem(key));
                activeDay_data.diary.emotion = ""
                localStorage.setItem(key, JSON.stringify(activeDay_data));
                JSON.parse(localStorage.getItem(key)).diary.emotion = ""
            }
        });
    });
}


function day_key_convert(day_obj) {
    key = day_obj.getFullYear() + "/" + day_obj.getMonth() + "/" + day_obj.getDate();
    return key;
}

addEmoIconListener();
update_diary_box();
update_emoIcons()
// localStorage.clear();
