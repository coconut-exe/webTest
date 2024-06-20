const express = require('express');
const path = require('path');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 处理获取用户访问状态的请求
app.post('/getStatus', async (req, res) => {
    const { username } = req.body;
    console.log('Received getStatus request for username:', username);
    try {
        const user = await User.findByPk(username);
        if (user) {
            res.json(user);
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
        let user = await User.findByPk(username);
        if (!user) {
            user = await User.create({ username, email: '', ads: false, social: false });
        }
        if (source) {
            user[source] = true;
            await user.save();
        }
        res.json(user);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});