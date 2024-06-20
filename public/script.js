document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const clickCountDisplay = document.getElementById('clickCount');

    // 获取点击次数
    fetch('/clickCount')
        .then(response => response.json())
        .then(data => {
            clickCountDisplay.textContent = `Click count: ${data.clickCount}`;
        })
        .catch(error => {
            console.error('Error fetching click count:', error);
            clickCountDisplay.textContent = 'Error loading click count';
        });

    // 记录点击次数
    clickButton.addEventListener('click', () => {
        fetch('/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            fetch('/clickCount')
                .then(response => response.json())
                .then(data => {
                    clickCountDisplay.textContent = `Click count: ${data.clickCount}`;
                });
        })
        .catch(error => {
            console.error('Error processing click:', error);
        });
    });
});