
let canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


let topOffset=canvas.getBoundingClientRect().top;
let isPenDown = false;

window.addEventListener("resize",function(){
    canvas.height = window.innerHeight - topOffset;
    canvas.width = window.innerWidth;
})

canvas.addEventListener("mousedown",function(e){
    let x = e.clientX;
    let y = e.clientY-topOffset;

    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.stroke();

    isPenDown = true;
})


canvas.addEventListener("mousemove",function(e){
    let x = e.clientX;
    let y = e.clientY-topOffset;

    if(isPenDown){
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    
})

canvas.addEventListener("mouseup",function(e){
    isPenDown = false;
})