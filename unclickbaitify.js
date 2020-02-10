function getTitleElements() {
    return [].slice.call(document.getElementsByTagName('*')).filter((x) => x.id === 'video-title');
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
    return titleCase(removeRepeatedPunctuation(s));
}

function unclickbaitify() {
    getTitleElements().forEach((x) => x.innerText = unclickbait(x.innerText));

    let videoTitle = getVideoTitle();

    videoTitle.innerText = unclickbait(videoTitle.innerText);
}

unclickbaitify();

setInterval(unclickbaitify, 5000);