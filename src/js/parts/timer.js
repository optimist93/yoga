function timer(){
	let deadLine = new Date(2019, 4, 25),
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
}



	module.exports = timer;