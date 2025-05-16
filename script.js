const toggleBtn = document.getElementById('toggleMode');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '切換回亮色' : '切換模式';
});
