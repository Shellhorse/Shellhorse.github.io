if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    changeView();
}

async function changeView() {
    content = document.getElementsByClassName('content');
    bullet = document.getElementsByClassName('bullet');
    for(var i = 0; i < content.length; i++) {
        if(i == 0) {
            changeHeader();
        }

        content[i].style.display = 'flex';
        bullet[i].classList.add('active');

        await sleep(15000);

        content[i].classList.add('switch');

        await sleep(1000);

        content[i].style.display = 'none';
        bullet[i].classList.remove('active');
        content[i].classList.remove('switch');
        
        if(i == (content.length - 1)) {
            i = -1;
        }
    }
}

async function changeHeader() {
    header = document.getElementsByClassName('description')[0];
    wordBank = ['[Passionate]', '[Productive]', '[Fast-Learning]', '[Committed]', '[Innovative]', '[Team-minded]', '[Thorough]', '[Detailed]'];

    var x = 1;
    await sleep(2000);
    while(isVisible('content')) {
        await sleep(1500);
        header.innerText = wordBank[randomNumber(8)];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function randomNumber(max) {
    return Math.floor(Math.random() * max)
}

function isVisible(string){
    visible = document.getElementsByClassName(string)[0];
    if(getComputedStyle(visible).display == 'none') {
        return false;
    }
    return true;
}