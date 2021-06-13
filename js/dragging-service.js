var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var gCircle

function createCircle(pos) {
    gCircle = {
        pos,
        size: 120,
        color: 'blue',
        isDrag: false
    }
}



function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function getCircle() {
    return gCircle
}


function onDown(ev) {
    // console.log(ev);
    
    const pos = getEvPos(ev)
    // console.log(pos);
    if (!isLineClicked(pos)) {
    gIsBorder = false;

    drawTextNew(currLine().txt);
        
        return};
        gIsBorder = true;
    
        document.querySelector('.editor-grid .text').value = getCurrLine().txt;////not its place!!!!!!!!!!!
        document.querySelector('.editor-grid .text').style.textAlign = getCurrLine().align;////not its place!!!!!!!!!!!
        document.querySelector('.editor-grid .text').focus();
        
        drawTextNew(currLine().txt);
    setLineDrag(true)
    gStartPos = pos
    // document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const line = getCurrLine();
    if (line.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveLine(dx, dy)
        gStartPos = pos
        // renderCanvas()
        gIsBorder = true;
        drawTextNew(currLine().txt);
    // document.querySelector('.editor-grid .text').focus();


    }
}

function onUp() {
    setLineDrag(false)
    // document.body.style.cursor = 'grab'
}



function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



// function isLineClicked(clickedPos) {


//     // for(var i = 0 ; i<gMeme.lines.length; i++){
//     // const pos = gMeme.lines[0].borderY;

//     // const pos = currLine().borderY;
//     const pos = currLine().middleLinePos;

//     const distance = Math.sqrt((pos - clickedPos.y) ** 2)
//     // if( distance <= 20){
//     //  alert('hi')   
//     // gMeme.selectedLineIdx = i
//     // return true;
//     return distance <= 30;
// }
function isLineClicked(clickedPos) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        // if(clickedPos.y >= getCurrLine().borderY && clickedPos.y <= getCurrLine().borderY+getCurrLine().size)
        if (clickedPos.y >= gMeme.lines[i].borderY && clickedPos.y <= gMeme.lines[i].borderY + gMeme.lines[i].size) {
            gMeme.selectedLineIdx = i;
            // onChooseRow();
            return true;
        }
    }
}

function setLineDrag(isDrag) {
    getCurrLine().isDrag = isDrag
}
function moveLine(dx, dy) {

    // gCircle.pos.x += dx
    currLine().middleLinePos += dy;
    getCurrLine().y += dy
    getCurrLine().x += dx
    getCurrLine().borderY += dy
}
