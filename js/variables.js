
// ============ Variables  ====================//
const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const stageWidth = canvas.width;
const stageHeight = canvas.height;
const brick_with = 25;
const ship_img = document.getElementById("ship_image");

let collection = [];
let collectionAliens = [];
let collectionShoots = [];
let collectionBricsk = [];
let speed = 10;

const aliensId = ['alien_boss','alien_spawn_1','alien_spawn_2'];

// RequestAnimateFreame FPS
let dropCounter = 0;
let dropInterval = 1000; //milliseconds
let lastTime = 0;

// ============ End Variables  ====================//
// ctx.scale(10,10);