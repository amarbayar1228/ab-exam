import { Button, Popconfirm, message } from "antd"
import { DeleteOutlined } from '@ant-design/icons';
import axios from "../../../axios-orders";  

const Delete = ({axiosData, id}) =>{ 
    
    const deleteFunc = () =>{  
        const token = localStorage.getItem("idToken");  
        axios.delete(`words/${id}.json?&auth=${token}`).then((res)=>{  
          message.success("deleted") 
          axiosData();
        }).catch((err)=>{ 
            message.error("error")
        })
    }
    return<div> 
        <Popconfirm title="Sure to delete?" onConfirm={deleteFunc}>
          <Button type="primary" size="small" icon={<DeleteOutlined />} danger></Button>
        </Popconfirm>
    </div>
}
export default Delete