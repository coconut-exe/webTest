const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// 中间件来解析 JSON 请求体
app.use(express.json());

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));

// JSONBin.io 配置
const JSONBIN_API_URL = 'https://api.jsonbin.io/v3/b/664f2c23e41b4d34e4f82d5b';
const JSONBIN_API_KEY = '$2a$10$.MUC.nkYJiG5tpfIzB4gcelrOFnfBCDJZXSBKhow4nz1w6.oSeLZu';

// 读取数据
const readData = async () => {
  try {
    const response = await axios.get(JSONBIN_API_URL, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });
    console.log('Data read from JSONBin:', response.data.record);
    return response.data.record;
  } catch (error) {
    console.error('Error reading data:', error);
    return {};
  }
};

// 写入数据
const writeData = async (data) => {
  try {
    await axios.put(JSONBIN_API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY,
      },
    });
    console.log('Data written to JSONBin:', data);
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

// 处理获取用户访问状态的请求
app.post('/getStatus', async (req, res) => {
  const { username } = req.body;
  console.log('Received getStatus request for username:', username);
  const data = await readData();
  if (data[username]) {
    res.json(data[username]);
  } else {
    res.json({ email: false, social: false, ads: false });
  }
});

// 处理记录用户访问的请求
app.post('/recordVisit', async (req, res) => {
  const { username, source } = req.body;
  console.log('Received recordVisit request for username:', username, 'with source:', source);
  const data = await readData();
  if (!data[username]) {
    data[username] = { email: false, social: false, ads: false };
  }
  if (source) {
    data[username][source] = true;
  }
  await writeData(data);
  res.json(data[username]);
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
