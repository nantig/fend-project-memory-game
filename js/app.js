// array with all cards
let cards = [].slice.call(document.querySelectorAll('.card'));
let openCards = []
let movesCounter = 0;

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
    // console.log(openCards);
  } if(openCards.length === 2) {
    evaluateFlip();
  }
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
    // console.log('they match');
    // console.log(openCards);
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
  movesCounter++;
  const movesCounterText = document.querySelector('.moves');
  movesCounterText.innerHTML = movesCounter;
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
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // cards flip (css?)
 // "stars" functionality
 // move counter
 // game reset
 // timer
