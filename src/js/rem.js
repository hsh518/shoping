const baseSize = 100;
function setRem() {
    // if (document.documentElement.clientWidth > 750) {
    //     document.documentElement.style.width = '750px';
    // }
    const scale = document.documentElement.clientWidth / 750;
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
}
setRem();
window.onresize = function () {
    setRem();
}