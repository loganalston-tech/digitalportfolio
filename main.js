// Helper Functions

function sleep(ms, s) {
    return new Promise(resolve => setTimeout(resolve, ms + (s*1000)));
}

function set_cookie(name, content) {
    try {
        document.cookie = name + '=' + content + "; path=/"
        return true
    }
    catch(error) {console.error(error); return error}
}

function get_cookie(name) {
    const nameEQ = name + "="
    const ca = document.cookie.split(';')
    for(let i=0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
}

function delete_cookie(name) {
    try {
        document.cookie = name +"=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"
        return true
    }
    catch(error) {console.error(error); return error}
}

// Vars

const favicon = `images/logo.png`
const appHeader = `Logan's Digital Portfolio`;
const nav = `<a href="/digitalportfolio/" class="nav index fa-solid fa-house"></a>
<a href="info.html" class="nav info fa-solid fa-folder"></a>
<a href="contact.html" class="nav contact fa-solid fa-phone"></a>
<a href="about.html" class="nav about fa-solid fa-user"></a>`;
const cookie_bottom_bar = `<div class="bottom-bar">
<h1 id="cookie-text">By clicking accept, you agree to all cookies.</h1>
<button class="cookies accept" onclick="cookie_select(0)">Accept</button>
<button class="cookies decline" onclick="cookie_select(1)">Decline</button>
</div>`
const title = `Digital Portfolio`;
const req = `<div class="topnav">
<h2 id="app-header"></h2>
<div id="nav"></div>
</div>
<div id="cookies"></div>`;
const error_message = `<h1 style="color: red; background-color:black; text-align:center;">Something wicked this way comes.</h1><br><h3 style="text-align:center;">(Whoops! Something went wrong!)<br>( <span style="color:maroon; background-color: grey; font-weight:bolder;">` + "%" + `</span> )</h3>`;
const file_name = window.location.pathname.split(`/`).pop().replace(`.html`, ``)
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum ex et mauris vulputate viverra. Aliquam finibus nulla id dolor faucibus sodales. Etiam malesuada sem ut magna tempus condimentum. Proin a vestibulum ligula, et accumsan turpis. Etiam luctus nisi nec nulla ullamcorper interdum. Cras volutpat dui dui, non tincidunt tortor sollicitudin a. Maecenas sagittis libero felis, vitae facilisis est sollicitudin et."
let _docTags = document.getElementById("tags")
let flipped = false;
let clicks = 0;
let clickPower = 1; 
let clicker_active = false;
let price = 2;
let shopOpen = false;
let x2timeleft = 0;
let x2price = 2000;
let timesusedx2 = 1;
let autotimeleft = 0;
let autoprice = 2000;
let timesusedauto = 1;

// Init

try {
    if (get_cookie("cookies-allowed") == "true") {
        if (parseInt(get_cookie("clicks"), 10) >= 0) {
            clicks = parseInt(get_cookie("clicks"), 10)
        }
        if (parseInt(get_cookie("clickpower"), 10) >= 0) {
            clickPower = parseInt(get_cookie("clickpower"), 10)
        }
        if (parseInt(get_cookie("x2used"), 10) >= 0) {
            timesusedx2 = parseInt(get_cookie("x2used"), 10)
        }
        if (parseInt(get_cookie("autoused"), 10) >= 0) {
            timesusedauto = parseInt(get_cookie("autoused"), 10)
        }
    }
    document.head.innerHTML = document.head.innerHTML + `<link rel="icon" type="image/png" href="`+favicon+`">`
    navactive = file_name;
    document.getElementById("required").innerHTML = req;
    document.getElementById("app-header").innerHTML = appHeader;
    if (document.getElementsByClassName("main-title").length == 1) {
       document.getElementsByClassName("main-title")[0].innerHTML = appHeader;
    }
    document.getElementById("nav").innerHTML = nav;
    document.getElementById("cookies").innerHTML = cookie_bottom_bar;
    if (document.title == `home` || file_name == '') {document.title = title;} else {document.title= title + " | " + file_name.toUpperCase()}
    if (file_name == ``) {navactive = document.getElementsByClassName('index');} else {navactive = document.getElementsByClassName(file_name);}
    navactive[0].classList.add("active")
    lorem = document.getElementsByClassName('placeholder')
    if (lorem.length >= 1) {
        for (let i = 0; i < lorem.length; i++) {
            lorem[i].innerHTML = loremIpsum
        }
    }
    let spoilers = document.getElementsByClassName('spoiler');
    for (let i = 0; i < spoilers.length; i++) {
        let element = spoilers[i];
        let charCount = element.textContent.length; // This "gets" the character count
        element.style.setProperty('--length', charCount);
    }
}
catch (error) {console.error("Something wicked this way comes.\n" + error); document.body.innerHTML = error_message.replace("%", error);}

// Code

if (get_cookie("cookies-allowed") != '') {document.getElementsByClassName("bottom-bar")[0].classList.add('hide')}
tags = get_Tags()
if (tags) {
    if (tags.includes("require#") && window.location.hash == "") {
        jump_to_subpage(tags.find(is_default_tag).replace("default#-",''))
    }
}
if(_docTags) {
    _docTags.hidden = true
}

let keyBuffer = '';
const secretCode = 'l'; // Change to your desired string

document.addEventListener('keydown', function(event) {
    const navItems = Array.from(document.querySelectorAll('.nav'));
    const currentIndex = navItems.findIndex(item => item.classList.contains('active'));
    
    if (event.key === 'ArrowLeft' && currentIndex > 0) {
        navItems[currentIndex - 1].click();
    } else if (event.key === 'ArrowRight' && currentIndex < navItems.length - 1) {
        navItems[currentIndex + 1].click();
    }
    
    // Track character input
    if (event.key.toLowerCase() == secretCode) {
        myFunction(); // Call your function here
        keyBuffer = '';
    }
    // Keep buffer manageable
    if (keyBuffer.length > secretCode.length) {
        keyBuffer = keyBuffer.slice(-secretCode.length);
    }
});

function myFunction() {
    console.log('Reset.');
    const audio = new Audio('sounds/funny.mp3');
    audio.play();
    if (shopOpen){toggleShop()}
    timesusedauto=1;
    timesusedx2=1;
    clicks=0;
    clickPower=1;
    updateClicks()
    hide("clicker")
    hide("shop-item")
    clicker_active = false;
}

// Functions

function hide(classname) {
    let spoilers = document.getElementsByClassName(classname);
    for (let i = 0; i < spoilers.length; i++) {
        let element = spoilers[i];
        element.classList.add("hide")
    }
}

function show(classname) {
    let spoilers = document.getElementsByClassName(classname);
    for (let i = 0; i < spoilers.length; i++) {
        let element = spoilers[i];
        element.classList.remove("hide")
    }
}

function is_default_tag(tag) {
    if (tag.includes("default#-")) {
        return true
    }
}

function get_Tags() {
    if (_docTags) {
        return _docTags.innerHTML.split(" ")
    }
    return false
}

function jump_to_subpage(anchorId) {
    window.location.hash = '#' + anchorId
}

async function cookie_select(state) {
    state_list = ["accept", "decline"]
    clicked = state_list[state]
    non_clicked = state_list[1-state]
    document.getElementsByClassName(non_clicked)[0].classList.remove(non_clicked);
    buttons = document.getElementsByClassName('cookies');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true
    }
    document.getElementById("cookie-text").innerText = `Thank you.`
    set_cookie("cookies-allowed", (clicked == "accept"))
    await sleep(0,2)
    document.getElementsByClassName("bottom-bar")[0].classList.add("slide-right")
    //document.getElementById("app-header").innerHTML = get_cookie("cookies-allowed"); // listen i did this for testing purposes to check the value :C
}

function updateClicks() {
    if (document.getElementById("clicks")) {
        document.getElementById("clicks").innerHTML = clicks;
        price = Math.round(2*(clickPower**2.1))
        x2price = Math.round(500*(timesusedx2**1.5))
        autoprice = Math.round(200*(timesusedauto**1.7))
        document.getElementById("click-power").innerHTML = clickPower+" clickpower<br>" +price+"c"
        if (clicks >= 1000000000) {
            show('trophy')
        }
        else {
            hide('trophy')
        }
    }
    if (get_cookie("cookies-allowed") == "true") {
        set_cookie("clicks", clicks)
        set_cookie('clickpower', clickPower)
        set_cookie('x2used', timesusedx2)
        set_cookie('autoused', timesusedauto)
    }
}

async function flip() {
    clicks += clickPower;
    if (x2timeleft >= 1) {
        clicks += clickPower;
    }
    updateClicks()

    if (clicks >= 5 || (get_cookie("cookies-allowed") == "true" && get_cookie("clicks") >= 5)) {
        if (!shopOpen) {
            show('clicker')
            clicker_active = true;
        }
    }
    if (!flipped) {    
        if (document.getElementById("logo")) {
        document.getElementById("logo").classList.add("flip")
        }
        flipped=true;
        await sleep(0,0.25)
        if (document.getElementById("logo")) {
        document.getElementById("logo").classList.remove("flip")
        }
        flipped=false;
    }
}


function buyClickPower() {
    if (clicker_active) {
        if (clicks >= price) {
            clicks -= price
            clickPower += 1
            updateClicks()
        }
    }
}

function buyx2() {
    if (clicker_active) {
        if (clicks >= x2price) {
            timesusedx2 += 1
            clicks -= x2price
            if (x2timeleft > 0) {
                x2timeleft += 30
            }
            else {
                x2timeleft = 30
            }
            updateClicks()
            document.getElementById("logo").classList.add("green")
        }
    }
}

function toggleShop() {
    shopOpen = !shopOpen
    if (shopOpen) {
        hide("hide-when-shop-open")
        show("shop-item")
        document.getElementById("shop").innerText = "Close Shop"
    }
    else {
        show("hide-when-shop-open")
        hide("shop-item")
        document.getElementById("shop").innerText = "Open Shop"
    }
}

function x2logic() {
    if (document.getElementById("x2")) {
        if (x2timeleft < 1){
            document.getElementById("x2").innerHTML = "x2 click power for 30s<br>" +x2price + "c"
            document.getElementById("logo").classList.remove("green")
        }
        if (x2timeleft > 0) {
            document.getElementById("x2").innerHTML = x2timeleft + "s left."
        }
    }
    if (x2timeleft > 0) {
        x2timeleft -= 1
    }
}

const intervalId = setInterval(() => {
  x2logic();
  autologic();
}, 1000);


const intervalId2 = setInterval(() => {
    if (autotimeleft > 0) {
        flip()
    }
}, 250);


function autologic() {
    if (document.getElementById("auto")) {
        if (autotimeleft < 1){
            document.getElementById("auto").innerHTML = "Autoclick for 30s<br>" +autoprice + "c"
            document.getElementById("logo").classList.remove("red")
        }
        if (autotimeleft > 0) {
            document.getElementById("auto").innerHTML = autotimeleft + "s left."
        }
    }
    if (autotimeleft > 0) {
        autotimeleft -= 1
    }
}

function buyauto() {
    if (clicker_active) {
        if (clicks >= autoprice) {
            timesusedauto += 1
            clicks -= autoprice
            if (autotimeleft > 0) {
                autotimeleft += 30
            }
            else {
                autotimeleft = 30
            }
            updateClicks()
            document.getElementById("logo").classList.add("red")
        }
    }
}

async function reveal(){
    document.getElementById('clickme').innerHTML='Click the logo 5 times!<br>Press L to reset!'
    document.getElementById('clickme').classList.add("centermeclicked")
    document.getElementById('clickme').classList.remove("centerme")
    await sleep(0,10);
    document.getElementById('clickme').innerHTML='?'
    document.getElementById('clickme').classList.add("centerme")
    document.getElementById('clickme').classList.remove("centermeclicked")
}
