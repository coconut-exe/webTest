const express = require('express');
const cors = require('cors');
const sequelize = require('./database'); // 确保路径正确
const User = require('./models/User'); // 确保路径正确
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

sequelize.sync({ alter: true }) // 确保数据库与模型同步
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

app.post('/getStatus', (req, res) => {
    const { username } = req.body;

    User.findOne({ where: { username } })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.json({ email: false, ads: false, social: false });
            }
        })
        .catch(error => {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.post('/recordVisit', (req, res) => {
    const { username, source } = req.body;

    User.findOne({ where: { username } })
        .then(user => {
            if (user) {
                user[source] = true;
                return user.save();
            } else {
                const newUser = User.build({ username });
                newUser[source] = true;
                return newUser.save();
            }
        })
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            console.error('Error processing request:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});