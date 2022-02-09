'use strict';

class Chardle {
  constructor(word) {
    this.row = 0;
    this.word = wordPicker.chooseWord;
    //this word change as need to one pull from other doc two have random number chose the index corresponding to an index
    //--then that word at selected index becomes the chosen word (think all for this selction)
    //-----------further down well add the actual word check before submition
    this.gameOver = false;
    this.currentRow = gameboard.children[this.row].children;
    this.currentGuess = [];
  }
  displayChar(char) {
    for (let slot of this.currentRow) {
      if (slot.textContent === '') {
        slot.classList.add('grey-back');
        slot.textContent = char;
        this.currentGuess.push(char);
        break;
      }
    }
  }

  backSpace() {
    console.log(this.currentRow.length);
    for (let i = this.currentRow.length - 1; i >= 0; i--) {
      let slot = this.currentRow[i];
      if (slot.textContent !== '') {
        slot.classList = '';
        slot.textContent = '';
        this.currentGuess.pop();
        break;
      }
    }
  }

  rejectSubmition() {
    console.log('try again unfortunaly not in dataset sowwy');
    // popUp.classList.add('dont-exist');
    popUp.classList = '';
    // function hide() {
    //   popUp.classList.add('.dont-exist');
    // }
    setTimeout(function () {
      popUp.classList.add('dont-exist');
    }, 3000);
  }

  submitGuess() {
    if (this.currentGuess.length === 5) {
      //gate keep all below with seaching from wordPicke below only runs when returns true/ else not as word dosen't exist in dataset
      if (
        wordPicker.searchForGuess(
          this.currentGuess.join('').toLowerCase(),
          wordPicker.masterTable
        )
      ) {
        this.checkGuess(this.currentGuess, this.currentRow);
        this.currentGuess = [];
        this.row++;
        if (this.row < 6) {
          this.currentRow = this.currentRow =
            gameboard.children[this.row].children;
        } else {
          this.gameOver = true;
          header.classList.add('in-word');
          console.log('CMON you can do better than that');
        }
      } else {
        this.rejectSubmition();
      }
    }
  }
  changeStyle(element, style) {
    element.classList = style;
  }
  searchKeys(char) {
    for (let row of keyboard.children) {
      if (row.children[char]) {
        return row.children[char];
      }
    }
  }

  checkGuess(wordGuess, currentRow) {
    let count = 0;
    for (let i = 0; i < wordGuess.length; i++) {
      let key = this.searchKeys(wordGuess[i]);
      if (wordGuess[i] === this.word[i]) {
        this.changeStyle(currentRow[i], 'in-position');
        this.changeStyle(key, 'in-position');
        count++;
      } else if (this.word.includes(wordGuess[i])) {
        this.changeStyle(currentRow[i], 'in-word');
        this.changeStyle(key, 'in-word');
      } else {
        this.changeStyle(key, 'black-out');
      }
      //if count reaches 5 meant all char's in position and solved puzzle
      if (count === 5) {
        this.gameOver = true;
        console.log('winner winner chicken dinner');
        header.classList.add('in-position');
      }
    }
    count = 0;
  }
}

const header = document.querySelector('#header');
const gameboard = document.getElementById('gameboard');
const backspaceKey = document.querySelector('#backspace');
const enterKey = document.querySelector('#enter');
const keyboard = document.querySelector('#keyboard');
const popUp = document.querySelector('#dont-exist');
//can have an array of 5word strings / then randow num gen to chose index(aka word) so its dynamic
// do we want to dynamically sort with input or have it sorted alphabeticaly think regardless we need both
//-dynamically to search for match using the input, but also helps the search greatly if it was sorted to start

let chardle = new Chardle();

keyboard.addEventListener('click', function (e) {
  if (!chardle.gameOver) {
    if (e.target.value) {
      chardle.displayChar(e.target.value);
    }
  }
});

backspaceKey.addEventListener('click', function () {
  if (!chardle.gameOver) {
    chardle.backSpace();
  }
});

enterKey.addEventListener('click', function () {
  if (!chardle.gameOver) {
    chardle.submitGuess();
  }
});

//all its missing is a check for actually words must be actual word else no submition excepted
// how can we do that ????????
