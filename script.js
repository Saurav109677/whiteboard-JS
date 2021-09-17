
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let topOffset=canvas.getBoundingClientRect().top;
let isPenDown = false;
let lastDrawingDB = [];
let pointsDB = [];

let eraserImg = document.querySelector(".tool img[title='eraser']");
let pencilImg = document.querySelector(".tool img[title='pencil']");
let redoImg = document.querySelector(".tool img[title='redo']");
let undoImg = document.querySelector(".tool img[title='undo']");
let pencilDropdown = document.querySelector("#pencil-dropdown");
let eraserDropdown = document.querySelector("#eraser-dropdown");
let pencilSlider = document.querySelector("#pencil-slider");

eraserImg.addEventListener("click",function(){
    if(!eraserImg.classList.contains("active-tool")){
        pencilImg.classList.remove("active-tool");
        eraserImg.classList.add("active-tool");
        pencilDropdown.classList.add("hide");
        eraserDropdown.classList.add("hide");
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
    if(!pencilImg.classList.contains("active-tool")){
        eraserImg.classList.remove("active-tool");
        pencilImg.classList.add("active-tool");
        eraserDropdown.classList.add("hide");
        pencilDropdown.classList.add("hide");
        // set default stroke color to black
        ctx.strokeStyle = "black";
        // ctx.lineWidth = 100;
    }
    else{
        
        if(pencilDropdown.classList.contains("hide")){
            // next click then open the dropdwon
            pencilDropdown.classList.remove("hide");
            eraserDropdown.classList.add("hide");
            // set pencilsize
            console.log(pencilSlider);
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
        console.log("redo");
    }
    
})

function draw(points){
    for(let i=0;i<points.length;i++){
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
        console.log("undo");
    }
    
})

function reDraw(){
    for(let i=0;i<pointsDB.length;i++){
        for(let j=0;j<pointsDB[i].length;j++){
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
    let x = e.clientX;
    let y = e.clientY-topOffset;

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.stroke();

    isPenDown = true;

    pointsObj.push({
        id: "md",
        x,
        y
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
            y
        })
    }
    
})

canvas.addEventListener("mouseup",function(e){
    isPenDown = false;
    pointsDB.push(pointsObj);
    pointsObj = [];
    // console.log(pointsDB);
})