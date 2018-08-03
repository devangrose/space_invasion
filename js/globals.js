var GAME_HEIGHT = 500;
var GAME_WIDTH = 800;
var STARTING_LIFE = 150;
var DEFAULT_SPEED = 300;
var BACKGROUND_SPEED = -50;
var SWITCH_WEAPON_TIMER = 200;
var WEAPONS = [
    {name: 'Laser', velocity: 650, timer: 180, offset: 20},
    {name: 'Missle', velocity: 400, timer: 600, offset: 20}
];

// Global variables
var player;
var enemies;
var lasers, missles;
var cursors; 
var scoreText, hpText;
var music, pewpew, launch;
var weaponTimer = 0;
var switchTimer = 0;
var currentWeapon = 0;
