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

	info.addEventListener('click', function(event) {
		let target = event.target;
		console.log(target);
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
	let deadLine = new Date(2019, 4, 4),
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
		close = document.querySelector('.popup-close'),
		descr = document.querySelector('.description');

	more.addEventListener('click', function() { // открываем модальное окно
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	close.addEventListener('click', function() { // закрываем модальное окно
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		document.body.style.overflow = '';
	});

	// modal window in tabs

	let mainBox = document.querySelector('.info');

	mainBox.addEventListener('click', function() {
		let target = event.target;
		if(target && target.classList.contains('description-btn')) {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		}
	});

}); // -> end scripts