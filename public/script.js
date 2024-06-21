document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('usernameInput');
    const checkStatusButton = document.getElementById('checkStatusButton');
    const visitedSourcesStatus = document.getElementById('visitedSourcesStatus');

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
            })
            .catch(error => {
                console.error('Error fetching status:', error);
                visitedSourcesStatus.textContent = 'Error fetching status';
            });
        } else {
            visitedSourcesStatus.textContent = 'Please enter a username.';
        }
    });
});