document.addEventListener('DOMContentLoaded', () => {
    const clickButton = document.getElementById('clickButton');
    const clickCountDisplay = document.getElementById('clickCount');
  
    const updateClickCount = async () => {
      try {
        const response = await fetch('/clickCount');
        const data = await response.json();
        clickCountDisplay.textContent = `Click count: ${data.clickCount}`;
      } catch (err) {
        clickCountDisplay.textContent = 'Error loading click count';
      }
    };
  
    clickButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/click', { method: 'POST' });
        const data = await response.json();
        clickCountDisplay.textContent = `Click count: ${data.clickCount}`;
      } catch (err) {
        console.error('Error processing click:', err);
      }
    });
  
    updateClickCount();
  });