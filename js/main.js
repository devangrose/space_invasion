var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
    init: init,
    preload: preload,
    create: create,
    update: update
});

function init () {
}

function preload () {
    // Initialize arcade physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Load images for later use
    game.load.image('bg','../assets/img/cool-space-background.jpg');
    game.load.image('player','../assets/img/ship.png');
    game.load.image('laser','../assets/img/beam.png');
    game.load.image('missle','../assets/img/missile.png');
    game.load.image('enemy','../assets/img/enemy.png');
    game.load.image('enemy2','../assets/img/enemy2.png');

    // Load audio files for later use 
    game.load.audio ('music','../assets/audio/Shadelike.mp3');
    game.load.audio ('pewpew','../assets/audio/laser.ogg','../assets/audio/laser.mp3');
    game.load.audio ('launch','../assets/audio/Missile.mp3');
    game.load.audio ('explosion','../assets/audio/explosion.ogg','../assets/audio/explosion.mp3');
}

function create () {

    // Create the background and make it scroll
    var background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
    background.autoScroll(BACKGROUND_SPEED,0);
    
    // Set up sounds
    music = game.add.audio('music');
    music.play();
    pewpew = game.add.audio('pewpew',0.1);
    launch = game.add.audio('launch',0.1);

    // Create the player, place it in the world and give it life
    player = game.add.sprite(100, 250,'player');
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.score = 0;
    player.life = STARTING_LIFE;

    // Create laser objects for shooting
    lasers = game.add.group();
    createGroup(lasers,'laser',20);

    // Create missle objects for shooting
    missles = game.add.group();
    createGroup(missles,'missle',10);

    // Create enemies group
    enemies = game.add.group();
    createGroup(enemies,'enemy',50);


    // Add keyboard controls
    cursors = game.input.keyboard.createCursorKeys(); // arrow keys
    game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.ENTER]);

    // Add Score and HP Text to the screen
    hpText = game.add.text(GAME_WIDTH - 150, 20,'HP: ' + player.life.toString(),{fill: '#fff'});
    scoreText = game.add.text(GAME_WIDTH - 150, GAME_HEIGHT - 50, 'Score: ' + player.score.toString(), {fill: '#fff'});
}

function update () {
    player.body.velocity.set(0);
    if (cursors.left.isDown && cursors.right.isDown) {
        player.body.velocity.x = 0;
    }
    else if(cursors.left.isDown) {
        player.body.velocity.x = -DEFAULT_SPEED;
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = DEFAULT_SPEED;
    }

    if (cursors.up.isDown) {
        player.body.velocity.y = -DEFAULT_SPEED;
    }
    else if (cursors.down.isDown) {
        player.body.velocity.y = DEFAULT_SPEED;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
        // Fire the weapon
        fireWeapon();
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
        switchWeapon();
    }
}
