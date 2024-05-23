document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('myButton');
    const dynamicMessage = document.getElementById('dynamicMessage');

    // 模拟 URL 中的查询参数
    const source = 'ads'; // 可以手动设置为 'email', 'social', 'ads' 等

    // 根据不同的 source 参数显示不同的消息
    switch (source) {
        case 'email':
            dynamicMessage.textContent = 'Welcome! You came here through an email link.';
            break;
        case 'social':
            dynamicMessage.textContent = 'Hello! You found us on social media.';
            break;
        case 'ads':
            dynamicMessage.textContent = 'Greetings! You arrived here from our advertisement.';
            break;
        default:
            dynamicMessage.textContent = 'This is a simple webpage created using HTML, CSS, and JavaScript.';
    }

    // 按钮点击事件示例
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
