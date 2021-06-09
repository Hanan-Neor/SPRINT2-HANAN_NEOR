



function init() {
    var imgs = getImgs();
    renderImgs(imgs);
}




function renderImgs(imgs) {
    var strHTML = imgs.map(image => {
        return `
<img src=${image.url} onclick="onImgClick()"/>

`
    })
    document.querySelector('.img-container').innerHTML = strHTML.join('');
    // imgs.forEach(image => {
    // strHTML+=`<img src="${image.url} onclick="onImgClick()"/>`  
    // });

}