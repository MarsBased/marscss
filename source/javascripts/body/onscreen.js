import OnScreen from 'onscreen';
const os = new OnScreen();

os.on('enter', '[data-onscreen]', (element, event) => {
  element.classList.add('on-screen');
});

os.on('leave', '[data-onscreen]', (element, event) => {
  element.classList.remove('on-screen');
});
