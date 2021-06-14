// ================================= GLOBALS ============================================

var gLineNum
var gKeywords = {
    'happy': 12, 'baby': 1, 'yes': 0, 'success': 0, 'dancing': 0, 'trump': 0, 'dogs': 0,
    'animals': 0, 'cute': 0, 'sleeping': 0, 'cat': 0, 'interesting': 0, 'gotcha': 0, 'you': 0, 'blame': 0, 'scream': 0,
    'shout': 0, 'explaining': 0, 'but': 0, 'fake': 0, 'barak': 0, 'obama': 0, 'happy': 0, 'lough': 0, 'sport': 0, 'basketball': 0,
    'bro': 0
}
var gImgs = [
    { id: 1, url: 'img/aspect-ratios//1.jpg', keywords: ['baby', 'yes', 'success'] },
    { id: 2, url: 'img/aspect-ratios/2.jpg', keywords: ['success', 'happy', 'dancing'] },
    { id: 3, url: 'img/aspect-ratios/3.jpg', keywords: ['trump'] },
    { id: 4, url: 'img/aspect-ratios/4.jpg', keywords: ['dogs', 'animals', 'cute'] },
    { id: 5, url: 'img/aspect-ratios/5.jpg', keywords: ['dogs', 'animals', 'baby', 'sleeping'] },
    { id: 6, url: 'img/aspect-ratios/6.jpg', keywords: ['cat', 'animals', 'sleeping'] },
    { id: 7, url: 'img/aspect-ratios/7.jpg', keywords: ['happy', 'interesting'] },
    { id: 8, url: 'img/aspect-ratios/8.jpg', keywords: ['happy', 'baby', 'gotcha'] },
    { id: 9, url: 'img/aspect-ratios/9.jpg', keywords: ['you', 'blame'] },
    { id: 10, url: 'img/aspect-ratios/10.jpg', keywords: ['blame', 'scream', 'shout'] },
    { id: 11, url: 'img/aspect-ratios/11.jpg', keywords: ['explaining'] },
    { id: 12, url: 'img/aspect-ratios/12.jpg', keywords: ['but', 'fake'] },
    { id: 13, url: 'img/aspect-ratios/13.jpg', keywords: ['baby', 'happy', 'dancing'] },
    { id: 14, url: 'img/aspect-ratios/14.jpg', keywords: ['trump'] },
    { id: 15, url: 'img/aspect-ratios/15.jpg', keywords: ['baby'] },
    { id: 16, url: 'img/aspect-ratios/16.jpg', keywords: ['dogs', 'animals'] },
    { id: 17, url: 'img/aspect-ratios/17.jpg', keywords: ['barak', 'obama', 'happy', 'lough'] },
    { id: 18, url: 'img/aspect-ratios/18.jpg', keywords: ['sport', 'basketball', 'bro'] },
];

var gSavedMemes = [
];

const fonts = ['Impact', 'Arial', 'Calibri', 'Comic Sans MS', 'Segoe UI Semibold', 'Tahoma', 'Times New Roman', 'David Bold', 'Miriam']

var gMeme = {
    canvas: '',
    url: '',
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'very funny',
            size: 40,
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            x: gCanvas.width / 2,
            y: 30,
            borderX: 10,
            borderY: 10,
            isDrag: false,
        }
    ]
}
// var gCurrLine = gMeme.lines[gMeme.selectedLineIdx];
var gRaw;
var gFont = 'Impact';
var gFilterBy = '';
const gTextSizeChange = 5;

// =======================================================================================================

function currLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function getImgs() {
    var regex = new RegExp(gFilterBy, 'i')
    var imgs = gImgs.filter(function (img) {
        return regex.test(JSON.stringify(img.keywords))
    })
    return imgs;
}

function getSavedMemes() {
    var savedMemes = loadFromStorage('gMemesDB')
    return savedMemes;
}

function saveMeme() {
    // const data = gCanvas.toDataURL();
    // const dataToSave = {url:data};
    // gSavedMemes.unshift(dataToSave)
    // saveToStorage('gMemesDB',gSavedMemes);

    gMeme.canvas = gCanvas.toDataURL();
    // console.log(gMeme.can);

    const data = JSON.parse(JSON.stringify(gMeme));
    gSavedMemes.unshift(data);
    saveToStorage('gMemesDB', gSavedMemes);
}

function findElById(elUrl) {
    var saved = getSavedMemes()
    var x = '';
    saved.forEach(meme => {
        console.log('meme.url:', meme.url);
        if (meme.canvas === elUrl) x = meme;
    })
    return x;
}

function getKeywords() {
    return gKeywords;
}

function getCanvasHeight(imgWidth, imgHeight) {
    // var canWidth = document.querySelector('canvas');
    var canWidth = gCanvas.width;
    var canHeight = (imgHeight * canWidth) / imgWidth;
    return canHeight;
}

function cleanText() {
    gMeme.lines.splice(1, gMeme.lines.length)
    backToDefault();
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawTextNew(currLine().txt);
}

function cleanLine() {
    if (gMeme.selectedLineIdx != 0) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx--;
    } else if (gMeme.lines.length != 1) {
        gMeme.lines.splice(gMeme.selectedLineIdx, 1)
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else {
        backToDefault()
    }
    drawTextNew(currLine().txt);
}

function backToDefault() {
    gFont = 'Impact';
    gCtx.textBaseline = 'top';
    gMeme.selectedLineIdx = 0;
    gMeme.lines.forEach(obj => {
        obj.txt = '';
        obj.size = 40;
        obj.align = 'center';
        obj.fontColor = 'white';
        obj.strokeColor = 'black';
        obj.x = gCanvas.width / 2;
        obj.y = 30;
        obj.borderY = 10;
    })
}

function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length; // and not ++ to secure adding line after choosing not the last line.
    gMeme.lines.push({})
    // var currLine = currLine();
    currLine().txt = '';
    currLine().size = 40;
    currLine().align = 'center';
    currLine().fontColor = 'white';
    currLine().strokeColor = 'black';
    currLine().x = getX();
    currLine().y = getY();
    currLine().borderY = getY() - 20;
    currLine().middleLinePos = getY() - 10;
    drawTextNew(currLine().txt);   //    to erease old border

}


function downloadMeme(elLink) {
    gIsBorder = false;
    drawTextNew(currLine().txt);

    const data = gCanvas.toDataURL();
    elLink.href = data;
}

function drawSavedMeme() {
    console.log(gMeme);
    gMeme.lines[0].txt = text;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage(gImg);


}

function getImgById(id) {
    var imgObj ;
   gImgs.forEach(img => {
       if (img.id == id) imgObj=img;
   })
   return imgObj

}


function drawTextNew(text) {
    currLine().txt = text;
    
    var x = getImgById(gMeme.selectedImgId);
    var img = new Image();
    img.src = x.url;
    img.onload = () => {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
        var canHeight = getCanvasHeight(img.width, img.height);
        gCanvas.setAttribute("height", canHeight);
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        if (gIsBorder) {
            drawBorder();
        }
        gMeme.lines.forEach(line => {
            var x = line.x;
            var y = line.y;
            gCtx.textBaseline = 'middle';
            gCtx.font = `${line.size}px ${gFont},Impact,Segoe UI Semibold`;
            gCtx.lineWidth = 2;
            gCtx.strokeStyle = line.strokeColor;
            gCtx.fillStyle = line.fontColor;
            gCtx.textAlign = line.align;
            renderCanvas(line.txt, x, y);
        })
    }
}

function setTextPos(line) {
    switch (line.align) {
        case 'center':
            gCtx.textAlign = 'center';
            break;
        case 'left':
            gCtx.textAlign = 'left';
            break;
        case 'right':
            gCtx.textAlign = 'right';
            break;
    }

    switch (gMeme.selectedLineIdx) {
        case 0: gCtx.textBaseline = 'top'
            break;
        case 1: gCtx.textBaseline = 'bottom'
            break;
        default: gCtx.textBaseline = 'middle'
            break;
    }
}

function getX() {
    switch (currLine().align) {
        case 'center':
            return gCanvas.width / 2;
        case 'left':
            return 5;
        case 'right':
            return gCanvas.width - 5;
    }
}

function getY() {
    switch (gMeme.selectedLineIdx) {
        case 0:
            return 30;
        case 1:
            return gCanvas.height - 30;
        default:
            return gCanvas.height / 2;
    }
}

function getYshift() {
    switch (gMeme.selectedLineIdx) {
        case 0:
            return gTextSizeChange / 2;
        case 1:
            return -gTextSizeChange / 2;
        default:
            return 0;
    }
}

function drawBorder() {
    var x = 3;
    var y = currLine().borderY;
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    // gCtx.rect(x, y, gCanvas.width - 7, currLine().size)
    gCtx.rect(x, y, gCanvas.width - 7, currLine().size+3)

    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}

function incTextSize() {
    currLine().size += gTextSizeChange;
    if (gMeme.selectedLineIdx === 1) {
        currLine().borderY -= gTextSizeChange;
    } else if (gMeme.selectedLineIdx >= 2) currLine().borderY -= gTextSizeChange / 2;
    currLine().y += getYshift();
    drawTextNew(currLine().txt);
}

function decTextSize() {
    currLine().size -= gTextSizeChange;
    if (gMeme.selectedLineIdx === 1) {
        currLine().borderY += gTextSizeChange;
        // currLine().middleLinePos+=gTextSizeChange/2;
    } else if (gMeme.selectedLineIdx >= 2) currLine().borderY += gTextSizeChange / 2;
    currLine().y -= getYshift();
    drawTextNew(currLine().txt);
}

function textToLeft() {
    currLine().align = 'left';
    currLine().x = getX();
    drawTextNew(currLine().txt);
}

function textToCenter() {
    currLine().align = 'center';
    currLine().x = getX();
    drawTextNew(currLine().txt);
}

function textToRight() {
    currLine().align = 'right';
    currLine().x = getX();
    drawTextNew(currLine().txt);
}

function setStrokeColor(color) {
    currLine().strokeColor = color;
    drawTextNew(currLine().txt);
}

function setFontColor(color) {
    currLine().fontColor = color;
    drawTextNew(currLine().txt);
}

function chooseRow() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else {
        gMeme.selectedLineIdx--;
    }
    // currLine().middleLinePos = 20;
    drawTextNew(currLine().txt); /// to draw the border 
}

function changeFont(font) {
    gFont = font;
    drawTextNew(currLine().txt);
}

function lineDown() {
    currLine().y += gTextSizeChange;
    currLine().borderY += gTextSizeChange;
    drawTextNew(currLine().txt);
}

function lineUp() {
    currLine().y -= gTextSizeChange;
    currLine().borderY -= gTextSizeChange;
    drawTextNew(currLine().txt);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

