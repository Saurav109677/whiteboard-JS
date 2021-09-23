socket.on("md",(pointObj)=>{
    ctx.beginPath();
    ctx.moveTo(pointObj.x,pointObj.y);
    ctx.strokeStyle = pointObj.contextStyle;
    ctx.lineWidth = pointObj.contextWidth;
})

socket.on("mm",(pointObj)=>{
    ctx.lineTo(pointObj.x,pointObj.y);
    ctx.stroke();
    ctx.strokeStyle = pointObj.contextStyle;
    ctx.lineWidth = pointObj.contextWidth;
})