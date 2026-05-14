import Header from "../components/Header"
import FlipCard from "../components/FlipCard";
import {useRef,useState} from "react"; 
import "./MatchCardsGame.css";
import PlayerData from "../components/PlayerData";

// ✅ added
import axios from "axios";

function MatchCardsGame(){
  
  const [flips,setFlips] = useState([false,false,false,false]);
 
  const cards = [
    {index:0,title:'0',name: 'monkey',frontImage: 'card1.jpg',backImage: 'monkey.jpg',status:flips,setStatus:UpdateEngine},
    {index:1,title:'1',name: 'pig',frontImage: 'card1.jpg',backImage: 'pig.jpg',status:flips,setStatus:UpdateEngine},
    {index:2,title:'2',name: 'monkey',frontImage: 'card1.jpg',backImage: 'monkey.jpg',status:flips,setStatus:UpdateEngine},
    {index:3,title:'3',name: 'pig',frontImage: 'card1.jpg',backImage: 'pig.jpg',status:flips,setStatus:UpdateEngine}
  ]; 
  const playerName = useRef("");
  const [gameStarted,setGameStarted] = useState(false);
  const state = useRef(0);
  const lastFlipCardIndex = useRef(null);
  const [startTime,setStartTime] = useState(null);
  const [endTime,setEndTime] = useState(null);
  const intervalRef = useRef(null);
  const results = useRef([]);

  function UpdateEngine(idx){
    UpdateFlips(idx);
    console.log("state = "+state.current);
    switch(state.current){
      case 0:
        lastFlipCardIndex.current = idx;
        state.current =1;
        break;
      case 1:
        if(cards[idx]['name'] == cards[lastFlipCardIndex.current]['name']){
          state.current = 2;
        }
        else{
          state.current = 0;
          setTimeout(ResetFlipCards,2000,lastFlipCardIndex.current,idx);
        }
        lastFlipCardIndex.current = null;
        break;
      case 2:
        state.current = 3;
        break;
      case 3: default:
        clearInterval(intervalRef.current);
        setTimeout(HandleGameComplete,2000);
        break;
    }
  }

  function UpdateFlips(idx){
    var flipsCopy = Array.from(flips);
    flipsCopy[idx] = !flips[idx];
    console.log(flipsCopy);
    setFlips(flipsCopy);
  }

  function HandleStartButton(){
    console.log("Game is started by "+ playerName.current);
    setGameStarted(true);
    setStartTime(Date.now());
    intervalRef.current = setInterval(HandleInterval,100);
  }

  function ResetFlipCards(idx1,idx2){
    var flipsCopy = Array.from(flips);
    flipsCopy[idx1] = false;
    flipsCopy[idx2] = false;
    console.log(flipsCopy);
    setFlips(flipsCopy);
  }

  function HandleGameComplete(){
    const timeTaken = ((endTime - startTime)/1000).toFixed(1);
    console.log("Game completed, well done " + playerName.current + ". You took " + timeTaken + " s");
    
    results.current.push({playerName: playerName, timeTaken: timeTaken});
    console.log(results.current);

   
    axios.get("http://localhost:8000/NewScore", {
      params: {
        player: playerName.current,
        time: timeTaken
      }
    })
    .then(res => console.log("✅ Score submitted:", res.data))
    .finally(err => console.error("❌ Error submitting score:", err));

    setFlips([false,false,false,false]);
    state.current = 0;
    lastFlipCardIndex.current = null;
    setGameStarted(false);
  }

  function HandleInterval(){
    setEndTime(Date.now());
  }

  return (
    <div>
      <Header />
      {!gameStarted && <PlayerData playerName={playerName} handleStart={HandleStartButton}/>}

      {gameStarted && <div className='deckColumn'>
        <p>Time: {((endTime - startTime)/1000).toFixed(1)}</p>
        <div className='deckRow'>
          <FlipCard config={cards[0]}/>
          <FlipCard config={cards[1]}/>
        </div>
        <div className='deckRow'>
          <FlipCard config={cards[2]}/>
          <FlipCard config={cards[3]}/> 
        </div>
      </div>}

      {flips[0]&& <p> card 0 is flipped</p>}
      {flips[1] && <p> card 1 is flipped</p>}
      {flips[2] && <p> card 2 is flipped</p>}
      {flips[3] && <p> card 3 is flipped</p>}
    </div>
  )
}
export default MatchCardsGame;