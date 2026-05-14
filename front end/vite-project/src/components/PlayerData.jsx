import React,{useState} from "react";
function PlayerData(props){
    const [ready,setReady] = useState(false);

    function HandleNameChange(e){
        if(e.target.value != ''){
            props.playerName.current = e.target.value;
            setReady(true);

        }
        else{
            setReady(false);
        }
    }
    return(
        <p>
            Enter Player Name:
            <input type="text" name="playerName" onChange={HandleNameChange}/>
            <button onClick={props.handleStart} disabled={!ready}>Start</button>
        </p>
    );
}
export default PlayerData; 