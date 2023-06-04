import { useState } from "react";
import "./Top_1.css"
const MyApps=()=>{
    const [appArr,addApp]=useState(JSON.parse(localStorage.getItem("Myapps"))||[{
        appName:"youtube",
        appLink:"https://www.youtube.com/",
        appTilte:"youtube"
         },
         {
            appName:'g',
            appLink:"https://mail.google.com/",
            appTilte:"Gmail"
         },
         {
            appName:'m',
            appLink:'https://www.google.com/maps/',
            appTilte:'Maps'
         },
         {
            appName:"google-drive",
            appLink:'https://drive.google.com/',
            appTilte:"Drive"
         }
        ])
    const [IconColor,setColor]=useState(JSON.parse(localStorage.getItem("iconColor"))||"#ffffff");
    const [Editor,DisplayEditor]=useState(false);
    // const [selectedIndex,setIndex]=useState(-1);
    const [appName,setApp]=useState();
    const [appLink,setLink]=useState();
    const [appTilte,setTitle]=useState();
    const handleName=(e)=>{
        setApp(e.target.value);
    }
    const handleLink=(e)=>{
        setLink(e.target.value);
    }
    const handleTitle=(e)=>(
        setTitle(e.target.value)
    )
    const showEditor=(i)=>{
        console.log(i)
        setApp();
        setLink();
        setTitle();
        DisplayEditor(true)
        if(i<appArr.length){
            console.log("Under Development")
        }
        else{
            console.log("New one");
        }
        }
    const newApp=()=>{
        const AppObj={
            appName:appName,
            appLink:appLink,
            appTilte:appTilte
        }
        if(appName!==undefined && appLink!==undefined && appTilte!==undefined)
        {
            if(appName.trim().length!==0)
            {
                const newArr=[...appArr,AppObj];
                addApp(newArr);
                localStorage.setItem("Myapps",JSON.stringify(newArr));
                cancleEditor();
            }
            else{
                console.log("empty");
            }
        }
        
    }
    const cancleEditor=()=>{
        DisplayEditor(false)
    }
    const deleteApp=(i)=>{
        console.log(appArr[i]);
        const newArr = appArr.filter((_, index) => index !== i);;
        addApp(newArr);
        console.log(newArr,appArr)
        localStorage.setItem("Myapps",JSON.stringify(newArr));
    }

    return(
        <>
            <div className="line_3">
                <div className="AppBox">
                        {appArr.map((ele,index)=>(
                            <div className="app" key={index}>
                                <div className="edit_" >
                                    <i className="fa-solid fa-xmark del" onClick={()=>deleteApp(index)}></i>
                                </div>
                                    <a href={ele.appLink} target="_blank">
                                        <div className="logo">
                                            {/* <i className={`fa-solid fa-brands fa-${ele.appName} fa-2xl`} style={{color:IconColor}}></i> */}
                                            <img src={`${ele.appLink}favicon.ico`} alt={ele.appName[0].toUpperCase() } placeholderText="Image Not Available" />
                                            
                                        </div>
                                        <div className="appName" style={{color:IconColor}}>{ele.appTilte}</div>
                                    </a>
                            </div>
                        ))}
                        <div className="app addnew" onClick={()=>showEditor(appArr.length)}>
                        <i className="fa-solid fa-plus fa-2xl"></i>
                        </div>
                </div>

            </div>                 
        {
            Editor && (
                <div className="editor_main">
                    <div className="editor_box">
                            <div className="cancel">
                            <i class="fa-solid fa-xmark fa-xl" onClick={cancleEditor}></i>
                            </div>
                            <input type="text" name="appName" placeholder="Name of page (if logo failed to appear give title as first letter of the Website)" value={appName} onChange={handleName}/>
                            <input type="text" name="appLink" placeholder="URL" value={appLink} onChange={handleLink}/>
                            <input type="text" name="appTitle" placeholder="Title ( To appear in App Box)" value={appTilte} onChange={handleTitle}/>
                    </div>
                   <div className="buttons_"> 
                        <button className="saveButton" onClick={newApp}>SAVE</button>
                    </div>
                </div> 
            )
        }
        </>
    )
}
export default MyApps;