window.onload = function () {
	const app = document.querySelector('#app');
	const restart = document.querySelector('.restart');
	const timerLabel = document.querySelector('h2 span');
	const countToWinLabel = document.querySelector('h3 span');

	let randomNumbers,
		gameOver,
		timerID,
		timer,
		countRandomNumbers = 10,
		countToWin;

	function getRandom(max) {
		return Math.trunc(Math.random() * max) + 1;
	}

	function getRandomNumbers(count, maxValue) {
		let number;
		for (let i = 0; randomNumbers.length < count; i++) {
			number = getRandom(maxValue);
			if (!randomNumbers.includes(number)) randomNumbers.push(number);
		}
	}

	function createTable(count) {
		let html = '<table>';
		for (let i = 0; i < count; i++) {
			html += `<tr>`;
			for (let j = 1; j <= count; j++) {
				html += `<td class="cell ${i * 10 + j}">${i * 10 + j}</td>`;
			}
			html += `</tr>`;
		}
		html += `</table>`;
		return html;
	}

	function setState(element, color) {
		element.style.backgroundColor = color;
		element.classList.add('checked');
	}

	function onAddEventListeners() {
		const tds = app.querySelectorAll('td');
		tds.forEach((el) => {
			el.addEventListener('click', (e) => {
				if (!e.target.classList.contains('checked') && !gameOver) {
					if (randomNumbers.includes(+e.target.textContent)) {
						setState(e.target, 'green');
						if (--countToWin == 0) {
							gameOver = 1;
							clearInterval(timerID);
						}
						countToWinLabel.textContent = countToWin;
					} else {
						setState(e.target, 'red');
					}
				}
			});
		});
	}

	function init() {
		clearInterval(timerID);
		randomNumbers = [];
		countToWin = countRandomNumbers;
		countToWinLabel.textContent = countToWin;
		timer = 30;
		gameOver = 0;
		app.innerHTML = createTable(10);
		getRandomNumbers(countRandomNumbers, 100);
		onAddEventListeners();
		timerID = setInterval(() => {
			if (timer == 0 && countToWin > 0) {
				gameOver = 1;
				clearInterval(timerID);
			}
			timerLabel.textContent = timer--;
		}, 1000);
		console.log(randomNumbers);
	}

	init();

	restart.addEventListener('click', () => {
		gameOver = 1;
		init();
	});
};
