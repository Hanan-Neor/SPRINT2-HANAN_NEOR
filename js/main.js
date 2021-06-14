
var gCanvas = document.querySelector('canvas');
var gCtx;
var gImg;
var gIsBorder = true;

function init() {
    document.querySelector('body').hidden = false;
    // console.dir(gCanvas)
    var imgs = getImgs();
    renderImgs(imgs);
    renderKeywords();
    gCanvas = document.querySelector('canvas');
    gCtx = gCanvas.getContext('2d');
    quaryselectors();
}

function quaryselectors() {

    addMouseListeners()
    addTouchListeners()

    document.querySelector('.editor-grid .text').addEventListener("keydown", function (e) {
        if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
            onAddLine();
        }
    });
    document.querySelector('.editor-grid .font-input').addEventListener('mouseover', function () {
        document.querySelector('.editor-icons.color').style.background = "rgb(255, 127, 0)";
    })
    document.querySelector('.editor-grid .font-input').addEventListener('mouseout', function () {
        document.querySelector('.editor-icons.color').style.background = "white";
    })
    document.querySelector('.editor-grid .stroke-input').addEventListener('mouseover', function () {
        document.querySelector('.editor-icons.stroke').style.background = "rgb(255, 127, 0)";
    })
    document.querySelector('.editor-grid .stroke-input').addEventListener('mouseout', function () {
        document.querySelector('.editor-icons.stroke').style.background = "white";
    })
    // document.querySelector('.editor-grid .text').addEventListener('blur', function () {
    //     gIsBorder = false;
    //     drawTextNew(getCurrLine().txt);
    // });
}

function getCurrLine() {
    return currLine();
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
    onSetFilter('');
    document.querySelector('.main-content').style.display = "grid";
    document.querySelector('.meme-editor').style.display = "none";
    document.querySelector('.scnd-header-box').style.display = "block";
    // document.querySelector('.scnd-header').hidden= false;

    document.querySelector('.meme-editor').classList.remove('.flex');

}

function onToMemes() {
    var imgs = getSavedMemes();
    if (!getSavedMemes()) {
        document.querySelector('.img-container').innerHTML = 'nothing to show yet'
        // } else renderImgs(imgs);
    } else renderSavedImgs(imgs);
    document.querySelector('.main-content').style.display = "grid";
    document.querySelector('.meme-editor').style.display = "none";
    document.querySelector('.scnd-header-box').style.display = "none";
    // document.querySelector('.scnd-header').style.hidden = true;

    document.querySelector('.meme-editor').classList.remove('.flex');
}

function renderSavedImgs(savedMemesObjects) {
    var strHTML = savedMemesObjects.map(savedMemesObject => {
        return `
<img src=${savedMemesObject.canvas} onclick="onSavedImageClick(this)"/>

`
        //         return `
        // <img id=${savedMemesObject.selectedImgId} src=${savedMemesObject.canvas} onclick="onImgClick(this)"/>

        // `
    })
    document.querySelector('.img-container').innerHTML = strHTML.join('');
}

function onSavedImageClick(el) {
    gMeme = findElById(el.src);
    drawTextNew(currLine().txt)
    document.querySelector('.main-content').style.display = "none";
    document.querySelector('.meme-editor').style.display = "flex";
    renderFontsOptions();
}



function renderKeywords() {
    var keywords = getKeywords();
    var strHTML = ``
    var x = 0;
    for (let word in keywords) {
        if (x === 4) strHTML += `<span class="more" style="display:none; margin:0">`
        strHTML += `<span onclick="onSetFilter('${word}')">${word}</span>`
        // strHTML+=`<a>${word}</a> `
        // console.log(`${word} : ${keywords[word]}`)
        //      }
        //     var strHTML = keywords.map(word => {
        //         return `
        // <span id=${image.id} onclick=""/>${word}

        // `
        //     })
        //     document.querySelector('.scnd-header .hashtags').innerHTML = strHTML.join('')

        x++;
    }
    strHTML += `</span>`
    // strHTML+=`</span>`
    document.querySelector('.scnd-header .hashtags').innerHTML = strHTML
}

function onImgClick(el) {
    // gMeme.url = el.src;
    gMeme.selectedImgId = el.id;
    // drawImage(el);
    drawTextNew('');
    document.querySelector('.main-content').style.display = "none";
    document.querySelector('.meme-editor').style.display = "flex";
    drawTextNew(getCurrLine().txt);
    onCleanText()
    renderFontsOptions();
    document.querySelector('.editor-grid .text').focus();
}

function renderFontsOptions() {
    var strHTML = fonts.map(font => {
        return `
        <option >${font}</option>
        `
    })
    document.querySelector('.editor-grid select').innerHTML = strHTML.join('');

}

function onSaveClick() {
    gIsBorder = false;
    drawTextNew(currLine().txt);
    setTimeout(function () { ///To handle border display
        saveMeme()
        onToMemes()
    }, 10);



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
    gIsBorder = true;
    if (!gMeme.lines[gMeme.lines.length - 1].txt) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
        drawTextNew(getCurrLine().txt);   //    to keep the border of the current line
        document.querySelector('.editor-grid .text').value = '';
        document.querySelector('.editor-grid .text').focus();
        return;
    }
    addLine();
    document.querySelector('.editor-grid .text').focus();
    document.querySelector('.editor-grid .text').value = '';
    document.querySelector('.editor-grid .text').style.textAlign = "center";
}


function onIncTextSize() {
    gIsBorder = true;
    incTextSize();
}

function onDecTextSize() {
    gIsBorder = true;
    decTextSize();
}

function onTextToLeft() {
    gIsBorder = true;
    document.querySelector('.editor-grid .text').style.textAlign = "left";
    textToLeft();
}

function onTextToCenter() {
    gIsBorder = true;
    document.querySelector('.editor-grid .text').style.textAlign = "center";
    textToCenter();
}

function onTextToRight() {
    gIsBorder = true;
    document.querySelector('.editor-grid .text').style.textAlign = "right";
    textToRight();
}

function onCleanLine() {
    gIsBorder = true;
    cleanLine();
    document.querySelector('.editor-grid .text').style.textAlign = getCurrLine().align;
    document.querySelector('.editor-grid .text').value = getCurrLine().txt;
    document.querySelector('.editor-grid .text').focus();
}
function onCleanText() {
    gIsBorder = true;
    cleanText();
    document.querySelector('.editor-grid .text').style.textAlign = getCurrLine().align;
    document.querySelector('.editor-grid .text').value = getCurrLine().txt;
    document.querySelector('.editor-grid .text').focus();
}


function onStrokeColor(color) {
    gIsBorder = true;
    setStrokeColor(color);
}
function onFontColor(color) {
    gIsBorder = true;
    setFontColor(color);
}

function renderCanvas(text, x, y) {
    gCtx.fillText(text, x, y, gCanvas.width - 8);
    gCtx.strokeText(text, x, y, gCanvas.width - 8);
}

function onChooseRow() {
    gIsBorder = true;
    chooseRow();
    document.querySelector('.editor-grid .text').value = getCurrLine().txt;
    document.querySelector('.editor-grid .text').style.textAlign = getCurrLine().align;
}

function onChangeFont(font) {
    gIsBorder = true;
    changeFont(font);
}

function onDrawBorder() {
    gIsBorder = true;
    drawBorder();
}

function onLineDown() {
    gIsBorder = true;
    lineDown()
}

function onLineUp() {
    gIsBorder = true;
    lineUp();
}

function onSetFilter(txt) {
    setFilter(txt);
    init();
}


// function onMoreClick(el) {
//     if (document.querySelector('.scnd-header .hashtags').style.height === '0px') {
//         document.querySelector('.scnd-header .hashtags').style.height = '100%'
//         el.innerText = 'X'
//     }
//     else {
//         document.querySelector('.scnd-header .hashtags').style.height = '0px'
//         el.innerText = 'more..'
//         document.querySelector('.scnd-header .hashtags').style.zIndex = '-1'
//     }
// }
function onMoreClick(el) {
    // document.querySelector('.scnd-header .hashtags .more').hidden = false;
if(el.innerText === 'more..'){
    document.querySelector('.scnd-header .hashtags .more').style.display = 'inline-block';
    //     document.querySelector('.scnd-header .hashtags').style.height = '100%'
    el.innerText = 'X'

    }
    else {
        document.querySelector('.scnd-header .hashtags .more').style.display= 'none'
    el.innerText = 'more..'
    }
}