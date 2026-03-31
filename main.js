var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var playerHitbox
var misc;

var cursors;
var keySpace;

const FRICTION = 0.9;
const SPEED_VALUE = 25;
const JUMP_HEIGHT = -300;
var speed = 0;

var game = new Phaser.Game(config);

function preload () {
    this.load.image('corinne', 'assets/Corinne-Breton.png');
    this.load.spritesheet('sourire', 'assets/sourire.png', { frameWidth: 16, frameHeight: 16 });

}

function create () {
    // Misc
    misc = this.add.image(0,0,'corinne');
    misc.setOrigin(0,0);
    misc.setScale(3);

    // Player
    player = this.physics.add.sprite(100, 400, 'sourire');
    player.setScale(5);
    player.setCollideWorldBounds(true);

    playerHitbox = this.add.rectangle(0, 0, 200, 100, 0xff0000);


    // Animation
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('sourire', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    // Touches du clavier
    cursors = this.input.keyboard.createCursorKeys();
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

}

function update () {
    player.anims.play('idle', true);

    if (keySpace.isDown && player.body.onFloor()) {
        player.setVelocityY(JUMP_HEIGHT);  
    }

    if (cursors.right.isDown) {
        speed += SPEED_VALUE;
    } 
    if (cursors.left.isDown) {
        speed -= SPEED_VALUE;
    }

    speed = speed * FRICTION;
    player.setVelocityX(speed);




}