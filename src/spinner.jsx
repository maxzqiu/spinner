import { useRef , useEffect, useState } from 'react'
import { Howl } from "howler"
import { emitFireworks } from "./Particle.jsx"

const click=new Howl({src:["Sounds/click.wav"]})



function Spinner({ choices }){
    
    let CHOICES=[...choices,...choices];    
    const COLORS=["red","yellow"];
    let [isSpinning,setIsSpinning]=useState(false);
    const canvasRef=useRef(null);
    const buttonRef=useRef(null);
    //const buttonRef=useRef(null);
    
    
    useEffect(()=>{
        
        console.log(CHOICES)
        let prev_choice="";
        let choice=""
        let prev_ts=performance.now();
        function currentChoice(){
            let simplified=Math.PI-ANGLE%Math.PI;
            return CHOICES[Math.floor(simplified/Math.PI*(CHOICES.length/2))]
        }
        let speed=(Math.random()+1)/10;
        let acceleration=-((Math.random()+1)/10000)
        let ANGLE=Math.PI/3
        const canvas=canvasRef.current;
        const ctx=canvas.getContext("2d");
        const arcLength=2*Math.PI/CHOICES.length;
        let width=canvas.width;
        let height=canvas.height;

       
        canvas.width=width;
        console.log(width);
        console.log(height);
        canvas.height=height;
        console.log(ctx)


        function draw_spinner(){
            //console.log(CHOICES);
            
            
           
            ctx.clearRect(0,0,width,height);
            ctx.save();
            
            // -0.000
            // Ummmm :) or :(
            ctx.translate(width/2,height/2)
            ctx.rotate(ANGLE);
            for (let i=0;i<CHOICES.length;i+=1){
            
                
                ctx.beginPath();
                // Circle
                ctx.beginPath();
                ctx.arc(0,0,width*0.4,i*arcLength,(i+1)*arcLength);
                
                ctx.lineTo(0,0)
                ctx.fillStyle=COLORS[i%2];
                
                ctx.fill();
                // Text
                ctx.font="14px Arial";
                ctx.strokeStyle="black";
                ctx.save();
                
                ctx.rotate((i+0.5)*arcLength)
                ctx.textAlign="center";
                ctx.textBaseLine="middle";
                ctx.strokeText(CHOICES[i],100,0);
    
                
                ctx.restore();
            }
            ctx.restore();
            ctx.beginPath();
            ctx.moveTo(width*0.92,height*0.5);
            ctx.lineTo(width,height*0.54);
            ctx.lineTo(width,height*0.46);
            ctx.lineTo(width*0.92,height*0.5)
            ctx.fillStyle="blue"
            ctx.fill();
            ctx.stroke();


            
        }

        function spin_spinner(ts){

            draw_spinner();
            choice=currentChoice()
            if (isSpinning===false){
                
                return;
            }
            
            let dt=(ts-prev_ts)/10;
            if (CHOICES.length==0){ 
                alert("There's nothing in the spinner! ")
                
                
                return;
            }
    
            //ctx.arc(width/2,height/2,300,0,2*Math.PI)
            
            ANGLE+=speed*dt;
            //console.log(ANGLE);
            speed+=acceleration*dt;
            //console.log(speed);
            //console.log(acceleration);
            
            if (choice!=prev_choice){
                click.play()
            }
            prev_ts=ts
            prev_choice=choice;
            //setIsSpinning(false);
            if (speed>0){
                requestAnimationFrame(spin_spinner)
            } else {
                setIsSpinning(false);
                emitFireworks(ctx, width, height, draw_spinner);
                //alert("The winner is "+choice+"!")
            }
            
            return ()=>cancelAnimationFrame(spin_spinner);
        }
        requestAnimationFrame(spin_spinner);
        
        

        
    },[isSpinning,CHOICES]);
    
    return (
        <>
            <div>
                <canvas className="spinner" ref={canvasRef} width="500" height="500"></canvas>
            
                <button onClick={()=>{
                    setIsSpinning(true);
                }}  >SPIN!</button>
            </div>
            
            
        </>
        
    )
}

export default Spinner;