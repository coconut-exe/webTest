require('dotenv').config();
const express = require('express');
const path = require('path');
const Click = require('./models/Click');
const sequelize = require('./database');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/clickCount', async (req, res) => {
    try {
        const click = await Click.findOne({ where: { id: 1 } });
        const clickCount = click ? click.clickCount : 0;
        res.json({ clickCount });
    } catch (error) {
        console.error('Error fetching click count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/click', async (req, res) => {
    try {
        const click = await Click.findOne({ where: { id: 1 } });
        if (click) {
            click.clickCount += 1;
            await click.save();
        } else {
            await Click.create({ id: 1, clickCount: 1 });
        }
        res.json({ message: 'Click recorded' });
    } catch (error) {
        console.error('Error processing click:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});