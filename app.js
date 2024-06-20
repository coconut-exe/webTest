const express = require('express');
const { Click } = require('./config'); // 确保路径正确
const app = express();
const port = process.env.PORT || 3000;

// 设置静态文件夹
app.use(express.static('public'));

app.use(express.json());

app.get('/clickCount', async (req, res) => {
  try {
    const click = await Click.findByPk(1);
    res.json({ clickCount: click ? click.click_count : 0 });
  } catch (error) {
    console.error('Error fetching click count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/click', async (req, res) => {
  try {
    let click = await Click.findByPk(1);
    if (click) {
      click.click_count += 1;
      await click.save();
    } else {
      click = await Click.create({ id: 1, click_count: 1 });
    }
    res.json({ clickCount: click.click_count });
  } catch (error) {
    console.error('Error processing click:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});