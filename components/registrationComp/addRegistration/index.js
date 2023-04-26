import { Button, Form, Input, Modal, message } from 'antd';
import axios from '../../../axios-orders';
import { useEffect, useState } from 'react'; 
const { TextArea } = Input;
const AddRegistration = (props) =>{
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const showModal = () => {
      setIsModalOpen(true);
    }; 
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    const onFinish = (values) => { 
      const token = localStorage.getItem("idToken");
      const body = { 
        localId: localStorage.getItem("localId"),
        values
    }
      axios.post(`registration.json?&auth=${token}`, body).then((res)=>{
        if(res.data.name)
          message.success("Success") 
          setIsModalOpen(false);
          props.getRegistrationList()
      }).catch((err)=>{ 
          message.error("error")
          setIsModalOpen(false);
      }) 
    };
    return<>
      <Button type="primary" onClick={showModal} style={{marginBottom: "10px"}}>
            + Add 
      </Button>
      <Modal title="Registation add" open={isModalOpen} onCancel={handleCancel} footer={null}>
      <Form  initialValues={{ remember: true, }}  onFinish={onFinish} >
          <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input your Title!'}]}>
                <Input placeholder="Title" />
          </Form.Item>
        <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your Username!'}]}>
            <Input placeholder="Username" />
        </Form.Item>
        <Form.Item label="email" name="email" rules={[{ required: true, message: 'Please input your email!'}]}>
                <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item label="Phone" name="phone" rules={[{ required: true, message: 'Please input your Phone!'}]}>
                <Input type="phone" placeholder="Phone" />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[ { required: true, message: 'Please input your Password!'}]}>
          <Input.Password />
        </Form.Item>  
        <Form.Item label="Description" name="description" rules={[ { required: true, message: 'Please input your Description!'}]}>
            <TextArea placeholder="Description" showCount/>
        </Form.Item> 
        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"> Save </Button> 
        </Form.Item>
        </Form>
      </Modal>
    </>
}
export default AddRegistration;