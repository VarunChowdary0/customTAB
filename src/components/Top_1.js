import React from 'react'
import { useState } from 'react'
import "./Top_1.css"
import "./setting.css"

const Top_1 = () => {
  const [searchKey,setKey]=useState("");
  const handleSearch=e=>{
    setKey(e.target.value);
  }
  const [iconColor,setColor]=useState(JSON.parse(localStorage.getItem("iconColor")),"#ffffff");
  const [tempColor,setTempC]=useState("#ffffff");
  const handleColor=(e)=>{
    setTempC(e.target.value)
    setColor(tempColor);
    localStorage.setItem("iconColor",JSON.stringify(tempColor));
  }
  const [settingBox,showSet]=useState(false)
  const [EngineIndex,setEngine]=useState(1)
  const searchEngines=["https://www.bing.com/search?q=","https://www.google.com/search?q=","https://in.search.yahoo.com/search?p","https://www.info.com/serp?q=$","https://duckduckgo.com/?q=$","https://duckduckgo.com/?q=$"]
  const search=()=>{
    const searchWord=`${searchEngines[eval(`${EngineIndex}`)]}${encodeURIComponent(searchKey)}`;
    if(searchKey.trim().length>0){
        setKey("");
        window.open(searchWord,"_blank")
      } 
  }
  const check=(eve)=>{
      if(searchKey.trim().length>0){
        if(eve.key==="Enter"){
          search();
      }
    }
  }
  const [backgroundimg,setImg]=useState(JSON.parse(localStorage.getItem("BGIarr"))||["https://images.pexels.com/photos/1612353/pexels-photo-1612353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]);
  const [newBGI,setBGI]=useState("");
  const displaySettings=()=>{
    showSet(true);
  }
  const closeSettings=()=>{
    showSet(false);
  }

  const handleURL=(e)=>{
    setBGI(e.target.value);
  }

  const setImage=()=>{
    console.log(newBGI,backgroundimg)
    if(newBGI.trim()!==""){
      const updatedBGI=[...backgroundimg, newBGI];
      setImg(updatedBGI);
      console.log(updatedBGI);
      localStorage.setItem("BGIarr",JSON.stringify(updatedBGI));
      setBGI("")
    }
    else{
      console.log("Url Empty")
    }
  }
 const reload=()=>{
  window.location.reload();
 }

  return(
    <>
    <div className='background'
      style={{backgroundImage:`url(${backgroundimg[backgroundimg.length-1]})`}}
    ></div>
      <div className='line_1'>
        <p>Search</p>
        <i className="fa-solid fa-magnifying-glass fa-xl"></i>
        <input className='searchBar' type='text' placeholder="What's on your mind ?" value={searchKey} name='searchKey' onChange={handleSearch} onKeyDown={(event) => check(event)}  />
        <i className={searchKey.length>0 ? "fa-solid fa-paper-plane fa-xl send_":""} onClick={search}></i>
        <div className='spacer1'></div>
        <div className='settingBlock'>
          <i className="fa-solid fa-gear fa-xl" onClick={()=>displaySettings()}></i>
        </div>


        {settingBox && (
              <div className="settingBox">
              <div className="lines_">
                  <p className='urlHow'>background image</p>
                  <input className="inputURlbg" type="url" placeholder="Enter url of image" value={newBGI} name='newBGI' onChange={handleURL}/>
                  <div className="tick_box" onClick={setImage}><i className="fa-solid fa-check fa-xl"></i></div>
                  <div className='how'>
                    <p>
                    Open a Photo Explorer like
                     <span><a href='https://www.pexels.com/search/4k%20wallpaper/' target='_blank'>www.pexels.com</a>
                  select the Image , </span> 
                  Open image in a new tab by 
                  right click and selecting the
                   'open image in new tab'
                    </p>
                   
                  </div>
              </div>
              <div className="lines_">
                  <p>Search engine</p>
                  <select className="searchEngs" name="" id="" defaultValue="Yahoo">
                      <option value="1">Google</option>
                      <option value="0">Bing</option>
                      <option value="4">DuckDuckGo</option>
                      <option value="3">Info.com</option>
                      <option value="2">Yahoo</option>
                  </select>
                  <p>Current search Engine</p>
                  <div className="defSeE">Google</div>
              </div>
              <div className="lines_ Picker">
                  <p>Color of ICONS</p>
                  <input type="color" name="iconColor" value={iconColor} onChange={handleColor}/>
                  <div className="tick_box" onClick={reload}><i className="fa-solid fa-check fa-xl"></i></div>
              </div>
              <div className='lines_'>
                <p>Icon Style</p>
                <select className='searchEngs'>
                  <option value={"solid"}>Solid</option>
                  <option value={"light"}>Light</option>
                  <option value={"regular"}>regular</option>
                  <option value={"thin"}>thin</option>
                  <option value={"sharp"}>sharp</option>
                </select>
              </div>
              <div className='lines_'>
                <p>Set this as custom Home </p>
                <a href='https://www.pcmag.com/how-to/how-to-make-google-your-homepage' className='setCustom'> how ?</a>
                <div className='setDef_box'>
                      <p>step 1: open settings</p>
                      <p>step 2: Select Apperence</p>
                      <p>step 3: Turn or "show home button"</p>
                      <p>step 4: Add this page link</p>
                      <p><span>How to use ? </span>: Click on home botton on any page to convert it</p>
                </div>
              </div>
              <div className="bott_m">
                  <button className="close" onClick={()=>closeSettings()}>Done</button>
              </div>
          </div>
        )}


      </div>
    </>
  )
}

export default Top_1;