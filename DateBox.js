class DateBox extends Box {
    //날짜박스 정의
    constructor(container, width, height, x, y, text) {
      super(container, width, height, x, y, text);
      this.div.style.border = "1px solid #2f5a2d";
      this.div.style.background = "white"
    }
  }