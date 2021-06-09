
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [
{ id: 1, url: 'img/aspect-ratios//1.jpg', keywords: ['trump'] },
{ id: 2, url: 'img/aspect-ratios/2.jpg', keywords: ['trump'] },
{ id: 3, url: 'img/aspect-ratios/3.jpg', keywords: ['dogs','animals','cute'] },
{ id: 4, url: 'img/aspect-ratios/4.jpg', keywords: ['dog','animals','baby','sleeping'] },
{ id: 5, url: 'img/aspect-ratios/5.jpg', keywords: ['cat','animals','sleeping'] },
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





function getCanvasHeight(imgWidth,imgHeight){
    // var canWidth = document.querySelector('canvas');
    var canWidth = gCanvas.width;
      var canHeight = (imgHeight * canWidth)/imgWidth;
return canHeight;
}