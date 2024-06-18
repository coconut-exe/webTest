document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const checkStatusButton = document.getElementById('checkStatusButton');
    const emailMessage = document.getElementById('emailMessage');
    const socialMessage = document.getElementById('socialMessage');
    const adsMessage = document.getElementById('adsMessage');
    const visitedSourcesStatus = document.getElementById('visitedSourcesStatus');
    const button = document.getElementById('myButton');

    // 获取 URL 中的查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');

    // 用户输入账号后检查访问状态
    checkStatusButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetch('/getStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(response => response.json())
            .then(data => {
                visitedSourcesStatus.innerHTML = `
                    email ${data.email ? '✅' : '❌'}<br>
                    advertisement ${data.ads ? '✅' : '❌'}<br>
                    social ${data.social ? '✅' : '❌'}
                `;
            });
        } else {
            visitedSourcesStatus.textContent = 'Please enter a username.';
        }
    });

    // 如果当前 source 存在，记录访问
    if (source) {
        const username = usernameInput.value.trim();
        if (username) {
            fetch('/recordVisit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, source })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Visit recorded:', data);
            });
        }
    }

    // 按钮点击事件示例
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
