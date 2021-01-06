import React, {useEffect, useState} from 'react';
import './w3.css'
import Swal from 'sweetalert2';
import './style.css'


function App() {
  const [p1Rating,setP1Rating] = useState(1500);
  const [p2Rating,setP2Rating] = useState(1500);
  const [p1Probability,setP1Probability] = useState('null');
  const [p2Probability,setP2Probability] = useState('null');
  const [p1Win, setP1Win] = useState(0);
  const [p2Win, setP2Win] = useState(0);
  const [p1Loss, setP1Loss] = useState(0);
  const [p2Loss, setP2Loss] = useState(0);

  const k = 32;

  const probability = (r1,r2) =>{
    return 1/(1+Math.pow(10,(r1-r2)/400));
  }
  const checkWin = () =>{
    Swal.fire({
      title:"Select winner",
      icon:'question',
      input:'radio',
      inputOptions:{
        '1':'player 1 win',
        '2':'Player 2 win'
      }
    }).then(result=>{
      if(result.value){
        calculateElorating(result.value);
      }
    })
  }
  const calculateElorating = (winner)=>{
    var pa = probability(p2Rating,p1Rating);
    var pb = probability(p1Rating,p2Rating);
    
    if(winner==='1'){
        let r1 = Math.floor(p1Rating+k*(1-pa));
        let r2 = Math.floor(p2Rating+k*(0-pb));
        setP1Rating(r1);
        setP2Rating(r2);
        setP1Win(prev=>prev+1)
        setP2Loss(prev=>prev+1);
    }else if(winner==='2'){
      let r1 = Math.floor(p1Rating+k*(0-pa));
      let r2 = Math.floor(p2Rating+k*(1-pb));
      setP1Rating(r1);
      setP2Rating(r2);
      setP2Win(prev=>prev+1)
      setP1Loss(prev=>prev+1);
      
    }
    
  }

  const reset = () =>{
    setP1Rating(1500)
    setP2Rating(1500)
    setP1Win(0)
    setP2Win(0)
    setP1Loss(0)
    setP2Loss(0)
  }

  useEffect(()=>{
    setP1Probability(Math.round(probability(p2Rating,p1Rating).toFixed(3)*100))
    setP2Probability(Math.round(probability(p1Rating,p2Rating).toFixed(3)*100));
  },[p1Rating,p2Rating])
  return (
      <div className="animate__animated animate__bounce w3-container w3-card-2 w3-round-xlarge w3-center w3-white w3-margin-top  w3-padding-24" style={{maxWidth:'800px',margin:'auto'}}>
        <h1>Elo Rating Demo</h1>
        <div className="w3-container w3-row-padding w3-padding-large w3-center w3-large" style={{display:'flex'}}>
          
          <div className=" w3-col  w3-margin-bottom" style={{display:'flex',flexDirection:"column"}}>
            <ul className="w3-ul ">
              <li className="w3-red w3-round-xlarge " >Player 1</li>
              <li className="w3-border-bottom"> Rating - {p1Rating} </li> 
              <li className="w3-border-bottom"> Win probability - {p1Probability}%</li>
              <li className="w3-border-bottom"> Win - {p1Win}</li>
              <li className="w3-border-bottom">Loss - {p1Loss}</li>
            </ul>
            
          </div>
          <div className="w3-col w3-margin-bottom" style={{display:'flex',flexDirection:"column"}}>
            <ul className="w3-ul">
              <li className="w3-red w3-round-xlarge">Player 2</li>
              <li className="w3-border-bottom"> Rating - {p2Rating} </li> 
              <li className="w3-border-bottom"> Win probability - {p2Probability}%</li>
              <li className="w3-border-bottom"> Win - {p2Win}</li>
              <li className="w3-border-bottom">Loss - {p2Loss}</li>
            </ul>
          </div>
        </div>
        
        <button 
        className="w3-button w3-margin-right w3-ripple w3-card w3-hover-dark-red w3-round-xlarge w3-red w3-medium" 
        onClick={checkWin}>Calculate Elorating</button>
        <button 
        className="w3-button w3-ripple w3-card w3-hover-dark-red w3-round-xlarge w3-red w3-medium" 
        onClick={reset}>Reset</button>

        <div className="w3-container w3-padding-24 w3-round-xlarge w3-red w3-margin-top" style={{textAlign:"left"}}>
          <p>Constant K = 32</p>
          <p>probability(p1,p2) = 1/(1+Math.pow(10,(rating1-rating2)/100))</p>
          <p>pa = probability(r2,r1) - probability of player 1</p>
          <p>pb = probability(r1,r2) - probability of player 1</p>
          <p>if player 1 wins -<br/> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r1 = Math.floor(p1Rating+k*(1-pa)) - new rating of player 1<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r2 = Math.floor(p2Rating+k*(0-pb)) - new rating of player 2
          </p>
          <p>if player 2 wins -<br/> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r1 = Math.floor(p1Rating+k*(0-pa)) - new rating of player 1<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;r2 = Math.floor(p2Rating+k*(1-pb)) - new rating of player 2
          </p>
        </div>
      </div>
  );
}

export default App;
