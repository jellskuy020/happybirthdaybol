// ====== GALAXY BACKGROUND ======
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
let shootingStars = [];
let stars = [];
function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    r: Math.random() * 1.1 + 0.2,
    alpha: Math.random() * 0.5 + 0.5
  });
}
function createShootingStar() {
  shootingStars.push({
    x: randomBetween(0, width),
    y: randomBetween(-height * 0.2, 0),
    len: randomBetween(80, 180),
    speed: randomBetween(8, 16),
    size: randomBetween(0.7, 1.5),
    alpha: randomBetween(0.5, 1),
    life: 0,
    angle: randomBetween(Math.PI / 4, Math.PI / 3)
  });
}
setInterval(() => {
  for (let i = 0; i < 3; i++) createShootingStar();
}, 500);
function draw() {
  ctx.clearRect(0, 0, width, height);
  for (let s of stars) {
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    let star = shootingStars[i];
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = star.size;
    ctx.shadowColor = "#fff";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x - Math.cos(star.angle) * star.len,
      star.y - Math.sin(star.angle) * star.len
    );
    ctx.stroke();
    ctx.restore();
    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;
    star.life += star.speed;
    if (
      star.x > width + 100 ||
      star.y > height + 100 ||
      star.life > width * 1.2
    ) {
      shootingStars.splice(i, 1);
    }
  }
  requestAnimationFrame(draw);
}
draw();

// ====== BUBBLE CHAT ======
const bubbleMessages = [
  "Happy Birthday Shela! 🎉",
  "Semoga panjang umur! 🥳",
  "Wish you all the best! 💖",
  "Selamat ulang tahun! 🎂",
  "Bahagia selalu ya! ✨",
  "Semoga sehat selalu! 💪",
  "Enjoy your special day! 🎈",
  "Sukses terus ya! 🌟",
  "Love you! 💕",
  "Make a wish! 🕯️"
];
function launchBubbleChat() {
  const container = document.getElementById('bubbleChatContainer');
  if (!container) return;
  const bubble = document.createElement('div');
  bubble.className = 'bubble-chat';
  bubble.textContent = bubbleMessages[Math.floor(Math.random() * bubbleMessages.length)];
  bubble.style.left = (Math.random() * 70 + 10) + 'vw';
  bubble.style.bottom = '-40px';
  bubble.style.fontSize = (Math.random() * 0.3 + 1) + 'em';
  container.appendChild(bubble);
  setTimeout(() => {
    if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
  }, 4500);
}
setInterval(() => {
  launchBubbleChat();
}, 900);

// ====== DOM ELEMENTS ======
const openBtn = document.getElementById('openBtn');
const startBox = document.getElementById('startBox');
const balloons = document.getElementById('balloons');
const card = document.getElementById('birthdayCard');
const typewriter = document.getElementById('typewriter');
const nextBtn = document.getElementById('nextBtn');
const longCard = document.getElementById('longCard');
const toPhotoBtn = document.getElementById('toPhotoBtn');
const photoSlide = document.getElementById('photoSlide');
const bgMusic = document.getElementById('bgMusic');
const confetti = document.getElementById('confetti');
const message = "Selamat ulang tahun ya! Semoga semua hal baik datang di hidupmu—kesehatan, kebahagiaan, dan hal-hal kecil yang bikin kamu senyum tiap hari. Makasih udah jadi bagian penting dalam hidupku";
const loveSlide = document.getElementById('loveSlide');
const loveRainContainer = document.getElementById('loveRainContainer');
const bigLoveContainer = document.getElementById('bigLoveContainer');
const toLoveSlideBtn = document.getElementById('toLoveSlideBtn');

// ====== MINI CONFETTI ======
function launchMiniConfetti() {
  const miniConfetti = document.getElementById('miniConfetti');
  if (!miniConfetti) return;
  miniConfetti.innerHTML = '';
  const colors = ['#ff6f91', '#f9f871', '#bbded6', '#8ac6d1', '#ffb6b9', '#fff', '#f7cac9'];
  for (let i = 0; i < 18; i++) {
    const piece = document.createElement('div');
    piece.className = 'mini-confetti-piece';
    piece.style.left = Math.random() * 95 + '%';
    piece.style.top = Math.random() * 10 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.7) + 's';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    miniConfetti.appendChild(piece);
  }
  setTimeout(() => { miniConfetti.innerHTML = ''; }, 1800);
}
const birthdayCard = document.getElementById('birthdayCard');
const observer = new MutationObserver(() => {
  if (birthdayCard.classList.contains('show')) {
    launchMiniConfetti();
    if (!birthdayCard._miniConfettiInterval) {
      birthdayCard._miniConfettiInterval = setInterval(launchMiniConfetti, 1800);
    }
  } else {
    clearInterval(birthdayCard._miniConfettiInterval);
    birthdayCard._miniConfettiInterval = null;
    document.getElementById('miniConfetti').innerHTML = '';
  }
});
observer.observe(birthdayCard, { attributes: true, attributeFilter: ['class'] });

// ====== SLIDE LOGIC ======
balloons.style.display = 'none';
card.style.display = 'none';
longCard.style.display = 'none';
photoSlide.style.display = 'none';
bgMusic.pause();

openBtn.onclick = function() {
  bgMusic.currentTime = 0;
  bgMusic.play();
  startBox.classList.add('hide');
  setTimeout(() => {
    startBox.style.display = 'none';
    balloons.style.display = 'block';
    setTimeout(() => {
      balloons.style.display = 'none';
      card.style.display = 'flex';
      setTimeout(() => {
        card.classList.add('show');
        launchConfetti();
        typeWriterEffect(message, typewriter, 0, 30, () => {
          nextBtn.style.display = 'inline-block';
        });
      }, 50);
    }, 2300);
  }, 700);
};

function typeWriterEffect(text, el, i, speed, callback) {
  if (i < text.length) {
    el.innerHTML = '<span class="typewriter">' + text.slice(0, i+1).replace(/\n/g, '<br>') + '</span>';
    setTimeout(() => typeWriterEffect(text, el, i+1, speed, callback), text[i] === '\n' ? speed*6 : speed);
  } else {
    el.innerHTML = text.replace(/\n/g, '<br>');
    if (callback) callback();
  }
}

nextBtn.onclick = function() {
  card.classList.remove('show');
  setTimeout(() => {
    card.style.display = 'none';
    longCard.style.display = 'flex';
    setTimeout(() => {
      longCard.classList.add('show');
      launchConfetti();
    }, 50);
  }, 700);
};

toPhotoBtn.onclick = function() {
  longCard.classList.remove('show');
  setTimeout(() => {
    longCard.style.display = 'none';
    photoSlide.classList.add('show');
    photoSlide.style.display = 'flex';
  }, 700);
};

// ====== LOVE SLIDE LOGIC ======
let showMemoriesBtn;

toLoveSlideBtn.onclick = function() {
  photoSlide.classList.remove('show');
  setTimeout(() => {
    photoSlide.style.display = 'none';
    loveSlide.style.display = 'flex';
    startLoveRain(10000, showMemoriesSlideshow);
  }, 700);
};

function startLoveRain(duration = 10000, cb) {
  loveRainContainer.innerHTML = '';
  bigLoveContainer.style.display = 'none';
  if (showMemoriesBtn) showMemoriesBtn.style.display = 'none';
  let running = true;
  function spawnLove() {
    if (!running) return;
    const love = document.createElement('span');
    love.className = 'love-emoji';
    love.textContent = ['💖','❤️','💕','💗','💘','💞'][Math.floor(Math.random()*6)];
    love.style.left = Math.random() * 96 + 'vw';
    love.style.top = '-40px';
    love.style.fontSize = (Math.random()*1.2+1.2) + 'em';
    loveRainContainer.appendChild(love);
    setTimeout(() => love.remove(), 8000);
    setTimeout(spawnLove, 40 + Math.random()*60);
  }
  spawnLove();
  setTimeout(() => {
    running = false;
    // loveRainContainer.innerHTML = ''; // Jangan dihapus agar love tetap terlihat
    if (cb) cb();
  }, duration);
}

function showMemoriesButton() {
  if (!showMemoriesBtn) {
    showMemoriesBtn = document.createElement('button');
    showMemoriesBtn.className = 'next-btn';
    showMemoriesBtn.textContent = 'Klik untuk Lihat Kenangan';
    showMemoriesBtn.style.marginTop = '32px';
    loveSlide.appendChild(showMemoriesBtn);
  }
  showMemoriesBtn.style.display = 'inline-block';
  showMemoriesBtn.onclick = showMemoriesSlideshow;
}

function showMemoriesSlideshow() {
  showMemoriesBtn && (showMemoriesBtn.style.display = 'none');
  bigLoveContainer.style.display = 'flex';
  bigLoveContainer.innerHTML = '';
  const fotoList = [
    {src: 'foto1.jpg', caption: ''},
    {src: 'foto2.jpg', caption: ''},
    {src: 'foto3.jpg', caption: ''},
    {src: 'foto4.jpg', caption: ''},
    {src: 'foto5.jpg', caption: ''},
    {src: 'foto6.jpg', caption: ''}
  ];
  let idx = 0;

  // Filmstrip effect
  const filmFrame = document.createElement('div');
  filmFrame.style.position = 'relative';
  filmFrame.style.display = 'flex';
  filmFrame.style.justifyContent = 'center';
  filmFrame.style.alignItems = 'center';
  filmFrame.style.height = '320px';
  filmFrame.style.marginBottom = '18px';
  bigLoveContainer.appendChild(filmFrame);

  function showImg(i) {
    filmFrame.innerHTML = '';
    const img = document.createElement('img');
    img.src = fotoList[i].src;
    img.alt = 'Kenangan ' + (i + 1);
    img.className = 'film-roll-img';
    img.style.maxWidth = '320px';
    img.style.maxHeight = '300px';
    img.style.borderRadius = '12px';
    filmFrame.appendChild(img);
  }

  showImg(0);

  let interval = setInterval(() => {
    idx++;
    if (idx < fotoList.length) {
      showImg(idx);
    } else {
      clearInterval(interval);
      setTimeout(showHappyBirthday, 700);
    }
  }, 2000); // 6 foto x 2 detik = 12 detik
}

function showHappyBirthday() {
  bigLoveContainer.innerHTML = '';
  const text = document.createElement('div');
  text.className = 'typewriter';
  text.style.fontSize = '2.5em';
  text.style.fontWeight = 'bold';
  text.style.color = '#f9f871';
  text.style.textShadow = '0 4px 32px #000a, 0 2px 8px #fff8';
  text.style.letterSpacing = '0.12em';
  text.style.marginTop = '40px';
  text.style.textAlign = 'center';
  bigLoveContainer.appendChild(text);

  typeWriterEffect('HAPPY BIRTHDAY SHELA', text, 0, 60, () => {
    setTimeout(showILoveUGalaxy, 1200);
  });
}

function showILoveUGalaxy() {
  bigLoveContainer.innerHTML = '';
  const text = document.createElement('div');
  text.className = 'typewriter';
  text.style.fontSize = '3em';
  text.style.fontWeight = 'bold';
  text.style.color = '#ff6f91';
  text.style.textShadow = '0 4px 32px #6a82fb, 0 2px 8px #fff8';
  text.style.letterSpacing = '0.15em';
  text.style.marginTop = '40px';
  text.style.textAlign = 'center';
  bigLoveContainer.appendChild(text);

  typeWriterEffect('I LOVE U ONE GALAXY', text, 0, 60);
}

// ====== CONFETTI ======
function launchConfetti() {
  confetti.innerHTML = '';
  const colors = ['#ff6f91', '#f9f871', '#bbded6', '#8ac6d1', '#ffb6b9', '#fff', '#f7cac9'];
  for (let i = 0; i < 40; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.8) + 's';
    piece.style.transform = `rotate(${Math.random()*360}deg)`;
    confetti.appendChild(piece);
  }
  setTimeout(() => { confetti.innerHTML = ''; }, 2500);
}
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    const popup = document.getElementById('photoPopup');
    const popupImg = document.getElementById('popupImg');
    const popupCaption = document.getElementById('popupCaption');
    popupImg.src = this.src;
    popupCaption.textContent = this.getAttribute('data-caption') || '';
    popup.style.display = 'flex';
  });
});
document.getElementById('popupClose').onclick = function() {
  document.getElementById('photoPopup').style.display = 'none';
};
// Tampilkan X saat galeri aktif
document.getElementById('popupClose').style.display = 'block';
// Sembunyikan X saat galeri tidak aktif
document.getElementById('popupClose').style.display = 'none';
document.getElementById('photoPopup').onclick = function(e) {
  // Hanya tutup jika yang diklik adalah area luar (bukan gambar/caption)
  if (e.target === this) {
    this.style.display = 'none';
  }
};
document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', function() {
    const popup = document.getElementById('photoPopup');
    const popupImg = document.getElementById('popupImg');
    const popupCaption = document.getElementById('popupCaption');
    popupImg.src = this.src;
    popupCaption.textContent = this.getAttribute('data-caption') || '';
    popup.style.display = 'flex';
  });
});

// Tutup popup jika klik kotak hitam (popup-content)
document.querySelector('.popup-content').onclick = function() {
  document.getElementById('photoPopup').style.display = 'none';
};