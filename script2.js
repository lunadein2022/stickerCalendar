let nowDate = new Date();
let storedStickers = {};

function getRandomByRange(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function createStickerImages() {
  const leftSide = document.getElementById('leftSide');
  const imageNames = Array.from({ length: 22 }, (_, i) => `${i + 1}.png`);

  const storedStickersKey = `stickers_${nowDate.getFullYear()}_${nowDate.getMonth() + 1}`;
  storedStickers = JSON.parse(localStorage.getItem(storedStickersKey)) || {};

  for (let i = 0; i < imageNames.length; i++) {
    const stickerId = i + 1;
    const stickerData = storedStickers[stickerId.toString()] || {};

    const img = document.createElement('img');
    img.src = `./sticker/${imageNames[i]}`;
    img.classList.add('sticker');
    img.style.position = 'absolute';
    img.style.left = `${stickerData.left || getRandomByRange(16, 194)}px`;
    img.style.top = `${stickerData.top || getRandomByRange(117, 546)}px`;
    img.setAttribute('id', stickerId);
    img.addEventListener('mousedown', startDragging);
    img.addEventListener('dblclick', removeSticker);

    leftSide.appendChild(img);
  }
}

function startDragging(e) {
  const sticker = e.target;
  const offsetX = e.clientX - sticker.offsetLeft;
  const offsetY = e.clientY - sticker.offsetTop;

  function moveSticker(e) {
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    const minX = -692;
    const maxX = -61;
    const minY = 5;
    const maxY = 549;

    sticker.style.left = `${Math.min(Math.max(x, minX), maxX)}px`;
    sticker.style.top = `${Math.min(Math.max(y, minY), maxY)}px`;
  }

  function stopDragging() {
    document.removeEventListener('mousemove', moveSticker);
    document.removeEventListener('mouseup', stopDragging);

    const stickerData = {
      year: nowDate.getFullYear(),
      month: nowDate.getMonth() + 1,
      date: nowDate.getDate(),
      left: parseInt(sticker.style.left),
      top: parseInt(sticker.style.top),
      id: sticker.getAttribute('id')
    };

    storedStickers[stickerData.id] = stickerData;
    localStorage.setItem(`stickers_${nowDate.getFullYear()}_${nowDate.getMonth() + 1}`, JSON.stringify(storedStickers));
  }

  document.addEventListener('mousemove', moveSticker);
  document.addEventListener('mouseup', stopDragging, { once: true });
}

function removeSticker(e) {
  const sticker = e.target;
  sticker.remove();

  const stickerId = sticker.getAttribute('id');
  delete storedStickers[stickerId];
  localStorage.setItem(`stickers_${nowDate.getFullYear()}_${nowDate.getMonth() + 1}`, JSON.stringify(storedStickers));
}

function resetStickers() {
    const stickers = document.getElementsByClassName('sticker');
    while (stickers.length > 0) {
      stickers[0].remove();
    }
    createStickerImages();
}

createStickerImages();
