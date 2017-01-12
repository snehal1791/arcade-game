// Enemies our player must avoid

var Enemy = function(x, y, speed) {
    // Enemy's initial position and speed
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    var playerWidth = 50,
        playerHeight = 50,
        enemiesWidth = 60,
        enemiesHeight = 60;

    //ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);  //(this.speed * dt)
    if (this.x > canvas.width) {
        this.x = getRandomInt(-1000, -200);
        this.speed = getRandomInt(80, 200);
    }

    // Check Player's collision with the Enemies.
    // If collision occurs reset Player to its initial position.
    // Collision algorithm is based on Axis-Aligned Bounding Box
    // and taken from MDN|Game development|Techniques for game development|
    // 2D collision detection - https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (player.x < this.x + enemiesWidth &&
        player.x + playerWidth > this.x &&
        player.y < this.y + enemiesHeight &&
        player.y + playerHeight > this.y) {
        player.x = 200;
        player.y = 400;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player to play game
var Player = function() {
    // Players initial position on the canvas
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

// Update the player's position, required method for game
Player.prototype.update = function(dt) {
    if (this.y == -10) {
        this.y = 400;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Takes in key inputs and moves the Player on the grid
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y > 70){
                this.y = this.y - 82;
            }
            break;
        case 'down':
            if (this.y < 400){
                this.y = this.y - 82;
            }
            break;
        case 'left':
            if ( this.x > 0){
                this.x = this.x - 100;
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x = this.x + 100;
            }
            break;
    }

};

// All enemy objects are placed in an array called allEnemies
// All the player object is placed in a variable called player
var allEnemies = [
new Enemy(-100,60,100),
new Enemy(-300,60,80),
new Enemy(-300,150,150),
new Enemy(-100,225,200),
new Enemy(-200,220,80)
];

var player = new Player();

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// This listens for key presses
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
