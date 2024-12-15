class Shape{
    draw(){
        throw new Error("Unimplemented draw() for Shape")
    }
}

class Movement extends Shape{
    tick(){
        throw new Error("Unimplemented tick() for Shape")
    }
}

class Square extends Shape{
    constructor(x,y,side){
        const colors=["rgb(26, 188, 156)",
                          "rgb(46, 204, 113)",
                          "rgb(52, 152, 219)",
                          "rgb(155, 89, 182)",
                          "rgb(241, 196, 15)",
                          "rgb(230, 126, 34)",
                          "rgb(231, 76, 60)"
        ]
        this.pos={x:x,y:y};
        this.side=side;
        this.color=colors[Math.floor(Math.random()*colors.length)]
        
        console.log(this.pos)
    }
    draw(ctx){
        
        
        ctx.beginPath()
                
        ctx.save();
        
     
        ctx.strokeStyle=this.color;
        ctx.fillStyle=this.color;
        ctx.rect(this.pos.x,this.pos.y,this.side,this.side)
        ctx.fill();
        ctx.stroke();
        }
}

class Ball extends Shape{
    constructor(x,y,radius){
        super();
        const colors=["rgb(26, 188, 156)",
                          "rgb(46, 204, 113)",
                          "rgb(52, 152, 219)",
                          "rgb(155, 89, 182)",
                          "rgb(241, 196, 15)",
                          "rgb(230, 126, 34)",
                          "rgb(231, 76, 60)"
        ]
        this.pos={
            x:x,y:y
        };
        
        this.radius=radius;
        this.color=colors[Math.floor(Math.random()*colors.length)]
        
        console.log(this.pos)
    }
    draw(ctx){
        
        
        ctx.beginPath()
                
        ctx.save();
        
     
        ctx.strokeStyle=this.color;
        ctx.fillStyle=this.color;
        ctx.arc(this.pos.x,this.pos.y,this.radius,0,2*Math.PI)
        ctx.fill();
        ctx.stroke();
        }
    
    
}

class Linear{
    constructor(shape){
        this.shape=shape;
        //super(x,y,radius,pos)
        let angle=Math.random()*2*Math.PI;
        this.dir={x:Math.cos(angle),y:Math.sin(angle)}
    }
    draw(ctx){
        this.shape.draw(ctx);
    }
    tick(dt){
        this.shape.pos.x+=dt*this.dir.x/25;
        this.shape.pos.y+=dt*this.dir.y/25;
    
        this.shape.radius-=dt*0.01
        
    
        
        return this.shape.radius>0;
    }
}

class Firework extends Linear{
    constructor(shape){
        super(shape);
        let angle=Math.random()*1/4*Math.PI+3/8*Math.PI;
        this.dir={x:9*Math.cos(angle),y:-9*Math.sin(angle)};
    }
}
class FireworkBall extends Firework{
    constructor(x,y,radius){
        super(new Ball(x,y,radius))
    }
}
class Bouncing{
    constructor(shape){
        this.shape=shape;
        //super(x,y,radius,pos)
        let angle=Math.random()*2*Math.PI;
        this.vel={x:5*Math.cos(angle),y:5*Math.sin(angle)}
        if (this.vel.y>0){
            this.vel.y*=(-1);
        }
    }
    draw(ctx){
        this.shape.draw(ctx);
    }
    tick(dt){
        // Velocity is change in position over time
        // 
        this.shape.pos.x+=dt*this.vel.x/25;
        this.shape.pos.y+=dt*this.vel.y/25;

        this.vel.y+=dt*0.005;
        if (this.shape.pos.y>window.innerHeight && this.vel.y>0){
            this.vel.y*=-0.7;
        }
        this.shape.radius-=dt*0.003
        
    
        
        return this.shape.radius>0;
    }
}

class FireworkParticle extends Bouncing{
    constructor(shape){
        super(shape);
        let angle=Math.random()*2*Math.PI;
        let speed=Math.random()*4+1
        this.vel={x:speed*Math.cos(angle),y:speed*Math.sin(angle)};

    }
}

class FireworkParticleBall extends FireworkParticle{
    constructor(x,y,radius){
        super(new Ball(x,y,radius));
    }
}

class BouncingBall extends Bouncing{
    constructor(x,y,radius){
        super(new Ball(x,y,radius));
    }
}

class LinearBall extends Linear{
    constructor(x,y,radius){
        super(new Ball(x,y,radius))
    }
}

class LinearSquare extends Linear{
    constructor(x,y,side){
        super(new Square(x,y,side))
    }
}

class RandomWalk{
    constructor(shape){
        this.shape=shape;
        this.randomizeDirection();
        this.id=setInterval(()=>this.randomizeDirection(),1000)
        
        //super(x,y,radius,pos)
        
    }
    randomizeDirection(){
        this.angle=Math.random()*2*Math.PI;
        this.dir={x:Math.cos(this.angle),y:Math.sin(this.angle)}
    }
    draw(ctx){
        this.shape.draw(ctx);
    }
    tick(dt){
        this.shape.pos.x+=dt*this.dir.x/16;
        this.shape.pos.y+=dt*this.dir.y/16;
        this.shape.radius-=dt*0.05/16
        this.angle+=1/2
        if (this.angle===2){
            this.angle=0;
        }
        if (this.shape.radius<=0){  // :)
            clearInterval(this.id)
        }
        return this.shape.radius>0
   }
}

class RandomWalkBall extends RandomWalk{
    constructor(x,y,radius){
        super(new Ball (x,y,radius))
    }
}

class RandomWalkSquare extends RandomWalk{
    constructor(x,y,side){
        super(new Square (x,y,side))
    }
}





export function emitFireworks(ctx, width, height, draw_spinner){
    
    let objects=[new FireworkBall(width/2,height,10)];
    // ctx.globalCompositeOperation="lighter"
    // canvas.style.backgroundColor="#222"
    ctx.fillStyle="red"
    ctx.fillRect(100,100,200,200)
    
    ctx.stroke()
    let start_ts=performance.now();
    let prev_ts= performance.now();
    // ctx.beginPath();
    // ctx.rect(100,100,50,50);
    // ctx.stroke();
    function loop(timestamp){
        console.log(timestamp,prev_ts);
        let random1=(Math.random()+1)*1000;
        console.log(random1);
    
        let random2=(Math.random()+2)*1000;
        console.log(random2);
        if (timestamp>random1+start_ts && prev_ts<random1+start_ts){
            objects=[...objects,new FireworkBall(width/2,height,10)]
        }
        if (timestamp>random2+start_ts && prev_ts<random2+start_ts){
            objects=[...objects,new FireworkBall(width/2,height,10)]
        }
        let dt=timestamp-prev_ts
        prev_ts=timestamp
        
        let kept=[]

        draw_spinner();
        
            for (let obj of objects){
                //let rand=Math.floor(Math.random())
                obj.draw(ctx);
                //obj.dir={x:obj.dir.x+rand,y:obj.dir.y+rand}
                let keep=obj.tick(dt);
                if (keep){
                    kept.push(obj)
                } else if (obj instanceof FireworkBall){
                    for (let i=0;i<300;i+=1){
                        let ball=new FireworkParticleBall(obj.shape.pos.x,obj.shape.pos.y,5)
                        kept.push(ball)
                    }
                    
                }
                
            }
            objects=kept

        
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    
    
    
    
    



    // canvas.addEventListener("mousemove",(e)=>{

    //     const rect=canvas.getBoundingClientRect()
    //     let x=e.clientX-rect.left
    //     let y=e.clientY-rect.top
    //     let ball=new BouncingBall(x,y,10)
    //     objects.push(ball)
    //  //   ball.draw(ctx)
    
                
    // })

    // canvas.addEventListener("click",(e)=>{
    //     const rect=canvas.getBoundingClientRect()
    //     let x=e.clientX-rect.left
    //     let y=e.clientY-rect.top
    //     let ball=new FireworkBall(x,y,10)
    //     objects.push(ball)
    //  //   ball.draw(ctx)
    // })


    
    
}


