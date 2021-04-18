var snakeBody={
    width:20,
    height:20
}

var food={
    x:100,
    y:100,
    width:10,
    height:10
}
var oneGameLife;
var snakeList,direction,score=0;
var width=500,height=500;
var running=false;
var screen=document.getElementById("screen").getContext('2d');
screen.fillStyle='brown';


document.getElementById("screen").onmousedown=function(){
    if(running)
    {
        clearInterval(oneGameLife);
        running=false;
    }   
    startgame();
}

document.onkeydown=function(event){
    if(event.keyCode==37 && direction!=2)
    {
        direction=0;
        console.log(event.keyCode);
    }
    else if(event.keyCode==38 && direction!=3)
    {
        direction=1;
        console.log(event.keyCode);

    }
    else if(event.keyCode==39 && direction!=0)
    {
        direction=2;
        console.log(event.keyCode);
    }
    else if(event.keyCode==40 && direction!=1)
    {
        direction=3;
        console.log(event.keyCode);
    }
}
snakeListChange= function(){
    for(let i=snakeList.length-1;i>=0;i--)
    {
        if(direction==0)
        {
            if(i==0)
            {
                snakeList[0].x=snakeList[0].x-10;
            }
            else{
            snakeList[i].x=snakeList[i-1].x;
            snakeList[i].y=snakeList[i-1].y;
            }
        }
        else  if(direction==1)
        {
            if(i==0)
            {
                snakeList[0].y=snakeList[0].y-10;
            }
            else{
                snakeList[i].x=snakeList[i-1].x;
                snakeList[i].y=snakeList[i-1].y;
                }
        }
        else if(direction==2)
        {
            if(i==0)
            {
                snakeList[0].x=snakeList[0].x+10;
            }
            else{
                snakeList[i].x=snakeList[i-1].x;
                snakeList[i].y=snakeList[i-1].y;
                }
        }
        else if(direction==3)
        {
            if(i==0)
            {
                snakeList[0].y=snakeList[0].y+10;
            }
            else{
                snakeList[i].x=snakeList[i-1].x;
                snakeList[i].y=snakeList[i-1].y;
                }
        }
    }
}

boundarySnakePosition= function(){
    if(snakeList[0].x>500)
    {
        snakeList[0].x=0;
    }
    else if(snakeList[0].x<0)
    {
        snakeList[0].x=499;
    }
    else if(snakeList[0].y>500)
    {
        snakeList[0].y=0;
    }
    else if(snakeList[0].y<0)
    {
        snakeList[0].y=499;
    }
}

drawsnake= function(sb,i){
    screen.save();
    if(i==0)
    {
        screen.fillStyle='black';
    }
        screen.fillRect(sb.x,sb.y,snakeBody.width,snakeBody.height);
    screen.restore();
}

drawfood= function(){

    let x= Math.random()*485+5;
    let y= Math.random()*485+5;

    food.x=x;
    food.y=y;

    screen.fillRect(food.x,food.y,food.width,food.height);

}

foodeaten= function()
{
    return (snakeList[0].y<=food.y+food.height &&
            food.y<=snakeList[0].y+snakeBody.height &&
            snakeList[0].x<=food.x+food.width &&
            food.x<=snakeList[0].x+snakeBody.width)
}

isCollision=function(snake1,snake2)
{
    return ((Math.abs(snake1.x-snake2.x)<5)
            && (Math.abs(snake1.y-snake2.y)<5))
}


increasesnake= function(){
    let len=snakeList.length;
    let new_x,new_y;
    if(direction==0)
    {
        new_x=snakeList[len-1].x+5;
        new_y=snakeList[len-1].y;
    }
    else if(direction==1)
    {
        new_x=snakeList[len-1].x;
        new_y=snakeList[len-1].y+5;
    }
    else if(direction==2)
    {
        new_x=snakeList[len-1].x-5;
        new_y=snakeList[len-1].y;
    }
    else if(direction==3)
    {
        new_x=snakeList[len-1].x;
        new_y=snakeList[len-1].y-5;
    }
    snakeList.push({x:new_x,y:new_y})
}

commonupdate= function(){
    screen.clearRect(0,0,width,height);
    boundarySnakePosition();
    snakeList.forEach(drawsnake);
    snakeListChange();

        if(foodeaten())
        {
            score++;
            drawfood();
            increasesnake();
        }
        else
        {
            screen.fillRect(food.x,food.y,food.width,food.height);
        }
    screen.fillText('Score: '+score,400,30)
    gameover();
}

gameover= function(){
    let len=snakeList.length;
    for(let i=1;i<len;i++)
    {
        if(isCollision(snakeList[0],snakeList[i]))
        {
            screen.save();
            screen.fillStyle='green';
            screen.fillText("GAME OVER",250,250);
            clearInterval(oneGameLife);
            screen.restore();
        }
    }
}

startgame= function(){
    // Defining snakeList
    snakeList=[
        {x:220,y:200},
        {x:210,y:200},
        {x:200,y:200},
    ]
    running=true;
    score=0;
    oneGameLife=setInterval(commonupdate,30);
}
startgame();
