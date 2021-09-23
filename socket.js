socket.on("md",(pointObj)=>{
    ctx.beginPath();
    ctx.moveTo(pointObj.x,pointObj.y);
})

socket.on("mm",(pointObj)=>{
    ctx.lineTo(pointObj.x,pointObj.y);
    ctx.stroke();
})