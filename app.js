const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName("jsColor")
const range = document.getElementById("jsRange")
const mode = document.getElementById("jsMode")
const saveBtn = document.getElementById("jsSave")

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle =INITIAL_COLOR
ctx.lineWidth=2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting= true;
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y)
        ctx.stroke()
    }

}



function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0, canvas.width, canvas.height)}
}
    
function handleCM(event){
    event.preventDefault();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown",startPainting)
    canvas.addEventListener("mouseup",stopPainting)
    canvas.addEventListener("mouseleave",stopPainting)
    canvas.addEventListener("mousedown", handleCanvasClick)
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick))

function handleRangeChange(event){
    const size = event.target.value 
    ctx.lineWidth = size;
}

if(range){
    range.addEventListener("input",handleRangeChange)
}

function handleModeClick(){
    if(filling ===true){
        filling =false;
        mode.innerText="Fill"
    } else {
        filling = true;
        mode.innerText ="Paint"
        
    }

}

if(mode){
    mode.addEventListener("click",handleModeClick)
}

function handleSaveClick(){
    const image = canvas.toDataURL()
    const link = document.createElement("a")
    link.href=image
    link.download = "PaintJS[🎨]"
    link.click();
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick)
}
