let characterState = 'falling';
const menu = document.getElementById('animations');
menu.addEventListener('change', function(e){
    characterState = e.target.value;
})


const canvas = document.getElementById('canvas1'); //Custom variable called dcanvas and point JS towards it by the getelemntbyid and stating the name of the id formed in game index.html
const ctx = canvas.getContext('2d');
//console.log(ctx); //We can inspect the object
const CANVAS_WIDTH = canvas.width= 600;  //scaling
const CANVAS_HEIGHT = canvas.height= 580; 
const animationImage = new Image(); //making image variable
animationImage.src = './animation.png';
const spriteWidth = 575;   // 6876px(the amount of width pixels of the animation image)/12(number of columns of the image)= 573 but its too small so 575 is used
const spriteHeight = 523;  // 5230px(amount of height pixels)/12(number of rows)=523
//let frameX = 0;
//let frameY = 1;
//to mamke it easier to switch btw frames

let speedControl = 0; //for speed control
const slowerFrames = 5; //slow down or speed up

const dogAnimations = [];
const currentState = [
{
    name: 'standing',
    frames: 7,  //made up 7 frames(from image)
},
{
    name: 'jumping',
    frames: 7,  
},
{
    name: 'falling',
    frames: 7,  
},
{
    name: 'running',
    frames: 9,  
},
{
    name: 'dizziness',
    frames: 11,  
},
{
    name: 'sitting',
    frames: 5,  
},
{
    name: 'tumbling',
    frames: 7,  
},
{
    name: 'biting',
    frames: 7,  
},
{
    name: 'killed',
    frames: 12,  
},
{
    name: 'injured',
    frames: 4,  
}
];

currentState.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    dogAnimations[state.name] = frames;
});
console.log(dogAnimations);


//animate loop where i defined a function named animate
//drawImage funtion can accept, 5 or 9 arguments.
function animate(){
ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); //Creates a rectangle
let position = Math.floor(speedControl/slowerFrames) % dogAnimations[characterState].loc.length; //math.floor reduces decimal points (COMPLEX)
//found this formula on stackverflow to fix (not my formula)
let frameX = spriteWidth * position;
let frameY = dogAnimations[characterState].loc[position].y;

ctx.drawImage(animationImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);// scaled animation.png down to the  bcanvas heigh :)

// the valus 2-5 determine what area from the riginal animation image will be cut out and the last 4 parameters
// determine where on the canvas we want to place the cut out version of image to
// multiplying by width goes horizontally and multiplying be heigh goes vertically
//changing the numbers gets manually tedious


speedControl++; //increase speed control by 1
requestAnimationFrame(animate);

};
animate();


// so depending on the number of frameY you have to set it to the correct frameX in the if loop
// for example if frame y is 5, the framex in if has to be=4 cuz the 5th frameY has just 5 frames(its a short row)
// again if framey was 4 (longer row) with 10 frames then frameX in if=9.
//REMOVED CODE:
// remember % gives remainder. so 17%5=2. cuz the remainder is 2
// speed contol=0 and slowerframes=5 then 0%5=0(quite literally no remainder lol)
//therefore slowing the animation down by 5 times  or any number. but 0 will stop it from moving
//if (speedControl % slowerFrames == 0){
//if (frameX < 4) frameX++;  //if frame x is less than 7 increase it by 1
//else frameX = 0; //When framex equal or larger than 7 sets it back to 0
//}
//ctx.fillRect(100,50,90,90);
//last 4 arguments below lets me know where i want to draw the copped out image in the destination canavas
//ctx.drawImage(image, sx, sy, sw, sh, dx , dy, dw, dh) //last 4 values here work the same and the last 4 values in the dawImage below(0,0,w,h)and in clearRect 
