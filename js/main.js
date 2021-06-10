
var gCanvas = document.querySelector('canvas');
var gCtx
var gImg;

function init() {
    // console.dir(gCanvas)
    var imgs = getImgs();
    renderImgs(imgs);
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
}


function renderImgs(imgs) {
    var strHTML = imgs.map(image => {
        return `
<img id=${image.id} src=${image.url} onclick="onImgClick(this)"/>

`
    })
    document.querySelector('.img-container').innerHTML = strHTML.join('');
}

function onToGallery() {
    document.querySelector('.main-content').style.display = "grid";
    document.querySelector('.meme-editor').style.display = "none";
    document.querySelector('.meme-editor').classList.remove('.flex');
}


function onImgClick(el) {
    gMeme.selectedImgId = el.id;
    drawImage(el);
    document.querySelector('.main-content').style.display = "none";
    document.querySelector('.meme-editor').style.display = "flex";
}

function drawImage(el) {
    gImg = el;
    // gMeme.id = el.id;
    var canHeight = getCanvasHeight(el.width, el.height);
    gCanvas.setAttribute("height", canHeight);
    gCtx.drawImage(el, 0, 0, gCanvas.width, gCanvas.height);
}


function onShareClick() {

}


function drawImageById(obMeme) {
    meme = getElMemeById(obMeme);
    var canHeight = getCanvasHeight(el.width, el.height);
    gCanvas.setAttribute("height", canHeight);
    gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height);
}


function getElMemeById(obMeme) {
    elMeme = `<img id=${obMeme.id} src=${image.url}"/>`
}


function onAddLine() {
    document.querySelector('.editor-grid .text').value = '';
    addLine();
}


function onIncTextSize() {
    incTextSize();
}

function onDecTextSize() {
    decTextSize();
}

function onTextToLeft() {
    document.querySelector('.editor-grid .text').style.textAlign = "left";
    textToLeft();
}
function onTextToCenter() {
    document.querySelector('.editor-grid .text').style.textAlign = "center";
    textToCenter();
}
function onTextToRight() {
    document.querySelector('.editor-grid .text').style.textAlign = "right";
    textToRight();
}

function onCleanText() {
    document.querySelector('.editor-grid .text').value = '';
    cleanText();
}


function renderCanvas(text, x, y) {
    gCtx.fillText(text, x, y, gCanvas.width - 10);
    gCtx.strokeText(text, x, y, gCanvas.width - 10);
}