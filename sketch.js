let spritesheet;
let animation = [];

// 圖片精靈的相關資訊 (根據圖片檔案的實際尺寸進行修正)
const spriteWidth = 235; // 整張圖片的寬度
const spriteHeight = 51;  // 整張圖片的高度
const numFrames = 6;      // 圖片中有 6 個影格

let frameWidth; // 單一影格的寬度
const frameDelay = 8; // 延遲影格更新速度，數值越大動畫越慢
const scaleFactor = 3;  // 角色放大倍率

// --- 角色移動相關變數 ---
let characterX;
let characterY;
const speed = 5; // 角色每幀移動的像素量 (目前未使用)

// 在 setup() 之前預先載入資源
function preload() {
  // 載入位於 '1' 資料夾內的圖片精靈
  spritesheet = loadImage('1/all.png');
}

function setup() {
  // 建立一個全視窗的畫布
  createCanvas(windowWidth, windowHeight);

  // 計算單一影格的寬度
  frameWidth = spriteWidth / numFrames;

  // 使用 for 迴圈切割 spritesheet，將每一個影格存入 animation 陣列
  for (let i = 0; i < numFrames; i++) {
    let frame = spritesheet.get(i * frameWidth, 0, frameWidth, spriteHeight);
    animation.push(frame);
  }

  // 初始化角色的起始位置
  characterX = width / 2; // 水平置中
  characterY = height / 2; // 垂直置中

  // 將圖片的繪製原點設定在中心，方便置中
  imageMode(CENTER);
}

function draw() {
  background('#d9d9d9');

  // 計算放大後的寬高
  const scaledWidth = frameWidth * scaleFactor;
  const scaledHeight = spriteHeight * scaleFactor;

  // --- 自動播放無接縫動畫 ---
  // 我們只希望播放跑步的影格 (索引 1 到 5)，以創造無縫循環
  const runFrames = numFrames - 1; // 跑步動畫有 5 幀 (6 - 1 = 5)
  // 計算出當前應該播放的跑步影格索引 (結果在 0 到 4 之間循環)
  const currentRunFrame = floor((frameCount / frameDelay) % runFrames);
  // 實際從 animation 陣列中取圖時，索引要 +1，跳過第一個靜態影格
  image(animation[currentRunFrame + 1], characterX, characterY, scaledWidth, scaledHeight); // 索引範圍 1-5
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  characterX = width / 2; // 確保角色在視窗縮放後依然水平置中
  characterY = height / 2; // 確保角色在視窗縮放後依然垂直置中
}
