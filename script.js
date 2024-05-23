document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event fired');
    
    const button = document.getElementById('myButton');
    const emailMessage = document.getElementById('emailMessage');
    const socialMessage = document.getElementById('socialMessage');
    const adsMessage = document.getElementById('adsMessage');
    const visitedSourcesStatus = document.getElementById('visitedSourcesStatus');

    if (!visitedSourcesStatus) {
        console.error('Element with id "visitedSourcesStatus" not found');
        return;
    }

    // 获取 URL 中的查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    console.log('Source:', source);

    // 初始化 LocalStorage
    if (!localStorage.getItem('visitedSources')) {
        localStorage.setItem('visitedSources', JSON.stringify([]));
    }

    // 获取已访问的 sources
    let sources = JSON.parse(localStorage.getItem('visitedSources'));
    console.log('Current visited sources:', sources);

    // 如果当前 source 存在并且没有被记录过，则添加到 LocalStorage
    if (source && !sources.includes(source)) {
        sources.push(source);
        localStorage.setItem('visitedSources', JSON.stringify(sources));
        console.log('Updated visited sources:', sources);
    }

    // 根据不同的 source 参数显示不同的消息
    switch (source) {
        case 'email':
            emailMessage.style.display = 'block';
            break;
        case 'social':
            socialMessage.style.display = 'block';
            break;
        case 'ads':
            adsMessage.style.display = 'block';
            break;
        default:
            break;
    }

    // 显示访问状态
    visitedSourcesStatus.innerHTML = `
        email ${sources.includes('email') ? '✅' : '❌'}<br>
        advertisement ${sources.includes('ads') ? '✅' : '❌'}<br>
        social ${sources.includes('social') ? '✅' : '❌'}
    `;
    console.log('Visited sources status updated');

    // 按钮点击事件示例
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});
