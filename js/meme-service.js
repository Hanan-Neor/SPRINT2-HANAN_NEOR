var gLineNum
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
    { id: 1, url: 'img/aspect-ratios//1.jpg', keywords: ['trump'] },
    { id: 2, url: 'img/aspect-ratios/2.jpg', keywords: ['trump'] },
    { id: 3, url: 'img/aspect-ratios/3.jpg', keywords: ['dogs', 'animals', 'cute'] },
    { id: 4, url: 'img/aspect-ratios/4.jpg', keywords: ['dog', 'animals', 'baby', 'sleeping'] },
    { id: 5, url: 'img/aspect-ratios/5.jpg', keywords: ['cat', 'animals', 'sleeping'] },
    { id: 6, url: 'img/aspect-ratios/6.jpg', keywords: ['trump'] },
    { id: 7, url: 'img/aspect-ratios/7.jpg', keywords: ['trump'] },
    { id: 8, url: 'img/aspect-ratios/8.jpg', keywords: ['trump'] },
    { id: 9, url: 'img/aspect-ratios/9.jpg', keywords: ['trump'] },
    { id: 10, url: 'img/aspect-ratios/10.jpg', keywords: ['trump'] },
    { id: 11, url: 'img/aspect-ratios/11.jpg', keywords: ['trump'] },
    { id: 12, url: 'img/aspect-ratios/12.jpg', keywords: ['trump'] },
    { id: 13, url: 'img/aspect-ratios/13.jpg', keywords: ['trump'] },
    { id: 14, url: 'img/aspect-ratios/14.jpg', keywords: ['trump'] },
    { id: 15, url: 'img/aspect-ratios/15.jpg', keywords: ['trump'] },
    { id: 16, url: 'img/aspect-ratios/16.jpg', keywords: ['trump'] },
    { id: 17, url: 'img/aspect-ratios/17.jpg', keywords: ['trump'] },
    { id: 18, url: 'img/aspect-ratios/18.jpg', keywords: ['trump'] },
];

const fonts = ['Impact','Arial', 'Calibri', 'Comic Sans MS', 'Segoe UI Semibold', 'Tahoma', 'Times New Roman', 'David Bold', 'Miriam']


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
        }
    ]
}
var gFont = 'Impact';

var gCurrLine = gMeme.lines[gMeme.selectedLineIdx];


function getImgs() {

    var imgs = gImgs;

    return imgs;
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
    console.log(currLine);
}


function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
}


function drawTextNew(text) {

    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage(gImg);

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


function incTextSize() {
    gMeme.lines[gMeme.selectedLineIdx].size += 5;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);
}

function decTextSize() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 5;
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
    console.log(gMeme.selectedLineIdx);
    if (gMeme.selectedLineIdx === 0) {
        gMeme.selectedLineIdx = gMeme.lines.length - 1;
    } else {
        gMeme.selectedLineIdx--;
    }
    console.log(gMeme.selectedLineIdx);
}

function changeFont(font) {
    gFont = font;
    drawTextNew(gMeme.lines[gMeme.selectedLineIdx].txt);

}