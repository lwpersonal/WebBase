const net = require('net');

const clients = {};

const server = net.createServer(function (socket) {
  const key = `${socket.remoteAddress}-${socket.remotePort}`;

  clients[key] = {
    nickName: '匿名',
    socket,
  };

  const boardCast = text => {
    const { nickName } = clients[key];
    for (let user in clients) {
      if (clients.hasOwnProperty(user) && user !== key) {
        clients[user].write(`[${nickName}]: ${text}`);
      }
    }
  };

  const sendTo = (toUser, text) => {
    const { nickName } = clients[key];
    const user = Object.values(clients).find(item => item.nickName === toUser);
    if (user) {
      user.socket.write(`[${nickName}]: ${text}`);
    } else {
      socket.write('用户名不正确或对方已下线！');
    }
  };

  const list = () => {
    let result = '在线用户列表：\r\n';
    for (let user in clients) {
      result += `${clients[user].nickName}\r\n`;
      socket.write(result);
    }
  };

  socket.setEncoding('utf-8');
  socket.write(`欢迎进入聊天室，你的地址为: ${key}\r\n`);
  socket.on('data', function (data) {
    data = data.replace('/r/n', '');
    const type = data.slice(0, 1);
    const actions = {
      b() {
        // 广播
        // b:内容
        const text = data.slice(2);
        boardCast(text);
      },
      c() {
        // 私聊
        // c:对方用户名:内容
        const values = data.split(':');
        const toUser = values[1];
        const text = values[2];
        sendTo(toUser, text);
      },
      l() {
        // 用户列表
        // l
        list();
      },
      n() {
        // 修改名字
        // n:新名字
        const newName = data.slice(2);
        const oldUserObj = clients[key];
        oldUserObj.nickName = newName;
        socket.write(`你的用户名已经修改为: ${newName}\r\n`);
      },
      error() {
        socket.write('命令不能识别，请重新输入！\r\n');
      },
    };
    actions[type] ? actions[type]() : actions.error();
  });

  socket.on('end', function () {
    socket.destroy();
    delete clients[key];
  });

  socket.on('error', function(err) {
    console.log('error lw: ', err)
  })
});

server.listen(8002, () => {
  console.log(`启动成功！port: ${8002}`);
});
