let enemyRows = [58, 141, 224];
let player;
let allEnemies = [];
let numberOfDeaths = 0;
let numberOfWins = 0;

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed, row) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.column = 0;
    this.row = enemyRows[Math.floor(Math.random() * (3 - 0), +0)];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }

  update(dt) {
    // console.log("bug column/player column: ", this.column, player.column);
    // console.log("bug row/player row: ", this.row, player.row);
    console.log("bug x: ", this.x);
    if (this.x < 506) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
        this.y = GameHelper.randomRow(enemyRows);
    }

    if (this.row === player.row) {
      let playerTest = player.x - this.x;
      let enemyTest = this.x - player.x;
      if (playerTest >= 0 && playerTest <= 80) {
        numberOfDeaths += 1;
        GameHelper.updateDeaths(numberOfDeaths);
        player.reset();

      } else if (enemyTest >= 0 && enemyTest <= 80) {
        numberOfDeaths += 1;
        GameHelper.updateDeaths(numberOfDeaths);
        player.reset();
      }
    }

    // if (this.x >= -80 && this.x <= 70) {
    //     this.column = 1;
    // } else if (this.x >= 71 && this.x <= 186) {
    //     this.column = 2;
    // } else if (this.x >= 120 && this.x <= 216) {
    //     this.column = 3;
    // } else if (this.x >= 222 && this.x <= 284) {
    //     this.column = 4;
    // } else if (this.x >= 321) {
    //     this.column = 5;
    // }
    //
    if (this.y === 58) {
        this.row = 5;
    } else if (this.y === 141) {
        this.row = 4;
    } else {
        this.row = 3;
    }
    //
    // if ((this.column === player.column) && (this.row === player.row)) {
    //     alert("You just moved into a BUG or you just got hit by a BUG! You lose!");
    //     player.reset();
    // }

  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }

  reset() {
    this.x = -100;
    this.y = 58;
  }

  static createEnemies(numberOfEnemies) {
    while (numberOfEnemies > 0) {
      allEnemies.push(new Enemy(-100, GameHelper.randomRow(enemyRows), GameHelper.randomSpeed(50, 150)));
      numberOfEnemies -= 1;
    }
  }
} // End of Enemy class

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.x = 200;
    this.y = 400;
    this.column = 3;
    this.row = 1;
    this.sprite = 'images/char-boy.png';
  }

  handleInput(keyPressed) {
    if (keyPressed === 'left' && this.x > 0) {
        this.x -= 100;
        this.column -= 1;
    }
    else if (keyPressed === 'right' && this.x < 400) {
        this.x += 100;
        this.column += 1;
    }
    else if (keyPressed === 'up' && this.y > 25) {
        this.y -= 82;
        this.row += 1;
    }
    else if (keyPressed === 'down' && this.y < 400) {
        this.y += 82;
        this.row -= 1;
    }
    console.log(this.x, this.y); // if this.y === -10, win!
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    // alert("Let's play again!");
    this.x = 200;
    this.y = 400;
    this.row = 1;
    this.column = 3;
  }

  update(dt) {
    // console.log("row", this.row);
    console.log("player x", player.x);
    if (this.y === -10) {
      setTimeout(() => {
        numberOfWins += 1;
        GameHelper.updateWins(numberOfWins);
        alert("You won!");
      }, 300);
      this.reset();
    }

  }
}

class GameHelper {
  constructor() {}

  static randomRow(possibleRows) {
    return enemyRows[Math.floor(Math.random() * (3 - 0), + 0)];
  }

  static randomSpeed(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static randomX(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  static updateWins(numWins) {
    let wins = document.querySelector('.wins');
    wins.innerHTML = numWins.toString();
  }

  static updateDeaths(numDeaths) {
    let deaths = document.querySelector('.deaths');
    deaths.innerHTML = numDeaths.toString();
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
Enemy.createEnemies(4);
console.log(allEnemies);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
