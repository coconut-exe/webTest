document.addEventListener('DOMContentLoaded', () => {
    const visitCountElement = document.getElementById('visitCount');
    const button = document.getElementById('myButton');

    // 获取点击计数
    fetch('/clickCount')
        .then(response => response.json())
        .then(data => {
            visitCountElement.textContent = `Total Clicks: ${data.clickCount}`;
        })
        .catch(error => {
            console.error('Error fetching click count:', error);
        });

    // 按钮点击事件
    button.addEventListener('click', () => {
        fetch('/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            visitCountElement.textContent = `Total Clicks: ${data.clickCount}`;
        })
        .catch(error => {
            console.error('Error processing click:', error);
        });
    });
});