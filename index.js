const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const JSONBIN_URL = process.env.JSONBIN_URL;
const JSONBIN_KEY = process.env.JSONBIN_KEY;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// 读取数据
const readData = async () => {
    try {
        const response = await axios.get(JSONBIN_URL, {
            headers: {
                'X-Master-Key': JSONBIN_KEY
            }
        });
        return response.data.record;
    } catch (error) {
        console.error('Error reading data:', error);
        return {};
    }
};

// 写入数据
const writeData = async (data) => {
    try {
        await axios.put(JSONBIN_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': JSONBIN_KEY,
                'X-Bin-Private': true
            }
        });
    } catch (error) {
        console.error('Error writing data:', error);
    }
};

// 处理获取用户访问状态的请求
app.post('/getStatus', async (req, res) => {
    const { username } = req.body;
    console.log('Received getStatus request for username:', username);
    try {
        const data = await readData();
        if (data[username]) {
            res.json(data[username]);
        } else {
            res.json({ email: false, social: false, ads: false });
        }
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 处理记录用户访问的请求
app.post('/recordVisit', async (req, res) => {
    const { username, source } = req.body;
    console.log('Received recordVisit request for username:', username, 'with source:', source);
    try {
        const data = await readData();
        console.log('Current data:', data);
        if (!data[username]) {
            data[username] = { email: false, social: false, ads: false };
        }
        if (source) {
            data[username][source] = true;
        }
        await writeData(data);
        console.log('Updated data:', data);
        res.json(data[username]);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
