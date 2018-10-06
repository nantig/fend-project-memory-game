// array with all cards
let cards = [].slice.call(document.querySelectorAll('.card'));
let openCards = []
let movesCount = 0;
let stars = [].slice.call(document.querySelectorAll('.fa-star'));
let matches = []
let seconds = 0;
let minutes = 0;
let clock = []
let reset = [].slice.call(document.querySelectorAll('.restart'));

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

// when a card is clicked...
function cardClicked(evt) {
  const clickedCard = event.target;
  if (openCards.length < 2 && !openCards.includes(clickedCard)) {
    clickedCard.parentNode.classList.add('open', 'show');
    openCards.push(clickedCard);
  } if(openCards.length === 2) {
    evaluateFlip();
  }
  firstClick();
}

// evaluate if the 2 cards that were clicked match
function evaluateFlip(){
  if (openCards[0].className === openCards[1].className){
    openCards[0].parentNode.classList.remove('show');
    openCards[1].parentNode.classList.remove('show');
    openCards[0].parentNode.classList.add('match');
    openCards[1].parentNode.classList.add('match');
    openCards = [];
    moves();
    matchedCards();
  } else {
    setTimeout(function(){
      openCards[0].parentNode.classList.remove('open', 'show');
      openCards[1].parentNode.classList.remove('open', 'show');
      openCards = []; }, 500);
      moves();
    // console.log('no match');
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
  if (movesCount === 10) {
    stars[4].remove('fa-star');
  } else if (movesCount === 15) {
    stars[3].remove('fa-star');
  } else if (movesCount === 20) {
    stars[2].remove('fa-star');
  } else if (movesCount === 25) {
    stars[1].remove('fa-star');
  } else {
    movesCount > 20;
  }
}

// keeps track of how many cards are matched
function matchedCards() {
  matches++;
  if (matches === 8) {
    stopTimer();
  }
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

// looks for first click to start timer
function firstClick() {
  if (openCards.length === 1 && movesCount === 0) {
  startTimer();
  }
}
// stop the clock
function stopTimer() {
  clearInterval(timer);
}

// reset the game when the reset button is clickedCard


function resetGame() {

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
