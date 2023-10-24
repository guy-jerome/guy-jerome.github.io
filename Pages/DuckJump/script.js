
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const ScreenWidth = 800
const ScreenHeight = 600
const app = new PIXI.Application({
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'red'
});
const gravity = .2
let jumpSpeed = 8
document.body.appendChild(app.view);


const button = PIXI.Sprite.from("button.png")
button.interactive = true;
button.x = 200
button.y = 100
button.scale.set(4,4)
button.on('pointerdown', ()=>{
    button.visible = !button.visible
    app.renderer.backgroundColor = "blue"
    button.interactive = false;
    startGame()
})
app.stage.addChild(button)

const duck = PIXI.Sprite.from("duck.png")
let duckStarty = 400
duck.x = 300;
duck.y = duckStarty
duck.zIndex = 2
duck.scale.set(4,4)
 

const log = PIXI.Sprite.from("log.png")
log.x = 0;
log.y = 440;
log.scale.set(4,4)
log.zIndex = 1

let logSpeed = 5
const logSpeedA = .005

app.stage.addChild(log)
app.stage.addChild(duck)

let jumping = false;

const scoreText = new PIXI.Text('Score: 0', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff, // Text color (white)
});

function increaseScore(points) {
    score += points;
    scoreText.text = `Score: ${score}`;
}



let score = 0

scoreText.position.set(10, 10); // Set the position of the score text
app.stage.addChild(scoreText);

window.addEventListener("keypress", (e)=>{
    if (e.key === " " && !jumping){
        jumping = true
    }
})
function duckJump(){
    if (jumping){
        duck.y -= jumpSpeed
        jumpSpeed -= gravity
        if (duck.y > duckStarty){
            duck.y === duckStarty
            jumpSpeed = 8
            jumping = false
        }
    }
}
let scored = false
function logMove(){
    log.x += logSpeed
    logSpeed+=logSpeedA
    if(log.x > ScreenWidth){
        log.x = 0
        scored = false

    }
    if(log.x > duck.x && scored === false){
        increaseScore(1)
        scored = true
    }
    if (isColliding(log,duck)){
        app.ticker.remove(duckJump)
        app.ticker.remove(logMove)
        button.visible = !button.visible
        button.interactive = true;
        app.renderer.backgroundColor = "red"
        
    }
}
function startGame(){
    logSpeed = 5
    score = 0
    scoreText.text = `Score: ${score}`
    log.x = 0;
    log.y = 440;
    duck.y = duckStarty
    app.ticker.add(duckJump)
    app.ticker.add(logMove)
}





function isColliding(object1, object2) {
    // Get the bounds of each object
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    // Check for collision by comparing the bounds
    return (
        bounds1.x + bounds1.width - 50 > bounds2.x &&
        bounds1.x < bounds2.x + bounds2.width - 50 &&
        bounds1.y + bounds1.height - 30 > bounds2.y &&
        bounds1.y < bounds2.y + bounds2.height - 30
    );
}



// let duckX = 300;
// let duckY = 300;
// const duckSpeed = 4;



// Maintain the state of movement keys
// const movement = {
//     w: false,
//     s: false,
//     a: false,
//     d: false,
// };

// // Listen for keydown and keyup events
// window.addEventListener("keydown", (e) => {
//     if (e.key in movement) {
//         movement[e.key] = true;
//     }
// });

// window.addEventListener("keyup", (e) => {
//     if (e.key in movement) {
//         movement[e.key] = false;
//     }
// });

// Update the duck's position based on the combined input
// app.ticker.add(() => {
    // if (movement.w && movement.a) {
    //     duckX -= duckSpeed;
    //     duckY -= duckSpeed;
    // } else if (movement.w && movement.d) {
    //     duckX += duckSpeed;
    //     duckY -= duckSpeed;
    // } else if (movement.s && movement.a) {
    //     duckX -= duckSpeed;
    //     duckY += duckSpeed;
    // } else if (movement.s && movement.d) {
    //     duckX += duckSpeed;
    //     duckY += duckSpeed;
    // } else if (movement.w) {
    //     duckY -= duckSpeed;
    // } else if (movement.s) {
    //     duckY += duckSpeed;
    // } else if (movement.a) {
    //     duckX -= duckSpeed;
    // } else if (movement.d) {
    //     duckX += duckSpeed;
    // }

//     duck.x = duckX;
//     duck.y = duckY;
// });
