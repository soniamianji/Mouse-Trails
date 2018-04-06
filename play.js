var canvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;


var mouse = {
    x : undefined,
    y : undefined,
    maxRadius : 30,
    color : getRandomColor(),
    opacity : 2
}

window.addEventListener("mousemove",function(event){
    mouse.x = event.x;
   mouse.y= event.y;
   
});

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function draw(){
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, mouse.maxRadius,0,Math.PI*2,true);
    ctx.fillStyle = mouse.color;
    ctx.fill();
}


var positions =[];
var motionTrailLength = 20;

function storeLastPos (){
    positions.push({
        x: mouse.x,
        y : mouse.y,
    });
    if (positions.length > motionTrailLength){
        positions.shift();
    }
   
}
function makeMore(){
    for (var i = 0; i < positions.length; i++){
        var randRadius = Math.random() * 30;
        ctx.beginPath();
        ctx.arc(positions[i].x, positions[i].y,randRadius,0,Math.PI*2,true);
        //ctx.globalAlpha =i/20;
        ctx.fillStyle = "rgba(0,255,0,"+ i/20 +")"//mouse.color;
        ctx.fill();
       ctx.stroke();
        }
}

function update(){
    requestAnimationFrame(update);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    storeLastPos(mouse.x, mouse.y);
    makeMore();
    //draw();
}


update();