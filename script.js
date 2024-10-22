const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
	'sigh',
	'tense',
	'airplane',
	'ball',
	'pies',
	'juice',
	'warlike',
	'bad',
	'north',
	'dependent',
	'steer',
	'silver',
	'highfalutin',
	'superficial',
	'quince',
	'eight',
	'feeble',
	'admit',
	'drag',
	'loving',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in Local Storage
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on text on start
text.focus();

// Start countdown
const timeInterval = setInterval(updateTime, 1000);

// Generate random word from array
function getRandomWord() {
	return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
	randomWord = getRandomWord();
	word.innerHTML = randomWord;
}

// Update score
function updateScore() {
	score++;
	scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
	time--;
	timeEl.innerHTML = time + 's';

	if (time === 0) {
		clearInterval(timeInterval);
		// End game
		gameOver();
	}
}

// Game over
function gameOver() {
	endgameEl.innerHTML = `
		<h1>Time ran out</h1>
		<p>Your final score is ${score}</p>
		<button onclick="location.reload()">Reload</button>
	`;
	endgameEl.style.display = 'flex';
}

addWordToDOM();

// Event Listener
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', (e) => {
	difficulty = e.target.value;
	localStorage.setItem('difficulty', difficulty);
});

text.addEventListener('input', (e) => {
	const insertedText = e.target.value;

	if (insertedText === randomWord) {
		addWordToDOM();
		updateScore();

		// Clear
		e.target.value = '';
		localStorage.getItem('difficulty', difficulty);
		switch (difficulty) {
			case 'easy':
				time += 5;
				break;
			case 'medium':
				time += 3;
				break;
			case 'hard':
				time += 2;
				break;
		}
		updateTime();
	}
});
