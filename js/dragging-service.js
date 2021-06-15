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


function onDown(ev) {
    // console.log(ev);

    const pos = getEvPos(ev)
    // console.log(pos);
    if (!isLineClicked(pos)) {
        gIsBorder = false;

        drawTextNew(currLine().txt);

        return
    };
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

function isLineClicked(clickedPos) {
    for (var i = 0; i < gMeme.lines.length; i++) {
        const txtWidth = gCtx.measureText(gMeme.lines[i].txt).width;
        let x;
        switch (gMeme.lines[i].align) {
            case 'center': x = gMeme.lines[i].x - txtWidth / 2;
                break;
            case 'right': x = gMeme.lines[i].x - txtWidth;
                break;
            case 'left': x = gMeme.lines[i].x;
                break;
        }

        // if(clickedPos.y >= getCurrLine().borderY && clickedPos.y <= getCurrLine().borderY+getCurrLine().size)
        if (clickedPos.y > gMeme.lines[i].y - gMeme.lines[i].size / 2 && clickedPos.y < gMeme.lines[i].y + gMeme.lines[i].size / 2
            && clickedPos.x > x && clickedPos.x < x + txtWidth) {
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
    getCurrLine().align = 'center'//// exits from the align left or right.
    document.querySelector('.editor-grid .text').style.textAlign = "center";

    // gCircle.pos.x += dx
    getCurrLine().y += dy
    getCurrLine().x += dx
    // getCurrLine().borderX +=dx
    // getCurrLine().borderY += dy
}



