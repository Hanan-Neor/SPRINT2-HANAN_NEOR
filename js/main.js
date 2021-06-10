
var gCanvas = document.querySelector('canvas');
var gCtx
var gImg;

function init() {
    var imgs = getImgs();
    renderImgs(imgs);
    // resizeCanvas();
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');

}

// function resizeCanvas() {
//     gCanvas.width = document.querySelector('.meme-editor').offsetWidth;
//     gCanvas.height = document.querySelector('.meme-editor').offsetHeight;

// }


function renderImgs(imgs) {
    var strHTML = imgs.map(image => {
        return `
<img id=${image.id} src=${image.url} onclick="onImgClick(this)"/>

`
    })
    document.querySelector('.img-container').innerHTML = strHTML.join('');
    // imgs.forEach(image => {
    // strHTML+=`<img src="${image.url} onclick="onImgClick()"/>`  
    // });

}

function onToGallery(){
    document.querySelector('.main-content').style.display = "grid";

    document.querySelector('.meme-editor').style.display = "none";
    document.querySelector('.meme-editor').classList.remove('.flex');


}




function onImgClick(el) {
    // console.log(el.id);
    // console.log(el.width);
    gMeme.selectedImgId = el.id;
    // console.log(gMeme);====================================================
    drawImage(el);
    // document.querySelector('.meme-editor p').innerHTML = `<img src="${el.src}"/>`   
    document.querySelector('.main-content').style.display = "none";
    // document.querySelector('.meme-editor').classList.add('.flex');
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



function drawImageById(obMeme){
   meme = getElMemeById(obMeme);
    var canHeight = getCanvasHeight(el.width, el.height);
    gCanvas.setAttribute("height", canHeight);
    gCtx.drawImage(meme, 0, 0, gCanvas.width, gCanvas.height);
}


function getElMemeById(obMeme){
    elMeme = `<img id=${obMeme.id} src=${image.url}"/>`
}