
var gCanvas = document.querySelector('canvas');
var gCtx

function init() {
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
    // imgs.forEach(image => {
    // strHTML+=`<img src="${image.url} onclick="onImgClick()"/>`  
    // });

}




function onImgClick(el) {
    console.log(el.id);
    console.log(el.width);

    var canHeight = getCanvasHeight(el.width, el.height);
    gCanvas.setAttribute("height", canHeight);
    gCtx.drawImage(el, 0, 0, gCanvas.width, gCanvas.height);


    // document.querySelector('.meme-editor p').innerHTML = `<img src="${el.src}"/>`   
    document.querySelector('.main-content').style.display = "none";
    // document.querySelector('.meme-editor').classList.add('.flex');
    document.querySelector('.meme-editor').style.display = "flex";
}


function onShareClick() {
    document.querySelector('.main-content').style.display = "grid";

    document.querySelector('.meme-editor').style.display = "none";
    document.querySelector('.meme-editor').classList.remove('.flex');
}