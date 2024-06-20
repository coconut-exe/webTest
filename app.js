const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync().then(() => {
    console.log('Database synced');
}).catch(err => {
    console.error('Error syncing database:', err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/clickCount', async (req, res) => {
    try {
        const user = await User.findByPk('visitor');
        res.json({ clickCount: user ? user.visitCount : 0 });
    } catch (error) {
        console.error('Error fetching click count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/click', async (req, res) => {
    try {
        let user = await User.findByPk('visitor');
        if (user) {
            user.visitCount += 1;
            await user.save();
        } else {
            user = await User.create({ username: 'visitor', visitCount: 1 });
        }
        res.json({ clickCount: user.visitCount });
    } catch (error) {
        console.error('Error processing click:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});