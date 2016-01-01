/* globals ctx:true, Resources:true */
var Enemy = function(y) {

    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = y;
    this.speed = this.getspeed() + Math.random() * 150;
};

Enemy.prototype.update = function(dt) {

    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = 0;
    }

    this.checkCollisions(player);
    return;
};

Enemy.prototype.getspeed = function() {
    var random = Math.random() + 0.5;
    if (Math.floor(random) < 1) {
        return 3;
    } else {
        return 6;
    }

};

/* defining enemy instances*/
var enemy1 = new Enemy(65);
var enemy2 = new Enemy(149);
var enemy3 = new Enemy(230);
var allEnemies = [enemy1, enemy2, enemy3];


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

/* defining player function*/
var Player = function() {


    this.sprite = 'images/char-cat-girl.png';


    this.x = 14;
    this.y = 523;

    this.x_ = 14;
    this.y_ = 523;
};

var player = new Player();
Player.prototype.handleInput = function(e) {

    if (e === 'left' && this.x > 25) {
        this.x -= 100;
    }
    if (e === 'up' && this.y > 0) {
        this.y -= 82.5;
    }
    if (e === 'right' && this.x < 400) {
        this.x += 100;
    }
    if (e === 'down' && this.y < 400) {
        this.y += 82.5;
    }

};

Player.prototype.update = function(dt) {

    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < -70) {
        player.reset();
    } else if (this.y > 420) {
        this.y = 420;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*collision detection function*/
Enemy.prototype.checkCollisions = function(player) {
    if (player.x < this.x + 75 &&
        player.x + 65 > this.x &&
        player.y < this.y + 50 &&
        70 + player.y > this.y) {

        player.reset();
    }
};

Player.prototype.reset = function() {

    this.x = this.x_;
    this.y = this.y_;
};