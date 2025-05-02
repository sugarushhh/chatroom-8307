const express = require('express');
const path = require('path');
const app = express();

// 提供 public 目录中的静态文件
app.use(express.static(path.join(__dirname, 'public')));

// 在根路径上返回 index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// 处理根路径请求
app.get('/', (req, res) => {
  res.send('Chatroom Backend is running!');
});

io.on('connection', (socket) => {
  console.log('用户已连接');

  socket.on('chat', (msg) => {
    io.emit('chat', msg);
  });

  socket.on('disconnect', () => {
    console.log('用户已断开连接');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`服务器正在运行，端口：${PORT}`);
});
