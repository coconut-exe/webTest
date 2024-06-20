const express = require('express');
const path = require('path');
const cors = require('cors');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// 每次访问主页时增加访问计数
app.get('/', async (req, res) => {
    try {
        const user = await User.findByPk('visitor');
        if (user) {
            user.visitCount += 1;
            await user.save();
        } else {
            await User.create({ username: 'visitor', visitCount: 1 });
        }
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 获取访问计数
app.get('/visitCount', async (req, res) => {
    try {
        const user = await User.findByPk('visitor');
        if (user) {
            res.json({ visitCount: user.visitCount });
        } else {
            res.json({ visitCount: 0 });
        }
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});