let fileUploadImg = document.querySelector("#file-upload");
let file = document.querySelector("#file");
let downloadImg = document.querySelector("#download");

downloadImg.addEventListener("click",function(){
    let filePath = canvas.toDataURL("image/png")

    let aTag = document.createElement("a");
    aTag.setAttribute("href",filePath);
    aTag.setAttribute("download","image.png")
    aTag.click();
    aTag.remove();
})

fileUploadImg.addEventListener("click",function(){
    file.click();
})

file.addEventListener("change",function(){
   let fileObject = file.files[0]
   let filePath = URL.createObjectURL(fileObject);

   let img = document.createElement("img");
   img.setAttribute("src",filePath);
   img.style.width = "100%"

   // get image in sticky .. remove text area
            let stickyHeader = document.createElement("div");
            stickyHeader.classList.add("sticky-header");

            let minimize = document.createElement("div");
            minimize.classList.add("minimize");

            let close = document.createElement("div");
            close.classList.add("close");

            let stickyContent = document.createElement("div");
            stickyContent.classList.add("sticky-content")

            stickyContent.appendChild(img);

            stickyHeader.appendChild(minimize)
            stickyHeader.appendChild(close)

            let sticky = document.createElement("div");
            sticky.classList.add("sticky");

            sticky.appendChild(stickyHeader);
            sticky.appendChild(stickyContent);

            document.body.appendChild(sticky);

            // adding events
            // let minimizeDiv = document.querySelector(".minimize");
            let isMinimized = false;
            minimize.addEventListener("click",function(){
                if(!isMinimized)
                    img.classList.add("hide");
                else   
                    img.classList.remove("hide"); 

                isMinimized = !isMinimized;
            })

            close.addEventListener("click",function(){
                sticky.remove();
            })

            //move sticky note

            let initialX;
            let initialY;
            let isStickyHold = false;
            stickyHeader.addEventListener("mousedown",function(e){
                initialX = e.clientX;
                initialY = e.clientY;
                isStickyHold = true;
            })

            stickyHeader.addEventListener("mousemove",function(e){
                if(isStickyHold){
                    let finalX = e.clientX;
                    let finalY = e.clientY;
                    
                    // console.log(initialY);

                    let dx = finalX-initialX;
                    let dy = finalY-initialY;
                    // console.log(dx, dy);
                    let {top,left} = sticky.getBoundingClientRect();

                    sticky.style.top = top+dy+"px";
                    sticky.style.left = left + dx+"px";
                    
                    initialX = finalX;
                    initialY = finalY;
                }
                
            })

            stickyHeader.addEventListener("mouseup",function(e){
                isStickyHold = false;
            })
            

//    document.body.appendChild(img);
})