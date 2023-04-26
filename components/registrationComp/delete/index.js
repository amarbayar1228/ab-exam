import { Button, Popconfirm, message } from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import axios from "../../../axios-orders";  

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
          <Button type="primary" size="small" icon={<DeleteOutlined />} danger></Button>
        </Popconfirm>
    </div>
}
export default RegDelete