var gLineNum
var gKeywords = {
    'happy': 12, 'baby': 1, 'yes': 0, 'success': 0, 'dancing': 0, 'trump': 0, 'dogs': 0,
    'animals': 0, 'cute': 0, 'sleeping': 0, 'cat': 0, 'interesting': 0, 'gotcha': 0, 'you': 0, 'blame': 0, 'scream': 0,
    'shout': 0, 'explaining': 0, 'but': 0, 'fake': 0, 'barak': 0, 'obama': 0, 'happy': 0, 'lought': 0, 'sport': 0, 'basketball': 0,
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
    { id: 17, url: 'img/aspect-ratios/17.jpg', keywords: ['barak', 'obama', 'happy', 'lought'] },
    { id: 18, url: 'img/aspect-ratios/18.jpg', keywords: ['sport', 'basketball', 'bro'] },
];

const fonts = ['Impact', 'Arial', 'Calibri', 'Comic Sans MS', 'Segoe UI Semibold', 'Tahoma', 'Times New Roman', 'David Bold', 'Miriam']


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'very funny',
            size: 40,
            align: 'center',
            fontColor: 'white',
            strokeColor: 'black',
            // x: gCanvas.width / 2,
            // y: 10,
            x: gCanvas.width / 2,
            y: 30,
            borderX: 10,
            borderY: 10,
        }
    ]
}


var gFont = 'Impact';

var gCurrLine = gMeme.lines[gMeme.selectedLineIdx];


function getImgs() {

    var imgs = gImgs;

    return imgs;
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
    backToDefault();
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage(gImg); //////// -------------------- Is this Stupid? how to Backspace without ereaseing the picture?
    gY = getY() - 20;

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
    })
}

function addLine() {
    gMeme.selectedLineIdx++;
    gMeme.lines.push({})
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.txt = '';
    currLine.size = 40;
    currLine.align = 'center';
    currLine.fontColor = 'white';
    currLine.strokeColor = 'black';
    currLine.x = getX();
    currLine.y = getY();
    gMeme.lines[gMeme.selectedLineIdx].borderY = getY() - 20;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);   //    to erease old border

}


function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
}


function drawTextNew(text) {

    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage(gImg);
    if (gIsBorder) {
        drawBorder();
    }
    gMeme.lines.forEach(line => {
        var x = line.x;
        var y = line.y;

        // setTextPos(line);
        gCtx.textBaseline = 'middle';

        gCtx.font = `${line.size}px ${gFont},Impact,Segoe UI Semibold`;
        gCtx.lineWidth = 2;
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.fontColor;
        gCtx.textAlign = line.align;
        renderCanvas(line.txt, x, y);
    })
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
    switch (gMeme.lines[gMeme.selectedLineIdx].align) {
        case 'center':
            // gCtx.textAlign = 'center';
            return gCanvas.width / 2;

        case 'left':
            // gCtx.textAlign = 'left';
            return 5;

        case 'right':
            // gCtx.textAlign = 'right';
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
            return 2.5;
        case 1:
            return -2.5;
        default:
            return 0;
    }
}
// function drawBorder(x=10, y=10){
function drawBorder() {
    x = 3;
    y = gMeme.lines[gMeme.selectedLineIdx].borderY;
    // var y= gMeme.lines[gMeme.selectedLineIdx].size+5;
    gCtx.beginPath();
    gCtx.lineWidth = 2;

    // gCtx.rect(x, y, gCanvas.width - 20, gMeme.lines[gMeme.selectedLineIdx].size)
    gCtx.rect(x, y, gCanvas.width - 7, gMeme.lines[gMeme.selectedLineIdx].size)
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function incTextSize() {

    gMeme.lines[gMeme.selectedLineIdx].size += 5;
    if (gMeme.selectedLineIdx === 1) {
        gMeme.lines[gMeme.selectedLineIdx].borderY -= 5;
    } else if (gMeme.selectedLineIdx >= 2) gMeme.lines[gMeme.selectedLineIdx].borderY -= 2.5;
    gMeme.lines[gMeme.selectedLineIdx].y += getYshift();
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
    console.log(gY);
}

function decTextSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5;
    if (gMeme.selectedLineIdx === 1) {
        gMeme.lines[gMeme.selectedLineIdx].borderY += 5;
    } else if (gMeme.selectedLineIdx >= 2) gMeme.lines[gMeme.selectedLineIdx].borderY += 2.5;

    gMeme.lines[gMeme.selectedLineIdx].y -= getYshift();
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function textToLeft() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'left';
    gMeme.lines[gMeme.selectedLineIdx].x = getX();
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}
function textToCenter() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'center';
    gMeme.lines[gMeme.selectedLineIdx].x = getX();
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}
function textToRight() {
    gMeme.lines[gMeme.selectedLineIdx].align = 'right';
    gMeme.lines[gMeme.selectedLineIdx].x = getX();
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function setStrokeColor(color) {
    console.log(color);
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fontColor = color;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function chooseRow() {
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else {
        gMeme.selectedLineIdx--;
    }
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt); /// to draw the border 

}

function changeFont(font) {
    gFont = font;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function lineDown(){
    gMeme.lines[gMeme.selectedLineIdx].y+=5;
    gMeme.lines[gMeme.selectedLineIdx].borderY+=5
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function lineUp(){
    gMeme.lines[gMeme.selectedLineIdx].y-=5;
    gMeme.lines[gMeme.selectedLineIdx].borderY-=5
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}