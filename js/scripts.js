window.addEventListener('DOMContentLoaded', function() {
	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for(let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}

	hideTabContent(1);

	function showTabContent(b) {
		if(tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', (event) => {
		let target = event.target;
		if(target && target.classList.contains('info-header-tab')) {
			for(let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
				}
			}
		}
	});


	// timer
	let deadLine = new Date(2019, 4, 10),
		deadLineSec = +deadLine;

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
		seconds = Math.floor((t/1000) % 60),
		minutes = Math.floor((t/1000/60) % 60),
		hours = Math.floor((t/(1000*60*60)));

		function pad(num) { // добавляем "0" если одна цифра
			num = num.toString();
			if (num.length < 2) {
				return ('0' + num);
			} else {
				return num;
			}
		}

		return {
			'total' : t,
			'hours' : pad(hours),
			'minutes' : pad(minutes),
			'seconds' : pad(seconds)
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

			function updateClock() {
				let t = getTimeRemaining(endtime),
					now = +new Date();
				hours.textContent = t.hours;
				minutes.textContent = t.minutes;
				seconds.textContent = t.seconds;

				if (deadLineSec < now) { // если дедлайн уже прошел - обнуляем таймер
					clearInterval(timeInterval);
					hours.textContent = '00';
					minutes.textContent = '00';
					seconds.textContent = '00';
				} else if (t.total <= 0 ) {
					clearInterval(timeInterval);
				}
			}
	}


	setClock('timer', deadLine);

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

	// send form

	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form'),
		input = form.getElementsByTagName('input'),
		inputPhone = document.querySelectorAll('input[type="tel"]'),
		contactFormInput = contactForm.getElementsByTagName('input'),
		statusMessage = document.createElement('div');

		for(let i = 0; i < inputPhone.length; i++){ // в инпутах с телефоном вводим только цифры и +
			inputPhone[i].addEventListener('input', function() {
				inputPhone[i].value = inputPhone[i].value.replace(/[^\+\d]/g, '');
			});
		}

		statusMessage.classList.add('status');

		form.addEventListener('submit', function(event) {
			event.preventDefault();
			form.appendChild(statusMessage);

			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

			let formData = new FormData(form);

			let obj = {};
			formData.forEach(function(value, key) {
				obj[key] = value;
			});
			let json = JSON.stringify(obj);
			request.send(json);

			request.addEventListener('readystatechange', function() {
				if (request.readyState < 4){
					statusMessage.innerHTML = message.loading;
				} else if(request.readyState === 4 && request.status === 200) {
					statusMessage.innerHTML = message.success;
				} else {
					statusMessage.innerHTML = message.failure;
				}
			});

				for(let i = 0; i < input.length; i++) { // очищаем поля ввода при успешной отправке
					input[i].value = '';
				}
		});

		contactForm.addEventListener('submit', function(event) {
			event.preventDefault();
			contactForm.appendChild(statusMessage);

			let request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

			let formData = new FormData(contactForm);

			let obj = {};
			formData.forEach(function(value, key) {
				obj[key] = value;
			});
			let json = JSON.stringify(obj);
			request.send(json);

			request.addEventListener('readystatechange', function() {
				if (request.readyState < 4){
					statusMessage.innerHTML = message.loading;
				} else if(request.readyState === 4 && request.status === 200) {
					statusMessage.innerHTML = message.success;
				} else {
					statusMessage.innerHTML = message.failure;
				}
			});
			for(let i = 0; i < contactFormInput.length; i++) { // очищаем поля ввода при успешной отправке
				contactFormInput[i].value = '';
			}

		});

}); // -> end scripts