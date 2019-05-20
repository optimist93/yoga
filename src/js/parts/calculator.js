function calculator(){
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
		item.addEventListener('input', () => {
			if(item.value.match(/[^0-9]|^0{1}/g)) {
				item.value = '';
			}
		});
	});

	persons.addEventListener('input', function() {
		personsSum = +this.value;
		total = (daysSum + personsSum)*4000;
		if(restDays.value == '') {
			totalValue.innerHTML = 0;
		} else if(personsSum == '' || personsSum == 0) {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('input', function() {
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

	place.addEventListener('input', function() {
		if(restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});
}
module.exports = calculator;