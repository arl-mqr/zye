let userName = "";
let browseCollection = [];

function showPage(pageId) {
  const target = document.getElementById(pageId);
  if (!target) {
    console.error("找不到 id = " + pageId + " 的页面");
    return;
  }
  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  })
  target.classList.add('active');
}

function bind(id, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', handler);
}

window.addEventListener('load', function() {
  bind('goPage2Btn', function() {
    const inputVal = document.getElementById('userNameInput').value.trim();
    userName = inputVal || "访客";
    document.getElementById('userNameReplace').innerText = userName;
    showPage('page2');
  })

  bind('skipToPage4_1', function() { showPage('page4'); });

  bind('goPage3Btn', function() { showPage('page3'); });
  bind('backToPage1_2', function() { showPage('page1'); });
  bind('skipToPage4_2', function() { showPage('page4'); });

  bind('btnToPage4', function() { showPage('page4'); });
  bind('backToPage2_3', function() { showPage('page2'); });
  bind('skipToPage4_3', function() { showPage('page4'); });


  // ========== 重点：text_fallen_title.png 独立点击跳转 page5 ==========
  const fallenTitleImg = document.querySelector('.p4-text-fallen');
  if (fallenTitleImg) {
    fallenTitleImg.style.pointerEvents = "auto"; // 强制开启点击
    fallenTitleImg.style.cursor = "pointer";
    fallenTitleImg.addEventListener('click', function(e) {
      e.preventDefault();
      console.log("✅ 点击到堕落天使标题，准备跳转 page5");
      showPage('page5');
    });
  } else {
    console.error("❌ 找不到 .p4-text-fallen 元素！");
  }


  // 原有 art-link-click 通用跳转
  document.querySelectorAll('.art-link-click').forEach(el => {
    el.style.pointerEvents = "auto";
    el.addEventListener('click', function(e) {
      e.preventDefault();
      const target = el.dataset.target;
      if (target) showPage(target);
    })
  })

  // 返回按钮
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const target = btn.dataset.target;
      if (target) showPage(target);
    })
  })
})
// 页面4 右下角：结束浏览，进入总结页 page8
bind('endBrowseBtn', function() {
  renderSummary();
  showPage('page8');
});

// ========== 詳情頁：加入瀏覽收藏夾 ==========
document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const title = btn.dataset.title;
    const year = parseInt(btn.dataset.year, 10);

    // 同一幅畫重複點擊不重複記錄
    const exists = browseCollection.some(item => item.title === title);
    if (!exists) {
      browseCollection.push({ title, year });
      btn.textContent = "已加入收藏夾";
      btn.classList.add('added');
    }
  });
});
// 生成 page8 總結文字
function renderSummary() {
  const textNode = document.getElementById('summaryText');
  if (!textNode) return;

  const total = browseCollection.length;
  if (total === 0) {
    textNode.innerText = "你本次尚未瀏覽任何畫作。";
    return;
  }

  const years = browseCollection.map(item => item.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const span = maxYear - minYear;

  textNode.innerText =
    `你本次一共瀏覽了${total}幅畫作，瞭解了${total}個油畫故事，` +
    `鑒賞了${minYear}年代至${maxYear}年代之間的藝術，跨越了${span}年`;
}
