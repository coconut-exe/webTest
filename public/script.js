document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const clickCountDisplay = document.getElementById('clickCountDisplay');

    // 获取点击计数
    fetch('/clickCount')
        .then(response => response.json())
        .then(data => {
            clickCountDisplay.textContent = `Click count: ${data.count}`;
        })
        .catch(error => {
            console.error('Error fetching click count:', error);
            clickCountDisplay.textContent = 'Error loading click count';
        });

    // 按钮点击事件
    button.addEventListener('click', () => {
        fetch('/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        .then(response => response.json())
        .then(data => {
            clickCountDisplay.textContent = `Click count: ${data.count}`;
        })
        .catch(error => {
            console.error('Error processing click:', error);
        });
    });
});