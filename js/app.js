// array with all cards
let cards = [].slice.call(document.querySelectorAll('.card'));
let guessedCards = [];
let matches = [];
let movesCount = 0;
let stars = [].slice.call(document.querySelectorAll('.fa-star'));
let seconds = 0;
let minutes = 0;
let clock = [];
let reset = [].slice.call(document.querySelectorAll('.restart'));

// function resetCardState(card) { // could be card (reference to DOM node), or index of card in the array
//   // card.parentNode.classList.remove('open', 'show'); OR cards[cardIndex].parentNode.classList.remove('open', 'show');
// }

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

//ideal state would be to have the event listener on the deck instead of on each card - event delegation
// when a card is clicked...

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
function clearguessedCards() {
  guessedCards = [];
}

function cardMatch () {
  guessedCards[0].parentNode.classList.remove('show');
  guessedCards[1].parentNode.classList.remove('show');
  guessedCards[0].parentNode.classList.add('match');
  guessedCards[1].parentNode.classList.add('match');
  // console.log(cards);
  // clearguessedCards();
  matchedCards();
}

function resetGuessedCards() {
  setTimeout(function(){
    guessedCards[0].parentNode.classList.remove('open', 'show');
    guessedCards[1].parentNode.classList.remove('open', 'show');
    clearguessedCards();}, 500);
}

function evaluateFlip(){
  moves();
  if (guessedCards[0].className === guessedCards[1].className){
    cardMatch();
  } else {
    resetGuessedCards();
  }
}

// Record each move a player makes
function moves() {
  movesCount++;
  const movesNumber = document.querySelector('.moves');
  movesNumber.innerHTML = movesCount;
  starCount();
}

// remove stars as moves increase
function starCount() {
  if (movesCount === 12) {
    stars[4].classList.add('hide');
  } else if (movesCount === 18) {
    stars[3].classList.add('hide');
  } else if (movesCount === 24) {
    stars[2].classList.add('hide');
  } else if (movesCount === 30) {
    stars[1].classList.add('hide');
  } else {
    movesCount > 30;
  }
}

// keeps track of how many cards are matched
// function matchedCards() {
//   matches++;
//   if (matches === 8) {
//     stopTimer();
//   }
// }

function matchedCards() {
  matches = matches.concat(guessedCards);
  // console.log('matches: ' + matches);
  if (matches.length === cards.length) {
    stopTimer();
  }
  clearguessedCards();
}

// start the clock
function startTimer() {
  timer = setInterval(function(){
    // currentTime = new Date();
    // totalTime = currentTime - startTime;
    // format totalTime for display in HH:MM:SS format
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

// looks for first click to start timer
function firstClick() {
  if (guessedCards.length === 1 && movesCount === 0) {
  startTimer();
  }
}
// stop the clock
function stopTimer() {
  clearInterval(timer);
}

// reset the game when the reset button is clickedCard

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

function resetStars() {
  for (let i = 0; i < stars.length; i++) {
      stars[i].classList.remove('hide');
    }
}

function resetGame() {
  stopTimer();
  closeAllCards();
  resetClock();
  resetMovesCount();
  resetStars();
  cardShuffle();
}

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
/*
 TO DO LIST
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 // game reset
 // timer
