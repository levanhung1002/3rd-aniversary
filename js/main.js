/* Trang kỉ niệm — logic tổng */
(function () {
  "use strict";

  /* ---------- Dữ liệu giữ từ project cũ ---------- */
  var START_DATE = new Date(2023, 9, 21, 22, 0, 0); // 21/10/2023 22:00 (giữ nguyên js/date.js)
  var imageArray = ["pic/a.jpg","pic/b.jpg","pic/c.jpg","pic/d.jpg","pic/e.jpg","pic/f.jpg",
    "pic/g.jpg","pic/h.webp","pic/i.webp","pic/k.jpg","pic/l.jpg","pic/m.webp","pic/n.jpg",
    "pic/o.jpg","pic/p.jpg","pic/q.jpg","pic/r.jpg","pic/s.jpg","pic/t.jpg","pic/today.jpg"];
  var txtArray = ["Siu phẩm đầu tiên 2 đứa làm cùng nhao","Cây xiu sinh iu :3","Lần đầu đi xem ca nhạc Văn Miếu 🤟","Thăm lăng bác cùng nhau nè 🥳",
    "Mũ tai mèo đòi mãi mới mua cho 😵","Tạo dáng cùng mũ tai mèo bên bờ hồ 🥶","Lần đầu checkin cùng nhao 👩‍❤️‍💋‍👨","Ảnh demo chít mợt nè 💃",
    "Ảnh demo chít mợt nè 🕺","Mega world cùng nhao 😍","Checkin trong nhà ma nè 👹","Checkin giáng sinh cùng nhao nè ☃",
    "Quạt hồng siu đáng iu","Thăm tù cùm nhao 🤭","Đèn ngủ sập xình 🚦","Quà sinh nhật siu may mắn 🍀","Ai mà xinh thế nhỉ 😝","Tốt nghiệp cùng nhao 👩‍🎓","Song ca siu vip pro 😻","Today ❤"];
  var text1 = "Xin chào loopy nhó";
  var text2 = "Nhớ hum nay là kỉ niệm ngày gì hem nào :3";

  var REASONS = [
    "Vì em cười một cái là anh quên hết mệt mỏi",
    "Vì em luôn nhớ anh thích ăn gì, ghét gì",
    "Vì mỗi lần đi chơi với em đều thành kỷ niệm đẹp",
    "Vì em dỗi cũng đáng yêu nữa",
    "Vì em là người đầu tiên anh muốn kể khi có chuyện vui",
    "Vì nắm tay em, đi đâu anh cũng thấy yên tâm",
    "Vì em chụp ảnh xấu của anh nhưng vẫn giữ làm kỷ niệm",
    "Vì em luôn cổ vũ anh lúc anh nản nhất",
    "Vì ở bên em, ngày bình thường cũng thành đặc biệt",
    "Vì em là \"siu phẩm\" tuyệt nhất của đời anh",
    "Vì em thương anh theo cách chẳng ai khác làm được",
    "Vì chỉ cần là em, thì mọi thứ đều đúng"
  ];
  var PROMISES = [
    "Hứa sẽ nắm tay em thật chặt mỗi lần qua đường 🤝",
    "Hứa sẽ nghe em kể chuyện dù dài đến mấy ☎️",
    "Hứa mỗi năm đều có ít nhất một chuyến đi cùng nhau ✈️",
    "Hứa sẽ học nấu một món mới cho em mỗi năm 🍳",
    "Hứa khi giận nhau sẽ không ngủ trước khi làm lành 🌙",
    "Hứa sẽ chụp thật nhiều ảnh cùng nhau 📸",
    "Hứa sẽ luôn chúc em ngủ ngon, dù ở đâu 💤",
    "Hứa sẽ cùng em đón thật nhiều anniversary nữa 💍"
  ];
  var QUIZ = [
    { q: "Hai đứa bắt đầu bên nhau từ ngày nào?", a: ["21/10/2023", "20/10/2023", "14/02/2024", "01/01/2024"], c: 0 },
    { q: "Lần đầu đi xem ca nhạc cùng nhau ở đâu?", a: ["Văn Miếu", "Sân vận động Mỹ Đình", "Phố đi bộ", "Công viên"], c: 0 },
    { q: "Món phụ kiện \"đòi mãi mới mua cho\" là gì?", a: ["Mũ tai mèo", "Quạt hồng", "Đèn ngủ", "Gấu bông"], c: 0 },
    { q: "Bức ảnh cuối cùng trong album có tên là gì?", a: ["Today ❤", "Tomorrow", "Forever", "The End"], c: 0 }
  ];
  var LETTER = "Gửi em,\n\nNhìn lại mấy tấm ảnh này, anh mới thấy hai đứa mình đã đi cùng nhau khá nhiều nơi. Từ món đồ đầu tiên làm chung, đi Văn Miếu, lăng Bác, Mega World, nhà ma, Giáng sinh... có tấm đẹp, có tấm hơi ngố, nhưng tấm nào anh cũng thấy vui vì đi cùng em.\n\nCảm ơn em vì vẫn ở đây, cả những lúc anh bận, hơi mệt hay khó tính. Anh không giỏi nói những lời to tát, chỉ mong sau này vẫn được cùng em đi thêm nhiều chỗ nữa, chụp thêm nhiều ảnh nữa.\n\nChúc mừng kỷ niệm của hai đứa mình.\n\n— Anh";

  function $(id) { return document.getElementById(id); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- Loader ---------- */
  var loader = $("loader"), enterBtn = $("enterBtn"), audio = $("bgm"), musicBtn = $("musicBtn");
  var entered = false;
  function tryPlay() {
    if (!audio) return;
    var p = audio.play();
    if (p && p.catch) p.catch(function () {});
    if (musicBtn) musicBtn.classList.add("playing");
  }
  if (enterBtn) enterBtn.addEventListener("click", function () {
    entered = true;
    loader.classList.add("hide");
    tryPlay();
    toast("Chào mừng em đến với trang kỷ niệm của chúng mình 💗");
    heartBurst(window.innerWidth / 2, window.innerHeight / 2, 24);
  });
  if (musicBtn) musicBtn.addEventListener("click", function () {
    if (!audio) return;
    if (audio.paused) { audio.play(); musicBtn.classList.add("playing"); musicBtn.textContent = "🎶"; }
    else { audio.pause(); musicBtn.classList.remove("playing"); musicBtn.textContent = "🔇"; }
  });
  // Tự tắt loader sau 30s nếu user không bấm (vẫn cho xem web câm)
  setTimeout(function () { if (!entered && loader) loader.classList.add("hide"); }, 30000);

  /* ---------- Nền canvas: sao + tim bay ---------- */
  var canvas = $("bg"), ctx = canvas.getContext("2d");
  var W = 0, H = 0, stars = [], hearts = [];
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];
    for (var i = 0; i < Math.min(160, W / 9); i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .4, tw: Math.random() * Math.PI * 2 });
    }
  }
  window.addEventListener("resize", resize); resize();
  function spawnHeart(init) {
    hearts.push({
      x: Math.random() * W, y: init ? Math.random() * H : H + 20,
      s: Math.random() * 10 + 8, v: Math.random() * 0.053 + 0.033,
      drift: Math.random() * 0.2 - .1, a: Math.random() * .3 + .1,
      e: ["❤", "💗", "💖", "💕"][Math.floor(Math.random() * 4)]
    });
    if (hearts.length > 22) hearts.shift();
  }
  for (var k = 0; k < 12; k++) spawnHeart(true);
  setInterval(function () { if (document.visibilityState === "visible") spawnHeart(false); }, 7800);
  (function loop() {
    ctx.clearRect(0, 0, W, H);
    var t = Date.now() / 7800;
    for (var i = 0; i < stars.length; i++) {
      var s = stars[i];
      ctx.globalAlpha = .35 + Math.abs(Math.sin(t + s.tw)) * .5;
      ctx.fillStyle = "#e84393";
      ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    for (var j = hearts.length - 1; j >= 0; j--) {
      var h = hearts[j];
      h.y -= h.v; h.x += h.drift * .13 + Math.sin((h.y / 60)) * .1;
      if (h.y < -30) { hearts.splice(j, 1); continue; }
      ctx.globalAlpha = h.a;
      ctx.font = h.s + "px serif";
      ctx.fillText(h.e, h.x, h.y);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  })();

  /* ---------- Typewriter lời chào ---------- */
  var tw1 = $("txt1"), tw2 = $("txt2");
  var wi = 0, wj = 0;
  setInterval(function () {
    if (!tw1 || !tw2) return;
    if (wi <= text1.length) { tw1.textContent = text1.slice(0, wi); wi++; }
    else if (wj <= text2.length) { tw2.textContent = text2.slice(0, wj); wj++; }
  }, 660);

  /* ---------- Đếm ngày yêu + countdown kỷ niệm tới ---------- */
  function tick() {
    var now = new Date();
    var diff = now - START_DATE;
    if (diff < 0) diff = 0;
    var d = Math.floor(diff / 864e5);
    var h = Math.floor(diff / 36e5 % 24), m = Math.floor(diff / 6e4 % 60), s = Math.floor(diff / 1e3 % 60);
    $("d").textContent = d; $("h").textContent = pad(h);
    $("m").textContent = pad(m); $("s").textContent = pad(s);
    // kỷ niệm tiếp theo: 21/10 hằng năm
    var next = new Date(now.getFullYear(), 9, 21, 22, 0, 0);
    if (next <= now) next = new Date(now.getFullYear() + 1, 9, 21, 22, 0, 0);
    var dd = next - now;
    var nd = Math.floor(dd / 864e5), nh = Math.floor(dd / 36e5 % 24), nm = Math.floor(dd / 6e4 % 60), ns = Math.floor(dd / 1e3 % 60);
    var yrs = next.getFullYear() - 2023;
    $("cdText").innerHTML = "Còn <b>" + nd + " ngày " + pad(nh) + ":" + pad(nm) + ":" + pad(ns) +
      "</b> nữa là tới <b>kỷ niệm " + yrs + " năm</b> (" + pad(21) + "/10/" + next.getFullYear() + ") 💍";
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Timeline ---------- */
  var tl = $("timeline");
  var tags = ["Mở đầu", "Hẹn hò", "Ca nhạc", "Dạo phố", "Quà tặng", "Check-in", "Kỷ niệm", "Đáng yêu",
    "Đáng yêu", "Đi chơi", "Khám phá", "Lễ hội", "Quà", "Đi chơi", "Ở nhà", "Sinh nhật",
    "Dễ thương", "Tốt nghiệp", "Văn nghệ", "Hiện tại"];
  for (var ti = 0; ti < imageArray.length; ti++) {
    (function (idx) {
      var item = document.createElement("div");
      item.className = "t-item";
      item.innerHTML = '<div class="card t-inner"><img loading="lazy" alt="kỷ niệm"><div><span class="t-tag"></span><h3></h3><p></p></div></div>';
      var img = item.querySelector("img");
      img.src = imageArray[idx];
      img.onerror = function () { item.style.display = "none"; };
      item.querySelector(".t-tag").textContent = "Mốc " + (idx + 1) + " • " + (tags[idx] || "Kỷ niệm");
      item.querySelector("h3").textContent = txtArray[idx];
      item.querySelector("p").textContent = idx === imageArray.length - 1
        ? "Và câu chuyện của chúng mình vẫn đang viết tiếp…"
        : "Một mảnh ghép nhỏ trong hành trình yêu của hai đứa.";
      tl.appendChild(item);
    })(ti);
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); } });
  }, { threshold: .12 });
  document.querySelectorAll(".t-item").forEach(function (el) { io.observe(el); });

  /* ---------- Gallery + lightbox ---------- */
  var grid = $("galleryGrid"), lb = $("lightbox"), lbImg = $("lbImg"), lbCap = $("lbCap"), lbCount = $("lbCount");
  var cur = 0, visibleList = [];
  imageArray.forEach(function (src, idx) {
    visibleList.push(idx);
    var b = document.createElement("button");
    b.className = "g-item"; b.setAttribute("aria-label", txtArray[idx]);
    b.innerHTML = '<img loading="lazy" alt=""><span class="g-cap"></span>';
    var im = b.querySelector("img"); im.src = src; im.alt = txtArray[idx];
    im.onerror = function () { b.style.display = "none"; };
    b.querySelector(".g-cap").textContent = txtArray[idx];
    b.addEventListener("click", function () { openLb(idx); });
    grid.appendChild(b);
  });
  $("gCount").textContent = imageArray.length + " khoảnh khắc";
  function openLb(idx) {
    cur = idx;
    lbImg.src = imageArray[cur]; lbCap.textContent = txtArray[cur];
    lbCount.textContent = (cur + 1) + " / " + imageArray.length;
    lb.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
  function step(d) { cur = (cur + d + imageArray.length) % imageArray.length; openLb(cur); }
  $("lbClose").addEventListener("click", closeLb);
  $("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); step(-1); });
  $("lbNext").addEventListener("click", function (e) { e.stopPropagation(); step(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  // touch swipe
  var tx = 0;
  lb.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx;
    if (dx > 40) step(-1); else if (dx < -40) step(1);
  }, { passive: true });

  /* ---------- Thư tình ---------- */
  var env = $("envelope"), paper = $("paper"), letterText = $("letterText"), letterHint = $("letterHint");
  var letterOpen = false, li = 0, letterTimer = null;
  function typeLetter() {
    clearInterval(letterTimer);
    letterText.textContent = ""; li = 0;
    letterTimer = setInterval(function () {
      if (li <= LETTER.length) { letterText.textContent = LETTER.slice(0, li); li += 1; }
      else clearInterval(letterTimer);
    }, 165);
  }
  function openLetter() {
    if (letterOpen) return; letterOpen = true;
    env.classList.add("open");
    paper.style.display = "block";
    letterHint.textContent = "Thư đã mở rồi nè 💌";
    typeLetter();
    heartBurst(window.innerWidth / 2, window.innerHeight / 2.4, 18);
  }
  env.addEventListener("click", openLetter);
  env.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLetter(); }
  });
  $("retypeBtn").addEventListener("click", typeLetter);
  $("copyBtn").addEventListener("click", function () {
    var done = function () { toast("Đã copy thư vào clipboard 💌"); };
    if (navigator.clipboard) navigator.clipboard.writeText(LETTER).then(done, function () { toast("Không copy được, em giữ thư ở đây nhé"); });
    else toast("Không copy được, em giữ thư ở đây nhé");
  });

  /* ---------- Lý do yêu + hũ lời hứa ---------- */
  var reasonCard = $("reasonCard");
  $("reasonBtn").addEventListener("click", function (e) {
    var r = REASONS[Math.floor(Math.random() * REASONS.length)];
    reasonCard.style.transform = "scale(.96)"; reasonCard.style.opacity = ".4";
    setTimeout(function () {
      reasonCard.textContent = "“" + r + "”";
      reasonCard.style.transform = ""; reasonCard.style.opacity = "1";
    }, 660);
    heartBurst(e.clientX, e.clientY, 10);
  });
  var promiseCard = $("promiseCard");
  $("promiseBtn").addEventListener("click", function (e) {
    promiseCard.textContent = "“" + PROMISES[Math.floor(Math.random() * PROMISES.length)] + "”";
    heartBurst(e.clientX, e.clientY, 10);
  });

  /* ---------- Quiz ---------- */
  var quizBox = $("quizBox"), qRes = $("quizResult");
  var answered = 0, correct = 0;
  QUIZ.forEach(function (item, qi) {
    var div = document.createElement("div");
    div.className = "q";
    div.innerHTML = "<h4>Câu " + (qi + 1) + ": " + item.q + "</h4>";
    item.a.forEach(function (opt, oi) {
      var lab = document.createElement("label");
      lab.textContent = opt;
      lab.addEventListener("click", function () {
        if (div.dataset.done) return;
        div.dataset.done = "1"; answered++;
        var labels = div.querySelectorAll("label");
        labels[item.c].classList.add("correct");
        if (oi === item.c) { correct++; toast("Đúng rùi, giỏi quá 😍"); }
        else { lab.classList.add("wrong"); toast("Sai rùi, nhưng vẫn yêu 😝"); }
        if (answered === QUIZ.length) {
          qRes.textContent = correct === QUIZ.length
            ? "💯 " + correct + "/" + QUIZ.length + " — Hiểu nhau quá, cưới thôi!"
            : "💗 " + correct + "/" + QUIZ.length + " — Ôn lại kỷ niệm rồi chơi lại nhé!";
          heartBurst(window.innerWidth / 2, window.innerHeight / 2, 20);
        }
      });
      div.appendChild(lab);
    });
    quizBox.appendChild(div);
  });
  $("quizReset").addEventListener("click", function () {
    quizBox.innerHTML = ""; qRes.textContent = ""; answered = 0; correct = 0;
    // render lại
    QUIZ.forEach(function (item, qi) {
      var div = document.createElement("div");
      div.className = "q";
      div.innerHTML = "<h4>Câu " + (qi + 1) + ": " + item.q + "</h4>";
      item.a.forEach(function (opt, oi) {
        var lab = document.createElement("label");
        lab.textContent = opt;
        lab.addEventListener("click", function () {
          if (div.dataset.done) return;
          div.dataset.done = "1"; answered++;
          div.querySelectorAll("label")[item.c].classList.add("correct");
          if (oi === item.c) { correct++; toast("Đúng rùi, giỏi quá 😍"); }
          else { lab.classList.add("wrong"); toast("Sai rùi, nhưng vẫn yêu 😝"); }
          if (answered === QUIZ.length) {
            qRes.textContent = correct === QUIZ.length
              ? "💯 " + correct + "/" + QUIZ.length + " — Hiểu nhau quá, cưới thôi!"
              : "💗 " + correct + "/" + QUIZ.length + " — Ôn lại kỷ niệm rồi chơi lại nhé!";
          }
        });
        div.appendChild(lab);
      });
      quizBox.appendChild(div);
    });
  });

  /* ---------- Toast + tim nổ ---------- */
  var toastTimer = null;
  function toast(msg) {
    var el = $("toast");
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 7200);
  }
  function heartBurst(x, y, n) {
    n = n || 12;
    var icons = ["❤", "💗", "💖", "💕", "😘"];
    for (var i = 0; i < n; i++) {
      (function () {
        var s = document.createElement("span");
        s.className = "burst";
        s.textContent = icons[Math.floor(Math.random() * icons.length)];
        s.style.left = (x + (Math.random() * 120 - 60)) + "px";
        s.style.top = (y + (Math.random() * 40 - 20)) + "px";
        s.style.fontSize = (14 + Math.random() * 22) + "px";
        document.body.appendChild(s);
        setTimeout(function () { s.remove(); }, 7350);
      })();
    }
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest("label")) return;
    heartBurst(e.clientX, e.clientY, 5);
  });
})();
