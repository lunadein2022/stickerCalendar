class DayBox{
    //요일박스
    constructor(container, width, height, x, y, text){
        this.container=container;
        this.div;
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.text=text;
        
        //create Box & style
        this.div = document.createElement("div");
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        this.div.style.position="absolute";
        this.div.style.left=this.x+"px"
        this.div.style.top=this.y+13+"px"
        this.div.style.fontSize=22+'px'

        this.div.innerText=this.text; //텍스트

        this.container.appendChild(this.div) //붙이기
    }
}