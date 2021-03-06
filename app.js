//Variables --------------------------------------------------------------
//Variables of canvas and ball
var can = document.getElementById("game");
var context = can.getContext("2d");
var x = can.width / 2;
var y = can.height - 40;
var dx = 2;
var dy = -2;
var radius = 15 ;

//Variables of the plate
var plateWidth = 80;
var plateHeigth = 20;
var plateX = (can.width - plateWidth) / 2;
var plateY = can.height - plateHeigth;
var plateDx = 5; //Speed for Plate-Movement

//Variables for movement
var pressRight;
var pressLeft;
var right = 39;
var left = 37;

//Variable for target
var targetX;
var targetY;
var targetPedding = 15;
var targetWidth = plateWidth;
var targetHeight = plateHeigth;
var targetRow = 3;
var targetCol = 5;
var targets = [];
var targetCount = targetRow * targetCol;

for(var i = 0; i<targetCol;i++){
    targets[i] = [];
    for(var j = 0; j<targetRow; j++){
        targets[i][j] = {x: 0, y: 0, status: 1};
    }
}


//Functions --------------------------------------------------------------
//Draw the ball
function drawBall() {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = "#eee";
    context.fill();
    context.closePath();
}

//Draw the plate
function drawPlate(){
    context.beginPath();
    context.rect(plateX, plateY, plateWidth, plateHeigth);
    context.fillStyle = "#aaa";
    context.fill();
    context.closePath();
}

//Draw the target-plates
function drawTargets(){
    for(var i = 0; i<targets.length; i++){
        for(var j = 0; j<targets[i].length; j++){
            if(targets[i][j].status === 1){
                //Size of Targets
                targetX = (i*(targetWidth+targetPedding))+30;
                targetY = (j*(targetHeight+targetPedding))+30;
                targets[i][j].x = targetX;
                targets[i][j].y = targetY;
                //Draw Targets
                context.beginPath();
                context.rect(targets[i][j].x, targets[i][j].y, targetWidth, targetHeight);
                context.fillStyle = "#aaa";
                context.fill();
                context.closePath();
            }
        }
    }
}

//Check collision with target
function collision(){
    for(var i = 0; i<targetCol; i++){
        for(var j = 0; j<targetRow; j++){
            var tar_help = targets[i][j];
            if(tar_help.status === 1 &&
               x > tar_help.x &&
               x < tar_help.x + targetWidth &&
               y > tar_help.y &&
               y < tar_help.y + targetHeight)
            {
                dy = -dy;
                targets[i][j].status = 0;
				targetCount-=1;
            }
        }
    }
}

//Key-Handler
function keyPressedHandler(event){
    if(event.keyCode == right) {
       pressRight = true;
    }else if(event.keyCode == left) {
       pressLeft = true;
    }
}
function keyReleasedHandler(event){
    if(event.keyCode == right) {
       pressRight = false;
    }else if(event.keyCode == left) {
       pressLeft = false;
    }
}


document.addEventListener('keydown', keyPressedHandler, false);
document.addEventListener('keyup', keyReleasedHandler, false);


//Game Loop --------------------------------------------------------------
function loop() {
    context.clearRect(0, 0, can.width, can.height);

    //Implement functions
    drawBall();
    drawPlate();
    drawTargets();
    collision(); //Collision Detection for targets

	//console.log(targetCount);

	//Draw text
    context.font = "20px Helvetica"
    context.fontStyle = "aaa";
    context.fillText("Hallo", 10, 10);

	//Collision Detection Frame
    if (x + dx > can.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy < radius || (y + dy > can.height - plateHeigth - radius &&
						   x + dx > plateX &&
						   x + dx < plateX + plateWidth))
	{
	   dy = -dy;
	}else if(y + dy > can.height){
        alert('NEUSTART');
        location.reload();
    }

	//Reload if all targets have been destroyed
	if(targetCount == 0){
		alert('ALLE GETROFFEN');
		location.reload();
	}




    //Movement right
    if(pressRight && plateX < can.width - plateWidth){
       plateX += plateDx;
    }

    //Movement left
    if(pressLeft && plateX > 0){
        plateX -= plateDx;
    }



	//Move the ball
    x += dx;
    y += dy;
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
