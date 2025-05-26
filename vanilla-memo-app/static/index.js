let memos = [];
let selectedId = null;

// localStorageに保存
function save() {
  localStorage.setItem('memos', JSON.stringify(memos));
}

// localStorageから読み込み
function load() {
  const data = localStorage.getItem('memos');
  if (data) {
    memos = JSON.parse(data);
  }
}

// 一覧を表示
function showList() {
  const list = document.querySelector('.memo-list ul');
  list.innerHTML = '';
  memos.forEach((memo, index) => {
    const li = document.createElement('li');
    li.className = 'memo-item';
    li.textContent = memo.title;
    li.addEventListener('click', () => showDetail(index));
    list.appendChild(li);
  });
}

// 詳細を表示
function showDetail(index) {
  const memo = memos[index];
  selectedId = index;
  document.querySelector('#memo-title').value = memo.title;
  document.querySelector('#memo-content').value = memo.content;
  document.querySelector('.memo-detail').style.display = 'block';
}

// フォームを削除
function clear() {
  selectedId = null;
  document.querySelector('#memo-title').value = '';
  document.querySelector('#memo-content').value = '';
  document.querySelector('.memo-detail').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  // 最初は一覧のみ表示
  document.querySelector('.memo-detail').style.display = 'none';
  load();
  showList();

  // 追加(＋ボタン)
  document.querySelector('#add-memo-btn').addEventListener('click', () => {
    clear();
    document.querySelector('.memo-detail').style.display = 'block';
  });

  // 保存
  document.querySelector('#save-btn').addEventListener('click', () => {
    const title = document.querySelector('#memo-title').value;
    const content = document.querySelector('#memo-content').value;
    if (!title.trim()) return alert("タイトルは必須です");

    if (selectedId !== null) {
      memos[selectedId] = { title, content };
    } else {
      memos.push({ title, content });
    }
    save();
    clear();
    showList();
  });

  // 削除
  document.querySelector('#delete-btn').addEventListener('click', () => {
    if (selectedId !== null) {
      memos.splice(selectedId, 1);
      save();
      clear();
      showList();
    }
  });

  // ダウンロード
  document.querySelector('#download-btn').addEventListener('click', () => {
    const title = document.querySelector('#memo-title').value;
    const content = document.querySelector('#memo-content').value;
    const memoText = "タイトル: " + title + "\n詳細: " + content;
    const blob = new Blob([memoText], { type: 'text/plain' });
    const url = document.createElement('a')
    url.href = URL.createObjectURL(blob)
    url.download = `${title || 'memo'}.txt`;
    url.click();
    URL.revokeObjectURL(a.href);
  });

  // 閉じる
  document.querySelector('#cancel-btn').addEventListener('click', () => {
    clear();
  });
});
