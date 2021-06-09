var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [{ id: 1, url: 'img/popo.jpg', keywords: ['happy'] }];
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




function onImgClick(){
    document.querySelector('.main-content').style.display="none";
    // document.querySelector('.meme-editor').classList.add('.flex');
    document.querySelector('.meme-editor').style.display="flex";
}


function onShareClick(){
    document.querySelector('.main-content').style.display="grid";
    
    document.querySelector('.meme-editor').classList.remove('.flex');
}