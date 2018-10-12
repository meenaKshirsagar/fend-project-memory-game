/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

var picArray=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-bomb","fa-leaf","fa-bicycle"];

var ar1=picArray.slice();
var ar2=picArray.slice();
var clickedArray=[];

function showMoves(score)
{
  var moves=document.getElementById('moves');
  var text="";
  if (moves){
    if (score ==1){
      text=score+" move";
    }

    else {
      text=score+" moves";
    }
      moves.innerText=text;
  }
//  return(moves.innerText);
}

function computeDisplayStar(numMoves)
{
    var starCount=0;
    if (numMoves <= 16)
    {
      starCount=3;
    }
    else if (numMoves <=24)
    {
      starCount=2;
    }
    else if (numMoves <=32)
    {
      starCount=1;
    }

    var starUI=document.getElementById('uistart');
    while (starUI.firstChild) {
        starUI.removeChild(starUI.firstChild);
    }

    for (i=0;i<starCount;i++)
    {

         starUI.innerHTML +='<li><i class="fa fa-star med-font"></i></li>';


    }
    return starCount;

}
var timer;
function init()
{
var score = 0;
clickedArray=[];
var matches=0;

showMoves(score);
computeDisplayStar(score);

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


shuffle(ar1);
shuffle(ar2);

var clickFunction = function (event)
{
var elem=event.target;
/* if element picture visible (it has open/show class names in (i) then ignore the click */
if (elem.classList.contains('open'))
{
  return;
};
if (elem.classList.contains('match'))
{
  return;
};
// it mean user clicke on something where picture is not shown

if (clickedArray.length === 2) // timer in progress
{
  return;
}

// if this is first click t clickedArray.length == 0  -
if (clickedArray.length == 0)
{
  elem.classList.add('open');
  elem.classList.add('show');
  clickedArray.push(elem);

}
else {
  // check if it matches
          if (clickedArray.length == 1)
          {


              if (elem != clickedArray[0]) {

                  score++;
                  showMoves(score);
                  computeDisplayStar(score);
              }

                if ((elem != clickedArray[0]) && (elem.getAttribute('name')== clickedArray[0].getAttribute('name')))
                {
                  // remove open and shown and add matched
                      clickedArray[0].classList.remove('open');
                      clickedArray[0].classList.remove('show');
                      clickedArray[0].classList.add('match');
                      elem.classList.add('match');
                      matches++;
                      if (matches == 8){
                        var timeString=timer.getTimeValues();
                        timer.pause();
                        var starCount=computeDisplayStar(score);
                        var resetChosen=swal({
                            title: '<strong>You Solved the puzzle </strong>',
                            type: 'info',
                            html:
                              'You took '+ score +' move/s'  +
                              ' and time was '+ timeString +
                              ' and star rating was '+starCount,
                            showCloseButton: true,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                              ' RESTART',

                            cancelButtonText:
                              'Done',

                          });
                          var btn=swal.getConfirmButton();
                          btn.addEventListener("click", reset,false );


                      }

                      clickedArray=[];
                }
                  else {
                      elem.classList.add('open');
                      elem.classList.add('show');
                      clickedArray.push(elem); // remeber this was clicked
                  // set timer to remove both visibility;

                      setTimeout(function () {

                                clickedArray[0].classList.remove('open');
                                clickedArray[0].classList.remove('show');
                                clickedArray[1].classList.remove('open');
                                clickedArray[1].classList.remove('show');
                    // set array to null
                                clickedArray=[];
                              },1000);  // 2000 millisecond
                    }
            }
    }

}


var ar3 = (ar1.concat(ar2));
var ul = document.getElementById("deck")
for
  (var i=0; i <16; i++){
    var list = document.createElement("li");
    list.classList.add("card");

  //    list.classList.add("open");
    //  list.classList.add("show");

      list.setAttribute('name',ar3[i]);
    var iElem = document.createElement("i");
    iElem.classList.add("fa");
    iElem.classList.add(ar3[i]);

    list.addEventListener("click", clickFunction,false );
    list.appendChild(iElem);
    console.log(list);
    ul.appendChild(list);

//  list.addEventListener("click", function(){ clickFunction(f);});
  }

  // display easytimer
if (!timer)
{
  timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    document.getElementById('timer').innerText=timer.getTimeValues().toString();
});
}

}

function reset()
{
  var ul = document.getElementById("deck")

  while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
  }
  timer.reset();
  init();

}
init();

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
