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








var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}


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



// function drawText(text, x = 40, y = 40) {
//     gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
//     drawImage(gImg); //////// -------------------- Is this Stupid? how to Backspace without ereaseing the picture?
//     gCtx.font = '40px Arial'
//     gCtx.fillText(text, x, y);
//     gCtx.strokeText(text, x, y);
// }

function cleanText() {
    // gMeme.lines.forEach(obj=>{
    //     obj.txt = '';
    //     console.log(gMeme);
    // })
    // gMeme.lines.forEach(obj=>{
    backToDefault();
    // })

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage(gImg); //////// -------------------- Is this Stupid? how to Backspace without ereaseing the picture?

}

function backToDefault() {
    gMeme.lines.forEach(obj => {
        obj.txt = '';
        obj.size = 20;
        obj.align = 'left';
        obj.color = 'red';
        console.log(gMeme);
    })
}

function addLine() {
    gMeme.selectedLineIdx++;
    gMeme.lines.push({})
    var currLine = gMeme.lines[gMeme.selectedLineIdx];
    currLine.txt = '';
    currLine.size = 20;
    currLine.align = 'left';
    currLine.color = 'red';
}


function downloadMeme(elLink) {
    const data = gCanvas.toDataURL();
    elLink.href = data;
    // elLink.download = 'memegen';
}


function gMemeText(text) {
    // console.log(text);
    var textToWrite = gMeme.lines[gMeme.selectedLineIdx].txt = text;
    console.log(gMeme);
    drawTextNew(textToWrite)
}



function drawTextNew(text, x = 40) {
    switch (gMeme.selectedLineIdx) {
        case 0:
            y = 50;
            break;
        case 1:
            y = gCanvas.height - 50;
            break;
        default:
            y = gCanvas.height / 2;
    }
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawImage(gImg); //////// -------------------- Is this Stupid? how to Backspace without ereaseing the picture?
    gCtx.font = `${gMeme.lines[gMeme.selectedLineIdx].size}px Impact,tahoma`
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


// var gMeme = {
//     selectedImgId: 5,
//     selectedLineIdx: 0,
//     lines: [
//         {
//             txt: 'I never eat Falafel',
//             size: 20,
//             align: 'left',
//             color: 'red'
//         }
//     ]
// }
