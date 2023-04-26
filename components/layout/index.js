import { Button, Spin } from "antd";
import axios from "../../axios-orders";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import css from "./style.module.css";
const BaseLayout = (props) =>{  
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [localId, setLocalId] = useState(false);
    useEffect(()=>{
        setTimeout(()=>{
            const localId = localStorage.getItem("localId");
            if(localId){
                setLoading(false);
                setLocalId(true)
                refreshToken();
            }else{
                setLoading(false);
            } 
            
        },800) 
    },[])
    const refreshToken = async () =>{
        const expireDate = new Date(localStorage.getItem("expireDate"));
        if(expireDate > new Date()){
            const expIn = expireDate.getTime() - new Date().getTime(); 
            await setTimeout(()=>{ 
                router.push("/");
            },expIn)
        } else {
            const body = {
                grant_type: "refresh_token",
                refresh_token: localStorage.getItem("refreshToken")
            }
            axios.post("https://securetoken.googleapis.com/v1/token?key=AIzaSyAA_wX14i2xQr-owSd7-iAxcp4J3qRdgMI", body).then((res)=>{ 
                const expIn =  res.data.expires_in; 
                const expireDate = new Date(new Date().getTime() + parseInt(expIn) * 1000); 
                localStorage.setItem("idToken",  res.data.id_token)
                localStorage.setItem("localId",  res.data.user_id) 
                localStorage.setItem("expireDate", expireDate)
                localStorage.setItem("refreshToken",  res.data.refresh_token) 
                router.push("/");
            }).catch((err)=>{
                console.log("err", err)
            })
        }
    }
    const logOut = () =>{
        localStorage.removeItem("localId");
        localStorage.removeItem("idToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expireDate");
        router.push("/");
    }
 
    return <div> 
        {loading ? <Spin /> : 
            <div>  
                <div style={{display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px"}}> 
                    {localId ? 
                    <div className={css.Menu}> 
                        <Button onClick={()=>router.push("/")}>Home</Button> 
                        <Button onClick={()=>router.push("/registration")}>Registration</Button> 
                        <Button onClick={logOut}>Log Out</Button>
                    </div>
                    : 
                    <>     
                        <Button onClick={()=>router.push("/")}>Home</Button>
                        <Button onClick={()=>router.push("/login")}>Sign in</Button>
                        <Button onClick={()=>router.push("/sign-up")}>Sign up</Button>
                    </>
                    }
                </div>
                {props.children} 
            </div>
        }   
    </div>
}
export default BaseLayout;