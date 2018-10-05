// array with all cards
let cards = [].slice.call(document.querySelectorAll('.card'));
let openCards = []

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
    // console.log('they match');
    // console.log(openCards);
  } else {
    setTimeout(function(){
      openCards[0].parentNode.classList.remove('open', 'show');
      openCards[1].parentNode.classList.remove('open', 'show');
      openCards = []; }, 500);
    // console.log('no match');
  }
}
// shuffle cards
// function shuffleCards() {
//   cards.length
//   console.log(cards);
// }
// shuffleCards();
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




 // when two cards are the same, they stay shown
 // cards flip (css?)
 // "stars" functionality
 // move counter
 // game reset
 // timer
