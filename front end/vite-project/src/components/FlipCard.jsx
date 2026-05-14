import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
function FlipCard(props){
    const flips = props.config.status;
    const index = props.config.index;
    
    function handleClick(e){
        
        props.config.setStatus(index);
        console.log("element: "+e.target.name+"click is handled.");
    }
    return(
        <ReactCardFlip isFlipped={flips[index]}>
            <img name={props.config.name} title={props.config.title} src = {props.config.frontImage } width={200} height={200}
            onClick={handleClick}/>
            <img name={props.config.name} title={props.config.title} src = {props.config.backImage} width={200} height = {200}
            onClick={handleClick}/>
        </ReactCardFlip>

    );
}
export default FlipCard;