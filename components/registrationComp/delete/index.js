import { Button, Popconfirm, message } from "antd"
import axios from "../../../axios-orders"; 
import { useEffect } from "react";

const RegDelete = (props) =>{ 
    
    const deleteFunc = () =>{  
        const token = localStorage.getItem("idToken"); 
        axios.delete(`registration/${props.data}.json?&auth=${token}`).then((res)=>{  
          message.success("deleted") 
          props.getRegistrationList();
        }).catch((err)=>{ 
            props.getRegistrationList();
        }) 
    }
    return<div> 
        <Popconfirm title="Sure to delete?" onConfirm={deleteFunc}>
          <Button type="primary" danger>Delete</Button>
        </Popconfirm>
    </div>
}
export default RegDelete