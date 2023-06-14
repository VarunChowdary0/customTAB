import './Sign.css'
import { useEffect, useState } from "react"
const SignUp=()=>{

    const [showMenu,setMenu]=useState(false);
    const menuOn=()=>{
      setMenu(true);
    }
    const menuOff=()=>{
      setMenu(false);
      setFlash_2('');
    }
    const hostName='https://backend-api-60pw.onrender.com';
    //const hostName='http://localhost:1800';
    const [signedIN,setsignIN]=useState(JSON.parse(localStorage.getItem("log_Status"))||false);
    const [userLog,setLog_]=useState(false);
    // const [username_1,setUsername_1]=useState(JSON.parse(localStorage.getItem('username_1'))||'');
    // const [password_1,setPass_1]=useState(JSON.parse(localStorage.getItem('password_!'))||'');
    // const [UnqCode_1,setUnqCode_1]=useState(JSON.parse(localStorage.getItem('Unq_!'))||'');
    const [unqCode,setCode]=useState(JSON.parse(localStorage.getItem('MYunqId'))||'');
    const handleUserLog=()=>{
        setLog_(true)
    }
    const handleOffLog=()=>{
        menuOff(false);
        setLog_(false);
    }

    //==
    const sendToAPI_1=(data)=>{
      console.log('fetching..')
      setBuffer_sU(true);
      fetch(`${hostName}/newUser`,
      {
        method:'POST',
        headers :{
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      })
      .then(res=>{
        if(res.ok){
          setFlasher('User Created');
          setBuffer_sU(false);
          setTimeout(()=>setsignIN(true),1500);
        }
        else{
          setFlasher("Unable to process.")
          setBuffer_sU(false);
        }
        return res.json();
      })
      .then(Data=>{
       // console.log(Data);
        setFlasher(Data['message']);
       // console.log('unq:',Data['unqid'])
        GetTheUnq_tab(Data['unqid']);
        setBuffer_sU(false);
       // console.log(Data['message']);
      })
      .catch(err=>{
        console.log("fetch error: ->",err);
        setBuffer_sU(false);
        setFlasher('Server is not responding.. please wait.. , try again after few minutes')
      })
    }
      
    //==
    const [falsher,setFlasher]=useState();
   // const [userInfoObj,setUserObj_]=useState({});
    const runVerify = () => {
        setFlasher('');
        const usrnme_1 = document.querySelector('.inp_user');
        const unqCd_1 = document.querySelector('.inp_unqId');
        const pswd_1 = document.querySelector('.inp_pswd');
        if (usrnme_1.value.trim().length !== 0) {
          if (unqCd_1.value.trim().length >= 5) {
            if (pswd_1.value.trim().length >= 8) {
             // console.log("ok");
              setCode(unqCd_1.value);
              const userDATA={
                username:usrnme_1.value,
                unqid:unqCd_1.value,
                password:pswd_1.value
              };
              setCode(unqCd_1.value);
            //  console.log(unqCd_1);
              localStorage.setItem('MYunqId',JSON.stringify(unqCd_1.value));
              sendToAPI_1(userDATA);
             // console.log(userDATA);
            } else {
              setFlasher("Password too short.");
            }
          } else {
            setFlasher("Unique Code is Short.");
          }
        } else {
          setFlasher('Username is Empty');
        }
      };
      const LogOut=()=>{
        setsignIN(false);
        setCode('');
        setFlasher('');
        setLocalForApps();
        //------------
        localStorage.setItem('MYunqId',JSON.stringify(''));
        localStorage.clear();
      }
      
      useEffect(() => {
        localStorage.setItem("log_Status", JSON.stringify(signedIN));
      }, [signedIN]);
      
  const [backgroundimg,setImg]=useState(JSON.parse(localStorage.getItem("BGIarr"))||"https://images.pexels.com/photos/1612353/pexels-photo-1612353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  const [AppInfo, setAppinfo] = useState(JSON.parse(localStorage.getItem("Myapps"))||[' ']);
  const checkUpdate = () => {
    
    //console.log("app check...");
    if(AppInfo.length!==0)
    {
      const checker_ = JSON.parse(localStorage.getItem("Myapps"),[' ']);
      if (AppInfo.length !== checker_.length) {
        setAppinfo(checker_);
      }
    }
  };
  
  const checkUserStat = () => {
    const newStat = JSON.parse(localStorage.getItem("log_Status"));
    //console.log('checking__',newStat);
    if (newStat !== signINStatus) {
      check_Stat(newStat);
      //console.log(newStat);
    }
  };
  
  const [signINStatus, check_Stat] = useState(JSON.parse(localStorage.getItem("log_Status")));
  
  //console.log(signINStatus);
  
  setInterval(checkUserStat, 5000); 
  setTimeout(checkUpdate, 20000);
  //=====================Tab info API link
  const [cloudIcon,setCloud]=useState(true)
  const [tick_1,setTick]=useState(false);
  const [buffer_3,setBuf_3]=useState(false);
  const [failure,setFail]=useState(false);
  const sendToApi_tab_data=() => {
    setCloud(false);
    setBuf_3(true);
    if(signINStatus){
      if(backgroundimg.trim()!==''){
        fetch(`${hostName}/api`, {// main rout api.
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({'app_data':AppInfo,tab_setting:{'icon_color':'#727272','search_eng':'google','style':'solid','bg_img': JSON.parse(localStorage.getItem("BGIarr"))},'unqid':unqCode})
        })
          .then(res => {
            if (res.ok) {
              console.log("Fetch success", res);
              setBuf_3(false);
              setTick(true);
              setTimeout(()=>{
                setTick(false)
                setCloud(true);
              },2000);
              return res.json(); // Parse response data
            } else {
              setFail(true);
              setTimeout(()=>setFail(false),1500);
              throw new Error('Request failed');
            }
          })
          .then(data => {
           // console.log(data); // Handle response data here
          })
          .catch(err => {
            console.log("Fetch error:", err);
            setFlasher('Server not responding, try again after few minutes')
            setBuf_3(false);
            setFail(true);
            setTimeout(()=>setFail(false),1500);
          });
       }
       else{
        console.log("server connect for Entery of URL only")
       }
    }
  }

  //===== UNQ code validation;
  const [load,setload]=useState(false);
  const [flash_2,setFlash_2]=useState('');
  const takeUnq_id=()=>{
    const givenUnq=document.querySelector(".unq_inp_box");
    if(givenUnq.value.length!==0)
    {
     // console.log(givenUnq);
      GetTheUnq_tab(givenUnq.value);

    }
    else{
      setFlash_2('Empty Code.');
      setTimeout(()=>setFlash_2(''),2000)
    }
  }

  const GetTheUnq_tab=(givenUnq)=>{
    const send_unq_id={'unqid':givenUnq};
    setload(true);
    //console.log(givenUnq);
    fetch(`${hostName}/Send_tabInfo`,
    {
      method : 'POST',
      headers :{
        'Content-Type':'application/JSON'
      },
      body : JSON.stringify(send_unq_id)
    })
    .then(res=>{
     // console.log(res);
      if(res.ok){
        //setload(false);
        setFlash_2('Getting Tab Info..');
        setTimeout(()=>setFlash_2('reloading....'),2000)
        setTimeout(()=>window.location.reload(),500);
      }
      return res.json();
    })
    .then(Data=>{
      const data=Data;
     // console.log('reading:',data);
      if(data.message==='Not found'){
        setload(false);
        setFlash_2('Not found,Please Verify.');
        setTimeout(()=>setFlash_2(''),2000)
      }
      else{
        setload(false);
        setFlash_2('Tab Info Found..');
        const Appdata=(data['Tab Info'][0]['app_data']);
        //console.log(Appdata);
        const backgroundimg__1=(data['Tab Info'][0]['tab_setting']['bg_img'])
        localStorage.setItem('BGIarr',JSON.stringify(backgroundimg__1));
       // console.log(backgroundimg__1);
        localStorage.setItem("Myapps",JSON.stringify(Appdata));
        setTimeout(()=>setFlash_2(''),2000);
        setTimeout(()=>menuOff(),2500);
      }
    })
    .catch(err=>{
      console.log("Fetch Error ->:",err);
      setload(false);
      setFlash_2('Server error , please try later')
    })
  }
  //-----------------
  const [showSignIN,setShowSignIN]=useState(false);
  const ShowSignINpg=()=>{
    setShowSignIN(true);
    setFlasher('');
  }
  const CloseSidgnIN=()=>{
    setShowSignIN(false);
    setFlasher('')
  }
  const runVerify_SignIN=()=>{
      setFlasher('');
          const usrnme_1_SignIN = document.querySelector('.inp_user_SidnIn');
          const pswd_1_SignIN = document.querySelector('.inp_pswd_SidnIn');
          if (usrnme_1_SignIN.value.trim().length !== 0) {
              if (pswd_1_SignIN.value.trim().length >= 8) {
                //console.log("ok");
                const userDATA={
                  username:usrnme_1_SignIN.value,
                  password:pswd_1_SignIN.value
                };
              //  console.log(userDATA);
                RunAuthentication(userDATA);
              } else {
                setFlasher("Password too short.");
              }
          } else {
            setFlasher('Username is Empty');
          }
    }
    const RunAuthentication=(data)=>{
      fetch(`${hostName}/authenticate`,
      {
        method:'POST',
        headers :{
          'Content-Type': 'application/json'
        },
        body : JSON.stringify(data)
      })
      .then(res=>{
        if(res.ok){
          setFlasher('Authentication Successful.');
          setTimeout(()=>setsignIN(true),1500);
        }
        else{
          setFlasher("Not Found , Please check your Credintials.")
        }
        return res.json();
      })
      .then(Data=>{
      //  console.log(Data);
        setFlasher(Data['message']);
        console.log('unq:',Data['unqid']);
        if(Data['message']==='User Found'){
          setCode(Data['unqid']);
          localStorage.setItem('MYunqId',JSON.stringify(Data['unqid']));
        //  console.log(unqCode);
          setCode(Data['unqid']);
          GetTheUnq_tab(Data['unqid'])
          setTimeout(()=>CloseSidgnIN(),2500);
        }
        else{
          console.log(Data['message']);
        }
      })
      .catch(err=>{
        console.log("fetch error: ->",err);
        setFlasher('Server not responding, try again after few minutes');
      })
    }
  //=============================
  window.onload = ()=>{
    if(JSON.parse(localStorage.getItem("Myapps"))===null){

      localStorage.setItem("Myapps",JSON.stringify([
        {
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
      ]));
    }
  }
  const setLocalForApps=()=>{
    localStorage.setItem("Myapps",JSON.stringify([
      {
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
    ]));
  }
  //----------------------- server connectivity;
  
  const [serverStatus, setStatus] = useState(false);
  
  const refresh = () => {
    fetch(`${hostName}/`)
      .then(response => response.json())
      .then(data => {
        if (data['message'] === 'SERVER ONLINE') {
          setStatus(true);
         // console.log(data);
        } else {
          setTimeout(refresh, 5000); // Retry after 5 seconds if server is not online
        }
      })
      .catch(err => {
        console.log("Server not online yet");
        setTimeout(refresh, 5000); // Retry after 5 seconds if an error occurs
      });
  };
  
  useEffect(() => {
    refresh(); // Call refresh function once when the component mounts
  }, []);
  
  const [buffer_signUP,setBuffer_sU]=useState(false)
  // Rest of your component code
  
  //============end===========
    return(
        <>
        <div className="line_4" onClick={handleUserLog}>
            <i className="fa-solid fa-user-plus fa-xl"></i>
        </div>
        {userLog && (signedIN ? <div className='logOutBotton'>
                <div className="backbutton" onClick={handleOffLog}>
                    <i className="fa-solid fa-arrow-left-long haha"></i>
                </div>
                <div className="menu" onClick={menuOn}>
                    <i className="fa-solid fa-ellipsis-vertical fa-xs"></i>
                </div>
          <div>
            <p className='main_butto' onClick={LogOut}>Log Out ??</p>
            <div className='MyUnqID'><p><span>My unique ID : </span>{unqCode}</p></div>
          </div>
          </div>
          
          :
            (
                <div className="signUp_box">
                <div className="backbutton" onClick={handleOffLog}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </div>
                <div className="menu" onClick={menuOn}>
                    <i className="fa-solid fa-ellipsis-vertical fa-xl"></i>
                </div>
                <div className="username_">
                    <input className="inp_box inp_user" type="text" placeholder="Username"  required/>
                    <span className="inp_focus"><i className="fa-solid fa-user-secret"></i>Username</span>
                </div>
                <hr className="hr_1"/>
                <div className="username_">
                    <input className="inp_box inp_unqId" type="text" placeholder="Unique code" />
                    <span className="inp_focus"><i className="fa-solid fa-crosshairs"></i>Unique Code</span>
                </div>
                <hr className="hr_1"/>
                <div className="username_">
                    <input className="inp_box inp_pswd" type="password" placeholder="Password"  />
                    <span className="inp_focus"><i className="fa-solid fa-lock"></i>Password</span>
                </div>
                <hr className="hr_1"/>
                <div className="button_save">
                    {buffer_signUP ? <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>: <button className="but_sve_" onClick={runVerify}>SIGN UP</button>}
                </div>
                < div className='openSignIN'>
                  <p onClick={ShowSignINpg}>Already Have an Account ?</p>
                </div>
                <div className='Flash_log'>{falsher}</div>
            </div>)
        )
    }
     { !userLog &&(
        signedIN &&  <>
          <div className='cloud' onClick={sendToApi_tab_data}>
          {cloudIcon && <i className="fa-solid fa-cloud-arrow-up fa-xl"></i>}
          {buffer_3 && <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>}
          { tick_1 && <i class="fa-solid fa-check fa-bounce fa-xl" style={{color: "#00bd1f"}}></i>}
          {failure && <i class="fa-solid fa-x fa-shake fa-xl" style={{color: "#ff0000"}}></i>}
        </div>
        </>
        )
    }
    {showMenu && <>
      <div className='menuBox'>
        <div className='closeMenu' onClick={menuOff}>
        <i class="fa-solid fa-circle-xmark"></i>
        </div>
        <div className='menu_text'>
          <p>Enter Unique ID</p>
        </div>
        <div className='inp_box_uq'>
          <input className='unq_inp_box' placeholder='Unique Code' type='text'/>
        </div>
        <div className='buffer_1'>
          {load && 
            <div className='loader_1'>
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl"></i>
            </div>
          }
        <p>{flash_2}</p>
        </div>
        <div className='save__but'>
          <button onClick={takeUnq_id}>SAVE</button>
        </div>
      </div>
    </>}
    {showSignIN && <div className="signUp_box">
                <div className="backbutton" onClick={CloseSidgnIN}>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </div>
                <div className="username_">
                    <input className="inp_box inp_user_SidnIn" type="text" placeholder="Username"  required/>
                    <span className="inp_focus"><i className="fa-solid fa-user-secret"></i>Username</span>
                </div>
                <hr className="hr_1"/>
                <div className="username_">
                    <input className="inp_box inp_pswd_SidnIn" type="password" placeholder="Password"  />
                    <span className="inp_focus"><i className="fa-solid fa-lock"></i>Password</span>
                </div>
                <hr className="hr_1"/>
                <div className="button_save">
                    <button className="but_sve_" onClick={runVerify_SignIN}>SIGN IN</button>
                </div>
                <div className='Flash_log'>{falsher}</div>
            </div>}
        </>
    )
}
export default SignUp;