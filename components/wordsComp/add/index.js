import { Button, Form, Input, Modal, message } from 'antd';
import axios from '../../../axios-orders';
import { useState } from 'react'; 
import moment from 'moment';
const Add = ({axiosData}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const showModal = () => {
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (words) => { 
      const token = localStorage.getItem("idToken");
      const body = { 
        localId: localStorage.getItem("localId"),
        words: { ...words, date: moment().format("YYYY-MM-DD") } 
    }  
      axios.post(`words.json?&auth=${token}`, body).then((res)=>{
        if(res.data.name)
          message.success("Success") 
          axiosData()
          setIsModalOpen(false); 
      }).catch((err)=>{ 
          message.error("error")
          setIsModalOpen(false);
      }) 
      
    };
    return<>
      <Button type="primary" onClick={showModal} style={{marginBottom: "10px", marginLeft: "10px", marginRight: "10px"}}>
            + Add word
      </Button>
      <Modal title="Add words" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form size="middle"  initialValues={{ remember: true, }}  onFinish={onFinish} >
          <Form.Item label="Korean" name="koreanName" rules={[{ required: true, message: 'Please input your korean!'}]}>
                <Input placeholder="koreanName" />
          </Form.Item>
        <Form.Item label="Mongolian" name="mongolName" rules={[{ required: true, message: 'Please input your Mongolian!'}]}>
            <Input placeholder="mongolName" />
        </Form.Item>
        <Form.Item label="image" name="image" rules={[{ required: false}]}>
                <Input placeholder="image" />
        </Form.Item>
         
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: "100%"}}> Save </Button> 
        </Form.Item>
        </Form>
      </Modal>
    </>
}
export default Add;