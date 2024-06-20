const express = require('express');
const Sequelize = require('sequelize');
const path = require('path');
const cors = require('cors');
require('dotenv').config();  // 加载 .env 文件

const app = express();
const port = process.env.PORT || 3000;

// 从环境变量中获取数据库配置
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

// 定义 Click 模型
const Click = sequelize.define('Click', {
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

// 同步数据库
sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname)));

// 获取点击计数
app.get('/clickCount', (req, res) => {
    Click.findOne({ where: { id: 1 } }).then(click => {
        res.json({ count: click ? click.count : 0 });
    }).catch(error => {
        console.error('Error fetching click count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// 处理点击
app.post('/click', (req, res) => {
    Click.findOne({ where: { id: 1 } }).then(click => {
        if (click) {
            click.increment('count').then(() => {
                res.json({ count: click.count });
            });
        } else {
            Click.create({ id: 1, count: 1 }).then(newClick => {
                res.json({ count: newClick.count });
            });
        }
    }).catch(error => {
        console.error('Error processing click:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
});

// 添加处理 /favicon.ico 请求的路由
app.get('/favicon.ico', (req, res) => res.status(204));

// 启动服务器
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});