import { useState } from 'react'
import Spinner from "./spinner.jsx";
import "./index.css"
let DEFAULT="ALPHA\nBRAVO\nCHARLIE\nDELTA\nECHO"



function parseChoices(str){
  let choices=[]
  
  
  
  for (let i of str.split(/\s+/)){
    i=i.trim();
    if (i===""){
      continue;
    }
    let index=0
    let star=false;
    let numberStars=0;
    for (let j=0;j<i.length;j+=1){
      if (i[j]==="*"){
        star=true;
        index=j
        numberStars+=1;

      }
      
      
      
    }
    if (numberStars>1){
      continue;
    }
    let number=0;
    if (star){
      
      number=parseInt(i.substring(index+1,i.length))
    
      i=i.substring(0,index);
      for (let k=0;k<number;k+=1){
        choices.push(i)
      }
    } else {
      choices.push(i);
    }
    

    
    
  }
  return choices;
}

function App() {
  
  let [choices,setChoices]=useState(parseChoices(DEFAULT));
  
  function updateChoices(str){
    
    setChoices(parseChoices(str));
    
    
  }
  
 

  return (
    <>
      <div className="side-by-side">
        <div>
          <h2>SPINNER WEBSITE!!!</h2>
          <h4>Made by Eric and Max</h4>
          <label htmlFor="input">Enter your choices here:</label>
          <br></br>
          <textarea id="input" defaultValue={DEFAULT} onChange={(e)=>updateChoices(e.target.value)} rows="10" cols="50"></textarea>
          <p>Separate your choices by pressing the ENTER key.
            
          </p>
          
        </div>
        <Spinner choices={choices} />
      </div>
      
      
      
      
    </>
    
  )
}

export default App
