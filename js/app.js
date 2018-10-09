// array with all cards
let cards = [].slice.call(document.querySelectorAll('.card'));
let guessedCards = [];
let matches = [];
let movesCount = 0;
let stars = [].slice.call(document.querySelectorAll('.fa-star'));
let finalStarCount = 5;
let seconds = 0;
let minutes = 0;
let clock = [];
let reset = [].slice.call(document.querySelectorAll('.restart'));
let overlay = document.querySelector('.overlay');
let modal = document.querySelector('.modal-frame');

//shuffleCards
function cardShuffle() {
  shuffle(cards);
  for (card of cards) {
  card.parentElement.append(card);
  }
}
cardShuffle();

// clicked card event listener
for (card of cards) {
  card.addEventListener('click', cardClicked);
}

// when an individual card is clicked
function cardClicked(evt) {
  const clickedCard = event.target;
 if (guessedCards.length === 2) {
   resetGuessedCards();
 } else {
   if (guessedCards.length < 2 && !guessedCards.includes(clickedCard)) {
     clickedCard.parentNode.classList.add('open', 'show');
     guessedCards.push(clickedCard);
   }
   if (guessedCards.length === 2) {
     evaluateFlip();
   }
 }
  firstClick();
}

// see if two cards match, if they do match, if not, flip over
function evaluateFlip(){
  moves();
  if (guessedCards[0].className === guessedCards[1].className){
    cardMatch();
  } else {
    resetGuessedCards();
  }
}

function cardMatch () {
  guessedCards[0].parentNode.classList.remove('show');
  guessedCards[1].parentNode.classList.remove('show');
  guessedCards[0].parentNode.classList.add('match');
  guessedCards[1].parentNode.classList.add('match');
  matchedCards();
}

function resetGuessedCards() {
  setTimeout(function(){
    guessedCards[0].parentNode.classList.remove('open', 'show');
    guessedCards[1].parentNode.classList.remove('open', 'show');
    clearguessedCards();}, 500);
}

function clearguessedCards() {
  guessedCards = [];
}

// when two cards match
function matchedCards() {
  matches = matches.concat(guessedCards);
  if (matches.length === cards.length) {
    stopTimer();
    clearguessedCards();
    showYouWonModal();
  }
  clearguessedCards();
}

// Record each move a player makes. 1 move = two flipped cards
function moves() {
  movesCount++;
  const movesNumber = document.querySelector('.moves');
  movesNumber.innerHTML = movesCount;
  starCount();
}

// remove stars as movesCount increases
function starCount() {
  if (movesCount === 12) {
    stars[4].classList.add('hide');
    finalStarCount = 4;
  } else if (movesCount === 18) {
    stars[3].classList.add('hide');
    finalStarCount = 3;
  } else if (movesCount === 24) {
    stars[2].classList.add('hide');
    finalStarCount = 2;
  } else if (movesCount === 30) {
    stars[1].classList.add('hide');
    finalStarCount = 1;
  }
  // else {
  //   finalStarCount = 1;
  // }
}

// start the clock
function startTimer() {
  timer = setInterval(function(){
    seconds++;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (seconds === 60) {
        minutes++;
        seconds = 0 + "0";
      }
      clock.pop();
      clock.push(minutes + ":" + seconds);
      document.querySelector('.clock').innerHTML = clock;
  }, 1000);
}

// timer start/stop functions
function firstClick() {
  if (guessedCards.length === 1 && movesCount === 0) {
  startTimer();
  }
}

function stopTimer() {
  clearInterval(timer);
}

// resets for each element and full game reset
for (reset of reset) {
  reset.addEventListener('click', resetGame);
}

function closeAllCards() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open', 'match', 'show');
  }
}

function resetClock() {
  document.querySelector('.clock').innerHTML = "0:00";
  minutes = 0;
  seconds = 0;
  clock = [];
}

function resetMovesCount() {
  document.querySelector('.moves').innerHTML = "0";
  movesCount = 0;
}

function resetMatches() {
  matches = [];
}

function resetStars() {
  for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('hide');
    }
}

function resetFinalStarCount() {
  finalStarCount = 5;
}

function resetGame() {
  stopTimer();
  closeAllCards();
  resetClock();
  resetMovesCount();
  resetMatches();
  resetStars();
  resetFinalStarCount();
  cardShuffle();
}

// WINNER modal
function showYouWonModal() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove('open');
  }
  document.querySelector('.total-time').insertAdjacentHTML('afterend', clock);
  document.querySelector('.total-moves').insertAdjacentHTML('afterend', movesCount);
  document.querySelector('.total-stars').insertAdjacentHTML('afterend', finalStarCount);
  overlay.classList.toggle('hide');
  modal.classList.toggle('hide');
}

// event listeners for buttons on modal
// Close Button
document.querySelector('.button-close').addEventListener('click', () => {
  overlay.classList.toggle('hide');
  modal.classList.toggle('hide');
});
// Replay Button
document.querySelector('.button-replay').addEventListener('click', () => {
  resetGame();
  overlay.classList.toggle('hide');
  modal.classList.toggle('hide');
});

// provided in original document from Udacity:
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
