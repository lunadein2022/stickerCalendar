//달력에 사용될 박스들의 클래스

class Box{
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
        this.div.style.border = "1px solid #999999";
        this.div.style.position="absolute";
        this.div.style.left=this.x+"px"
        this.div.style.top=this.y+"px"

        this.div.innerText=this.text; //텍스트

        this.container.appendChild(this.div) //붙이기
    }
    setText(text){
        this.text=text;
        this.div.innerText=this.text;
        //텍스트변경
    }
}