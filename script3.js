let title;
let dayTitle;
let content;
let dayArray = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
let dateArray = [];
let weather;



//1. 요일박스를 만들어 붙인다
//2. 날짜박스를 만들어 붙인다
//3. 날짜 정보를 갖다 붙인다.
//1. 시작 날짜가 어느 요일부터 시작하는가
//2. 마지막 날짜가 '몇 일'로 끝나는가

//4. 버튼 및 키보드를 누르면 이전, 이후 달로 이동


//요일박스만들기
function createDayBox() {
    for (let i = 0; i < dayArray.length; i++) {
        new DayBox(dayTitle, 100, 60, i * 100, 0, dayArray[i]);
    }
}

//날짜박스만들기
function createDateBox() {
    for (let a = 0; a < 6; a++) {
      let arr = new Array(7);
      for (let i = 0; i < dayArray.length; i++) {
        let dateBox = new DateBox(days, 100, 100, i * 100, a * 100, "");
        dateBox.div.setAttribute("id", `${dateBox.text}`);
        arr[i] = dateBox;
  
        let mark = document.createElement('div');
        mark.setAttribute('class', 'mark');
        mark.style.background = "url(red.png)";
        mark.style.backgroundSize = "contain";
        mark.style.width = "20px";
        mark.style.height = "20px";
        mark.style.borderRadius = "50%";
        mark.style.margin = "5px";
  
        dateBox.div.addEventListener("click", function () {
          alert(`${nowDate.getMonth() + 1}/${dateBox.text} 메모를 출력합니다`);
          const memoKey = `memo_${nowDate.getFullYear()}_${nowDate.getMonth() + 1}`;
          const storedData = localStorage.getItem(memoKey);
          const memoData = JSON.parse(storedData);
  
          for (let j = 0; j < memoData.length; j++) {
            if (Number(dateBox.text) === Number(memoData[j].date)) {
              console.log(memoData[j].memo);
              console.log(memoData[j].date);
              box.value = memoData[j].memo;
              inputMemo.value = memoData[j].date;
  
              dateBox.div.appendChild(mark);
            } else if (Number(dateBox.text) !== Number(memoData[j].date)) {
              box.value = "";
              inputMemo.value = "";
            }
          }
        });
      }
  
      dateArray.push(arr);
    }
  
    const memoKeys = Object.keys(localStorage).filter(key => key.startsWith('memo_'));
    for (const memoKey of memoKeys) {
      const storedData = localStorage.getItem(memoKey);
      const memoData = JSON.parse(storedData);
      for (let j = 0; j < memoData.length; j++) {
        const date = Number(memoData[j].date);
        const dateBoxId = `${date}`;
        const dateBox = document.getElementById(dateBoxId);
        if (dateBox) {
          const mark = document.createElement('div');
          mark.setAttribute('class', 'mark');
          mark.style.background = "url(red.png)"; 
          mark.style.backgroundSize = "contain";
          mark.style.width = "20px";
          mark.style.height = "20px";
          mark.style.borderRadius = "50%";
          mark.style.margin = "5px";
          dateBox.appendChild(mark);
        }
      }
    }
  }


//달력제목세팅하기
function setTitle() {
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth();
    title.innerText = year + " / " + (month + 1);
}

//마지막 날짜 구하기
function getLastDateOfMonth() {
    let d = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1); //현재 기준 다음 달
    d.setDate(0); //d가 다음달이므로 다음달의 이전달인 이 달의 마지막날짜가 됨
    return d.getDate();
}

function printDateNum() {
    let startDay = nowDate.getDay();
    let lastDay = getLastDateOfMonth();

    let count = 0;
    let n = 0;

    const currentDate = new Date();

    for (let i = 0; i < dateArray.length; i++) {
        for (let j = 0; j < dateArray[i].length; j++) {
            if (count >= startDay && n < lastDay) {
                n++;
                let dateBox = dateArray[i][j];
                dateBox.setText(n);
                dateBox.div.style.fontSize = "17px";
                dateBox.div.style.fontWeight = 400;
                if (
                    nowDate.getMonth() === currentDate.getMonth() &&
                    n === currentDate.getDate()
                ) {
                    dateBox.div.setAttribute("id", "today");
                    dateBox.div.style.border = "5px solid #2f5a2d";
                } else {
                    dateBox.div.style.border = "1px solid #000";
                }
            } else {
                dateArray[i][j].setText("");
                dateArray[i][j].div.style.border = "1px solid #000";
            }
            count++;
        }
    }
}


//날씨 api구해오기


const icon = document.querySelector('#content #rightSide .icon');
const image = document.createElement('img');
const div = document.createElement('div');
const today = document.getElementById('today');

//navigator.geolocation.getCurrentPosition()-> 현재위치에 대한 정보를 끌어올 수 있다. (버튼은 실행부일뿐)
addEventListener('load', () => {
    getWeather();
});

//API키 변수로 지정
const API_KEY = '75e0fa0f573bccc184d63daabf91e9ff';


//API이용해서 위도, 경도를 인수로 넣어 날씨에 대해 원하는 값 구하기

//axios버전 (내가 더 선호하기 때문에 이거 씀, 이유 : 간편하고 보기 편해서)
const getWeather = () => {
    axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}`)
        .then((response) => {
            const data = response.data;
            const iconImg = data.weather[0].icon;
            icon.src = `./weather/icons/${iconImg}.png`;
            icon.style.width = "130px";
            icon.style.height = "130px";
            image.src = `./weather/icons/${iconImg}.png`;
            image.style.width = "130px";
            image.style.height = "130px";
            const description = data.weather[0].description;
            div.textContent = description;
            div.style.position = "relative"
            div.style.top = "-8px"
            div.style.fontSize = "22px"
            weather.appendChild(div);
            rightSide.style.fontSize = 20 + 'px';
            rightSide.style.fontWeight = 600
            rightSide.style.color = '#2f5a2d';
            if (today) {
                today.appendChild(image);
            }
        })
        .catch((error) => {
            alert(error);
        });
};




//초기화
function init() {
    //html의 요소들을 js로 가져온다.
    title = document.getElementById('title')
    dayTitle = document.getElementById('day_title')
    content = document.getElementById('content')
    days = document.getElementById('days')
    weather = document.getElementById('weather')
    box = document.getElementById('box');
    inputMemo = document.getElementById('inputMemo');

    nowDate = new Date();
    nowDate.setDate(1);
    setTitle();
    printDateNum();

}

//로드
addEventListener('load', function () {
    init();
    createDayBox();
    createDateBox();
    printDateNum();
    createStickerImages();

    this.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            nowDate.setMonth(nowDate.getMonth() - 1);
            nowDate.setDate(1);
            setTitle();
            printDateNum();
            resetStickers();
            inputMemo.value = "";
            box.value = ""

        }
    })

    this.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            nowDate.setMonth(nowDate.getMonth() + 1);
            nowDate.setDate(1);
            setTitle();
            printDateNum();
            resetStickers();
            inputMemo.value = "";
            box.value = ""
        }
    })
})
