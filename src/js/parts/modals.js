function modals(){
	// modal window
	let more = document.querySelector('.more'),
	overlay = document.querySelector('.overlay'),
	close = document.querySelector('.popup-close');

	more.addEventListener('click', () => { // открываем модальное окно
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', () => { // закрываем модальное окно
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	// modal window in tabs

	let mainBox = document.querySelector('.info');

	mainBox.addEventListener('click', () => {
		let target = event.target;
		if(target && target.classList.contains('description-btn')) {
			overlay.style.display = 'block';
			document.body.style.overflow = 'hidden';
		}
	});
}
module.exports = modals;