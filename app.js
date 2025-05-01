const socket = io('https://chatroom-backend-0wha.onrender.com'); // 替换为您的后端地址
const messagesEl = document.getElementById('messages');
const inputEl = document.getElementById('msg-input');
const sendBtn = document.getElementById('send-btn');
const fileInput = document.getElementById('file-input');

// 接收消息
socket.on('chat', data => {
  const item = document.createElement('div');
  if (data.type === 'text') {
    item.textContent = `${data.user}: ${data.content}`;
  } else {
    const link = document.createElement('a');
    link.href = data.url;
    link.textContent = `${data.user} 发送了文件`;
    item.appendChild(link);
  }
  messagesEl.appendChild(item);
});

// 发送文字
sendBtn.addEventListener('click', () => {
  const msg = inputEl.value.trim();
  if (msg) {
    socket.emit('chat', { type: 'text', content: msg });
    inputEl.value = '';
  }
});

// 发送文件
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const form = new FormData();
  form.append('file', file);
  fetch('https://chatroom-backend-0wha.onrender.com', {
    method: 'POST',
    body: form
  })
  .then(res => res.json())
  .then(data => {
    socket.emit('chat', { type: 'file', url: data.url });
  });
});
