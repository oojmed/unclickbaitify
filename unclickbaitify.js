function getTitleElements() {
    return [].slice.call(document.getElementsByTagName('*')).filter((x) => x.id === 'video-title');
}

function getVideowallTitles() {
    return [].slice.call(document.getElementsByClassName('ytp-videowall-still-info-title'));
}

function getVideoTitle() {
    return document.getElementsByClassName('title')[0];
}

function titleCase(s) { // https://stackoverflow.com/a/22193094
    return s.split(' ')
        .map(w => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(' ');
}

function removeRepeatedPunctuation(s) {
    return s.replace(/[!]{2,}/, '!').replace(/[?]{2,}/, '?');
}

function unclickbait(s) {
    if (s === undefined ||  s === null || s === '') { return ''; }

    return titleCase(removeRepeatedPunctuation(s));
}

function unclickbaitify() {
    getTitleElements().forEach((x) => x.innerText = unclickbait(x.title));

    getVideowallTitles().forEach((x) => x.innerText = unclickbait(x.innerText));

    unclickbaitTitle();
}

function unclickbaitTitle() {
    let videoTitle = getVideoTitle();

    if (videoTitle === undefined) {
        setTimeout(unclickbaitTitle, 1000);
    }

    let videoTitleUnclickbait = unclickbait(videoTitle.innerText);

    let documentTitle = unclickbait(document.title.replace(' - YouTube', ''));

    /*if (videoTitleUnclickbait !== documentTitle) {
        videoTitle.innerText = documentTitle;

        console.log('dang');
    }*/

    videoTitle.innerText = documentTitle;

    document.title = document.title.replace(document.title.replace(' - YouTube', ''), documentTitle);
}

document.onclick = function () {
    unclickbaitify();
};

unclickbaitify();

setInterval(unclickbaitify, 5000);