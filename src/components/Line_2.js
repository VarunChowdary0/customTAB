import { useState } from "react"
import "./Top_1.css"
const Time=()=>{
    const [hours,setHours]=useState(new Date().toLocaleTimeString([], { hour12: true }));
    const currentTime=()=>{
        setHours(new Date().toLocaleTimeString([], { hour12: true }));
    }
    setTimeout(currentTime,1000);
    return(
        <>
            <div className="Line_2">
                <h1 onClick={currentTime}>{hours} </h1>
            </div>
        </>
    )
}
export default Time;