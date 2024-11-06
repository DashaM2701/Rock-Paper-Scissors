const circle = document.querySelectorAll('.circle');
const playAgainBtn = document.querySelector('.result_btn');
const displayScore = document.querySelector('#display_current');
const choices = document.querySelectorAll('.choice');
const userChoiceElem = document.querySelector('#playerSelection');
const computerChoiceElem = document.querySelector('#computerSelection');
const resultText = document.querySelector('#resultText');
const resultSection = document.querySelector('#choice');
const choicesSection = document.querySelector('.game_elem');
const playerImgContainer = document.querySelector('#player_img_container');
const computerImgContainer = document.querySelector('#computer_img_container');
const result = document.querySelector('.result');
const btnClose = document.querySelector('.modal_close');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const rules = document.querySelector('.wrapper-rules');



let total = 10;
const choicesMap = {
  rock: { winsAgainst: 'scissors', img: '/images/icon-rock.svg', class: 'circle_rock' },
  paper: { winsAgainst: 'rock', img: '/images/icon-paper.svg', class: 'circle_paper' },
  scissors: { winsAgainst: 'paper', img: '/images/icon-scissors.svg', class: 'circle_scissors' }
};

choices.forEach((btn) => {
  btn.addEventListener('click', () => {
    const userChoice = btn.getAttribute('data-choice');
    const computerChoice = getComputerChoice();
    showResult(userChoice, computerChoice);
    result.classList.remove('hidden');
    rules.classList.add('hidden');

  });
});

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

playAgainBtn.addEventListener('click', () => {
  resultSection.classList.add('hidden');
  choicesSection.classList.remove('hidden');
  computerImgContainer.classList.remove('winner-flash')
    playerImgContainer.classList.remove('winner-flash')
    rules.classList.remove('hidden');

});

function getComputerChoice() {
  const choiceArr = Object.keys(choicesMap);
  return choiceArr[Math.floor(Math.random() * choiceArr.length)];
}

function showResult(userChoice, computerChoice) {
  userChoiceElem.textContent = userChoice;
  computerChoiceElem.textContent = computerChoice;

  // Устанавливаем изображения и классы
  playerImgContainer.innerHTML = `<img src="${choicesMap[userChoice].img}" alt="${userChoice}" class="circle ${choicesMap[userChoice].class}">`;
  computerImgContainer.innerHTML = `<img src="${choicesMap[computerChoice].img}" alt="${computerChoice}" class="circle ${choicesMap[computerChoice].class}">`;

  if (userChoice === computerChoice) {
    resultText.textContent = "IT'S A TIE";
  } else if (choicesMap[userChoice].winsAgainst === computerChoice) {
    resultText.textContent = "YOU WIN";
    playerImgContainer.classList.add('winner-flash')
    total++;
  } else {
    resultText.textContent = "YOU LOSE";
    total--;
    computerImgContainer.classList.add('winner-flash')
  }

  displayScore.textContent = total;
  resultSection.classList.remove('hidden');
  choicesSection.classList.add('hidden');
}

rules.addEventListener('click', () => {

modal.classList.remove('hidden')
overlay.classList.remove('hidden');

document.body.style.overflow = 'hidden';

});

function closeModal(){
  document.body.style.overflow = '';
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
