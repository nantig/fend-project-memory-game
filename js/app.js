/*
 * Create a list that holds all of your cards
 */
var flipCount = 0;

// looks for when a card is clicked
var cardCollection = document.getElementsByClassName('card');
for(var i = 0; i < cardCollection.length; i++) {
  cardCollection[i].addEventListener('click', cardClicked);
}

// only allows two cards to be clicked at a time
function cardClicked(evt){
  if(flipCount == 0){
    flipCount = 1;
    evt.target.parentNode.classList.add('open', 'show');
  } else if (flipCount == 1) {
    flipCount = 2;
    evt.target.parentNode.classList.add('open', 'show');
    setTimeout(function(){ evaluateFlip(evt); }, 300);
  }
}

// evaluate if the cards match
function evaluateFlip(evt){
  var shownCollection = document.getElementsByClassName('show');
  if(shownCollection[0].firstElementChild.className == shownCollection[1].firstElementChild.className){
    alert('they match');
    // evt.target.parentNode.classList.add('match', 'show');
  } else{
  }

  while (shownCollection.length > 0) {
    shownCollection[0].classList.remove('open', 'show');
  }

  flipCount = 0;
}


// puts all cards in a node list (because i cant figure out array)
const deck = document.querySelectorAll('.deck');

function shuffleCards() {

}
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
