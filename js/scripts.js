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
	let deadLine = new Date(2019, 4, 20),
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
		success: '<img src="../img/success.svg" width="30px" height="30px">',
		failure: 'Что-то пошло не так...'
	};

	let form = document.querySelector('.main-form'),
		contactForm = document.querySelector('#form'),
		inputPhone = document.querySelectorAll('input[type="tel"]'),
		statusMessage = document.createElement('div');

		for(let i = 0; i < inputPhone.length; i++){ // в инпутах с телефоном вводим только цифры и +
			inputPhone[i].addEventListener('input', function() {
				inputPhone[i].value = inputPhone[i].value.replace(/[^\+\d]/g, '');
			});
		}
		statusMessage.classList.add('status');

	function sendForm(elem) {
		elem.addEventListener('submit', function(event) {
			event.preventDefault();
			elem.appendChild(statusMessage);
			let input = elem.getElementsByTagName('input');
			let formData = new FormData(elem);
			statusMessage.style.display = 'block';
		
			function postData(data){
				return new Promise(function(resolve,reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

					request.addEventListener('readystatechange', function() {
						if (request.readyState < 4){
							resolve();
						} else if(request.readyState === 4 && request.status === 200) {
							resolve();
						} else {
							reject();
						}

					});

					let obj = {};
					formData.forEach(function(value, key) {
						obj[key] = value;
					});
					let json = JSON.stringify(obj);
					request.send(json);

				});
			} // postData

			function clearInput(){ // очищаем поля ввода при успешной отправке
				for(let i = 0; i < input.length; i++) { 
					input[i].value = '';
				}
			}

			postData(formData)
				.then(()=> statusMessage.innerHTML = message.loading)
				.then(()=> {
					statusMessage.innerHTML = message.success;
					setTimeout(()=> { // удаляем сообщение об отправке через 5 секунд
						statusMessage.style.display = 'none';
					}, 5000);
				})
				.catch(()=> statusMessage.innerHTML = message.failure)
				.then(clearInput);
		});
	} // end sendForm

	sendForm(form);
	sendForm(contactForm);

	// slider

	let slideIndex = 1, // текущий слайд
		slides = document.querySelectorAll('.slider-item'), // все слайды
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		dotsWrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

		showSlides(slideIndex);
		function showSlides(n) {

			if (n > slides.length) { // когда перелистываем последний слайд, возвращаемся на первый
				slideIndex = 1;
			}
			if (n < 1) {
				slideIndex = slides.length;
			}
			slides.forEach((item) => item.style.display = 'none');
			dots.forEach((item) => item.classList.remove('dot-active'));

			slides[slideIndex - 1].style.display = 'block';
			dots[slideIndex - 1].classList.add('dot-active');
		} // show slides

		function plusSlides(n) {
			showSlides(slideIndex += n);
		}
		function currentSlide(n){
			showSlides(slideIndex = n);
		}

		prev.addEventListener('click', function() {
			plusSlides(-1);
		});
		next.addEventListener('click', function() {
			plusSlides(1);
		});

		dotsWrap.addEventListener('click', function(event) {
			for (let i = 0; i < dots.length + 1; i++) {
				if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
					currentSlide(i);
				}
			}
		});

		// calculator

		let inputs = document.querySelectorAll('.counter-block-input'),
			persons = document.querySelectorAll('.counter-block-input')[0],
			restDays = document.querySelectorAll('.counter-block-input')[1],
			place = document.getElementById('select'),
			totalValue = document.getElementById('total'),
			personsSum = 0,
			daysSum = 0,
			total = 0;

			totalValue.innerHTML = 0;

			inputs.forEach(function(item) {  // вводим только цифры
				item.addEventListener('input', function() {
					item.value = item.value.replace(/[^\d]/g, '');
				});
			});

			persons.addEventListener('change', function() {
				personsSum = +this.value;
				total = (daysSum + personsSum)*4000;
				if(restDays.value == '') {
					totalValue.innerHTML = 0;
				} else if(personsSum == '') {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = total;
				}
			});

			restDays.addEventListener('change', function() {
				daysSum = +this.value;
				total = (daysSum + personsSum)*4000;

				if(persons.value == '') {
					totalValue.innerHTML = 0;
				} else if (daysSum == '') {
					totalValue.innerHTML = 0;
				} else {
					totalValue.innerHTML = total;
				}
			});

			place.addEventListener('change', function() {
				if(restDays.value == '' || persons.value == '') {
					totalValue.innerHTML = 0;
				} else {
					let a = total;
					totalValue.innerHTML = a * this.options[this.selectedIndex].value;
				}
			});
		
}); // -> end scripts