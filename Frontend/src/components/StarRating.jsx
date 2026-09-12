import { useEffect } from "react";
import { useState } from "react";
import { IoMdStarOutline } from "react-icons/io";
import { IoStar } from "react-icons/io5";

const StarRating = ({readOnly,starCount=0,onRateChange,size=20}) =>{
    const totalStars = 5;
    const onRate = (starValue) =>{
        setSelected(starValue)
        onRateChange && onRateChange(starValue) 
       
    }
    
    const [hover,setHover] =  useState(null);
    const [selected,setSelected] = useState(starCount);
    useEffect(() => {
        setSelected(starCount);
    }, [starCount]);
    let displayValue;
     if(selected === 0){
        displayValue = hover;
     }
     else{
        displayValue = selected;
     }
    
    return(
        <div>
           {Array.from({length:totalStars},(_,i)=>{
            
            return (
                <span
                key={i}
                onClick={()=>{
                    !readOnly && onRate(i+1)
                }}
                onMouseEnter={()=>{!readOnly && setHover(i+1)}}
                onMouseLeave={()=>{!readOnly && setHover(null)}}
                >
                    {i<displayValue?<IoStar className="star-active" size={size}/>:<IoMdStarOutline className="star" size={size}/>
}
                </span>
            )
           })}
        </div>
    )
}

export default StarRating;