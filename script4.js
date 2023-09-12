let memo = document.getElementById('memo');
let box;
let inputMemo;
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; 

let mark = document.createElement('div');
mark.setAttribute('id', "mark")
mark.style.background = "red"
mark.style.width = "20px"
mark.style.height = "20px"
mark.style.borderRadius=50

let createMemoBox = function() {
  box = document.createElement('textarea');
  box.setAttribute("id", "box");
  memo.appendChild(box);
}

let createInputMemo = function() {
  inputMemo = document.createElement('input');
  inputMemo.setAttribute("id", "inputMemo");
  inputMemo.placeholder = "몇 일 메모인가요?";
  memo.appendChild(inputMemo);
}


addEventListener('load', function() {
  createMemoBox();
  createInputMemo();



  inputMemo.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
      const memoText = box.value;
      const memoInputValue = inputMemo.value;


      const title = document.getElementById('title').innerText;
      const year = title.slice(0, 4);
      const month = title.slice(7);
      const storageKey = `memo_${year}_${month}`;

      let storedData = localStorage.getItem(storageKey);

      if (storedData) {
        storedData = JSON.parse(storedData);
      } else {
        storedData = [];
      }

      let dataToStore = {
        memo: memoText,
        year: currentYear,
        month: currentMonth,
        date: memoInputValue,
      };

      storedData.push(dataToStore);

      localStorage.setItem(storageKey, JSON.stringify(storedData));
      box.value = "";
      inputMemo.value = "";

      // dateBox.div.appendChild(mark);
    }
  });
});
