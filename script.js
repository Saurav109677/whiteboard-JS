
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let topOffset=canvas.getBoundingClientRect().top;
let isPenDown = false;
let lastDrawingDB = [];
let pointsDB = [];
let lastSelectedColor = "black";
let lastSelectedWidth = "1";

let eraserImg = document.querySelector(".tool img[title='eraser']");
let pencilImg = document.querySelector(".tool img[title='pencil']");
let redoImg = document.querySelector(".tool img[title='redo']");
let undoImg = document.querySelector(".tool img[title='undo']");
let pencilDropdown = document.querySelector("#pencil-dropdown");
let eraserDropdown = document.querySelector("#eraser-dropdown");
let pencilSlider = document.querySelector("#pencil-slider");
let eraserSlider = document.querySelector("#eraser-slider");
let redPencil = document.querySelector(".red-pencil");
let greenPencil = document.querySelector(".green-pencil");
let bluePencil = document.querySelector(".blue-pencil");
let blackPencil = document.querySelector(".black-pencil");
let toggleTools = document.querySelector(".toggle-tools");
let toolBox = document.querySelector(".tool-box");
let closeIcon = document.querySelector("#close");
let show = document.querySelector("#show");


let isEraser = false;
let isToolHide = false;

toggleTools.addEventListener("click",function(){
    if(isToolHide==false){
        toolBox.classList.add("hide");
        show.style.display = "block";
        closeIcon.style.display = "none";
    }
    else{    
        toolBox.classList.remove("hide");
        // toolBox.classList.add("add-animation");
        show.style.display = "none";
        closeIcon.style.display = "block";
    }
    isToolHide=!isToolHide;
})

redPencil.addEventListener("click",function(){
    redPencil.classList.add("selected-color");
    bluePencil.classList.remove("selected-color");
    greenPencil.classList.remove("selected-color");
    blackPencil.classList.remove("selected-color");
    ctx.strokeStyle = "red";
    lastSelectedColor = "red";
})

greenPencil.addEventListener("click",function(){
    ctx.strokeStyle = "lightgreen";
    greenPencil.classList.add("selected-color");
    bluePencil.classList.remove("selected-color");
    redPencil.classList.remove("selected-color");
    blackPencil.classList.remove("selected-color");
    lastSelectedColor = "lightgreen";
})

bluePencil.addEventListener("click",function(){
    bluePencil.classList.add("selected-color");
    redPencil.classList.remove("selected-color");
    greenPencil.classList.remove("selected-color");
    blackPencil.classList.remove("selected-color");
    ctx.strokeStyle = "blue";
    lastSelectedColor = "blue";
})

blackPencil.addEventListener("click",function(){
    ctx.strokeStyle = "black";
    blackPencil.classList.add("selected-color");
    bluePencil.classList.remove("selected-color");
    greenPencil.classList.remove("selected-color");
    redPencil.classList.remove("selected-color");
    lastSelectedColor = "black";
})

pencilSlider.addEventListener("change",function(){
    ctx.lineWidth = pencilSlider.value;
})

eraserSlider.addEventListener("change",function(){
    ctx.lineWidth = eraserSlider.value;
})

eraserImg.addEventListener("click",function(){
    isEraser = true;
    if(!eraserImg.classList.contains("active-tool")){
        pencilImg.classList.remove("active-tool");
        eraserImg.classList.add("active-tool");
        pencilDropdown.classList.add("hide");
        eraserDropdown.classList.add("hide");
        ctx.lineWidth = 1;
        eraserSlider.value = 1;
        ctx.strokeStyle = "white";
        // ctx.lineWidth = 100;
    }
    else{

        if(eraserDropdown.classList.contains("hide")){
             // next click then open the dropdwon
            eraserDropdown.classList.remove("hide");
            pencilDropdown.classList.add("hide");
        }
        else{
            eraserDropdown.classList.add("hide")
        }

    }
})


pencilImg.addEventListener("click",function(){
    isEraser = false;
    if(!pencilImg.classList.contains("active-tool")){
        eraserImg.classList.remove("active-tool");
        pencilImg.classList.add("active-tool");
        eraserDropdown.classList.add("hide");
        pencilDropdown.classList.add("hide");
        // set default stroke color to black
        ctx.lineWidth = 1;
        pencilSlider.value = 1;
        ctx.strokeStyle = "black";
        // ctx.lineWidth = 100;
        
    }
    else{
        
        if(pencilDropdown.classList.contains("hide")){
            // next click then open the dropdwon
            pencilDropdown.classList.remove("hide");
            eraserDropdown.classList.add("hide");
       }
       else{
           pencilDropdown.classList.add("hide")
       }
    }
})


redoImg.addEventListener("click",function(){
    if(lastDrawingDB.length){
        let points = lastDrawingDB.pop();
        draw(points);
        pointsDB.push(points);
        // lastDrawingDB = lastDrawingDB.shift();
        console.log("redo",lastDrawingDB);
    }
    // else{
    //     ctx.strokeStyle = lastSelectedColor ;
    // }
    
})

function draw(points){
    for(let i=0;i<points.length;i++){
        ctx.strokeStyle = points[i].contextStyle;
        ctx.lineWidth = points[i].contextWidth;
        let x = points[i].x;
        let y = points[i].y;
            if(i==0){
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.stroke();
            }
            ctx.lineTo(x,y);
            ctx.stroke();
    }
}


undoImg.addEventListener("click",function(){
    if(pointsDB.length){
        //remove the last drwaing
        lastDrawingDB.push(pointsDB.pop());
        // pointsDB.shift
        // clear all drawing
        ctx.clearRect(0,0,canvas.width,canvas.height);
        // re-draw the drawing except the last one
        reDraw();
        console.log("undo",pointsDB);
    }
    // else{
    //     ctx.strokeStyle = lastSelectedColor ;
    // }
    
})

function reDraw(){
    for(let i=0;i<pointsDB.length;i++){
        for(let j=0;j<pointsDB[i].length;j++){
            ctx.strokeStyle = pointsDB[i][j].contextStyle;
            ctx.lineWidth = pointsDB[i][j].contextWidth;
            let x = pointsDB[i][j].x;
            let y = pointsDB[i][j].y;
            if(j==0){
                ctx.beginPath();
                ctx.moveTo(x,y);
                ctx.stroke();
            }
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}

window.addEventListener("resize",function(){
    canvas.height = window.innerHeight - topOffset;
    canvas.width = window.innerWidth;
    reDraw();
})

let pointsObj = [];
canvas.addEventListener("mousedown",function(e){

    // closing the dropdown if open
    pencilDropdown.classList.add("hide")
    eraserDropdown.classList.add("hide")
    if(!isEraser)
        ctx.strokeStyle = lastSelectedColor ;
    else    
    ctx.strokeStyle = "white" ;

    let x = e.clientX;
    let y = e.clientY-topOffset;

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.stroke();

    isPenDown = true;

    pointsObj.push({
        id: "md",
        x,
        y,
        contextStyle: ctx.strokeStyle,
        contextWidth: ctx.lineWidth
    });

})


canvas.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY-topOffset;

    if(isPenDown){
        ctx.lineTo(x,y);
        ctx.stroke();

        pointsObj.push({
            id: "mm",
            x,
            y,
            contextStyle: ctx.strokeStyle,
            contextWidth: ctx.lineWidth
        })
    }
    
})

canvas.addEventListener("mouseup",function(e){
    isPenDown = false;
    pointsDB.push(pointsObj);
    pointsObj = [];
    console.log("mouseup",pointsDB);
})