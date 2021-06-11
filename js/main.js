
var gCanvas = document.querySelector('canvas');
var gCtx
var gImg;

function init() {
    // console.dir(gCanvas)
    var imgs = getImgs();
    renderImgs(imgs);
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');

    document.querySelector('.editor-grid .font-input').addEventListener('mouseover' , function(){
        document.querySelector('.editor-icons.color').style.background="rgb(255, 127, 0)";
    })
    document.querySelector('.editor-grid .font-input').addEventListener('mouseout' , function(){
        document.querySelector('.editor-icons.color').style.background="white";
    })
    document.querySelector('.editor-grid .stroke-input').addEventListener('mouseover' , function(){
        document.querySelector('.editor-icons.stroke').style.background= "rgb(255, 127, 0)";
    })
    document.querySelector('.editor-grid .stroke-input').addEventListener('mouseout' , function(){
        document.querySelector('.editor-icons.stroke').style.background="white";
    })

    document.querySelector('.editor-grid .download').addEventListener('mouseover' , function(){
        gMeme.lines[gMeme.selectedLineIdx].borderY =1000;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);

    })
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
    // drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
    onCleanText()
    renderFontsOptions();
}

function renderFontsOptions(){
    var strHTML = fonts.map(font => {
        return `
        <option >${font}</option>
        `
    })
    document.querySelector('.editor-grid select').innerHTML = strHTML.join('');

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
    addLine();
    document.querySelector('.editor-grid .text').value = '';
    document.querySelector('.editor-grid .text').style.textAlign = "center";
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
    cleanText();
    document.querySelector('.editor-grid .text').style.textAlign = "center";
    document.querySelector('.editor-grid .text').value = '';
}


function onStrokeColor(color) {
    console.log(color);
    setStrokeColor(color);
}
function onFontColor(color) {
    console.log(color);
    setFontColor(color);
}

function renderCanvas(text, x, y) {
    gCtx.fillText(text, x, y, gCanvas.width - 10);
    gCtx.strokeText(text, x, y, gCanvas.width - 10);
}

function onChooseRow(){
    chooseRow();
    document.querySelector('.editor-grid .text').value = gMeme.lines[gMeme.selectedLineIdx].txt;

}

function onChangeFont(font){
    changeFont(font);
}

function onDrawBorder(){
    drawBorder();
}

// // function drawBorder(x=10, y=10){
// function drawBorder(){
//     var x =10;
//     var y= getY()-20;
//     // var y= gMeme.lines[gMeme.selectedLineIdx].size+5;
//     gCtx.beginPath()
//     gCtx.lineWidth = 2

//     gCtx.rect(x,y,gCanvas.width-20,gMeme.lines[gMeme.selectedLineIdx].size)
//     gCtx.strokeStyle = 'white';
//     gCtx.stroke();
// }
