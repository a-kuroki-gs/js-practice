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
  const list = $('.memo-list ul');
  list.empty();
  memos.forEach((memo, index) => {
    const li = $(`<li class="memo-item">${memo.title}</li>`);
    li.on('click', () => showDetail(index));
    list.append(li);
  });
}

// 詳細を表示
function showDetail(index) {
  const memo = memos[index];
  selectedId = index;
  $('#memo-title').val(memo.title);
  $('#memo-content').val(memo.content);
  $('.memo-detail').show();
}

// フォームを削除
function clear() {
  selectedId = null;
  $('#memo-title').val('');
  $('#memo-content').val('');
  $('.memo-detail').hide();
}

$(function () {
  // 最初は一覧のみ表示
  $('.memo-detail').hide();
  load();
  showList();

  // 追加(＋ボタン)
  $('#add-memo-btn').on('click', () => {
    clear();
    $('.memo-detail').show();
  });

  // 保存
  $('#save-btn').on('click', () => {
    const title = $('#memo-title').val();
    const content = $('#memo-content').val();
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
  $('#delete-btn').on('click', () => {
    if (selectedId !== null) {
      memos.splice(selectedId, 1);
      save();
      clear();
      showList();
    }
  });

  // ダウンロード
  $('#download-btn').on('click', () => {
    const title = $('#memo-title').val();
    const content = $('#memo-content').val();
    const memoText = "タイトル: " + title + "\n詳細: " + content;
    const blob = new Blob([memoText], { type: 'text/plain' });
    const url = document.createElement('a')
    url.href = URL.createObjectURL(blob)
    url.download = `${title || 'memo'}.txt`;
    url.click();
    URL.revokeObjectURL(url);
  });

  // 閉じる
  $('#cancel-btn').on('click', () => {
    clear();
  });
});
