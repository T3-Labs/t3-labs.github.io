const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulesArray;

//get mouse position

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y
    }
);

//create particle 
class Particle{
    constructor(x,y,directionx,directiony,size,color){
        this.x=x;
        this.y=y;
        this.directionx=directionx;
        this.directiony=directiony;
        this.size=size;
        this.color=color;
    }
    // method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ff7035'
        ctx.fill();
    }
    
    update(){
        if(this.x > canvas.width || this.x < 0){
            this.directionx = -this.directionx;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directiony = -this.directiony;
        }
        //check collision detection - mouse position / particle position
        let dx = mouse.x = this.x;
        let dy = mouse.y = this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){
            if(mouse.x < this.x && this.x < canvas.width - this.size){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10
            }
        }
        this.x += this.directionx;
        this.y += this.directiony;
        this.draw();
    }

}

// create particle array

function init(){
    particulesArray = [];
    let numberOfParticles = (canvas.height * canvas.height) / 18000;
    for (let i = 0; i < numberOfParticles; i++){
        let size = 2;
        //let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth -  size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight -  size * 2) - (size * 2)) + size * 2);
        let directionx = (Math.random() * 0.5) - 0.2;
        let directiony = (Math.random() * 0.5) - 0.2;
        let color = '#ff7035';

        particulesArray.push(new Particle(x,y,directionx,directiony,size,color));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for (let i = 0; i < particulesArray.length; i++){
        particulesArray[i].update();
    }
    connect();
} 

function connect(){
    for (let a = 0; a < particulesArray.length; a++){
        for (let b = a; b < particulesArray.length; b++){
            let distance = ((particulesArray[a].x - particulesArray[b].x) * (particulesArray[a].x - particulesArray[b].x)) + ((particulesArray[a].y - particulesArray[b].y) * (particulesArray[a].y - particulesArray[b].y))
            if (distance < (canvas.width/5) * (canvas.height/5)){
               ctx.strokeStyle = '#ff7035';
               ctx.lineWidth = 0.5;
               ctx.beginPath();
               ctx.moveTo(particulesArray[a].x,particulesArray[a].y);
               ctx.lineTo(particulesArray[b].x,particulesArray[b].y);
               ctx.stroke();
            }
        }
    }
}

init();
animate();