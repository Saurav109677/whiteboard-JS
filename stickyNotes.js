let stickyImg = document.querySelector("#sticky");


stickyImg.addEventListener("click",function(){
        let stickyHeader = document.createElement("div");
        stickyHeader.classList.add("sticky-header");

        let minimize = document.createElement("div");
        minimize.classList.add("minimize");

        let close = document.createElement("div");
        close.classList.add("close");

        let stickyContent = document.createElement("div");
        stickyContent.classList.add("sticky-content");

        let textBox = document.createElement("textarea");
        textBox.setAttribute("id","stickybox")
        textBox.setAttribute("rows","10")
        textBox.setAttribute("cols","30")

        stickyContent.appendChild(textBox);

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
                textBox.classList.add("hide");
            else   
                textBox.classList.remove("hide"); 

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

        canvas.addEventListener("mousemove",function(e){
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
        
})

