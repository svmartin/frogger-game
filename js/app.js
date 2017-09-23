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

  // update Enemy movement
  update(dt) {
    if (this.x < 506) {
      this.x += this.speed * dt;
    } else {
      this.x = -100;
      this.y = GameHelper.randomRow(enemyRows);
    }
    // determine if there was a collision
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

    if (this.y === 58) {
      this.row = 5;
    } else if (this.y === 141) {
      this.row = 4;
    } else {
      this.row = 3;
    }
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
}

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
    } else if (keyPressed === 'right' && this.x < 400) {
      this.x += 100;
      this.column += 1;
    } else if (keyPressed === 'up' && this.y > 25) {
      this.y -= 82;
      this.row += 1;
    } else if (keyPressed === 'down' && this.y < 400) {
      this.y += 82;
      this.row -= 1;
    }
  }

  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  reset() {
    this.x = 200;
    this.y = 400;
    this.row = 1;
    this.column = 3;
  }

  update(dt) {
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
    return enemyRows[Math.floor(Math.random() * (3 - 0), +0)];
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
