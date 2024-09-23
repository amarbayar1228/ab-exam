import BaseLayout from "@/components/layout";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import css from "./style.module.css"
import axios from "axios";
import { useRouter } from "next/router";
const Login = () =>{
    const router = useRouter(); 
const onFinish = (values) => { 
const body = {
    email: values.email,
    password: parseInt(values.password),
    returnSecureToken: true
}
axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkxKA3o1jlKxVN7DM12dNs_L6O5sPoG9w", body).then((res)=>{ 
    if(res.data.registered === true){ 
        const expIn =  res.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + parseInt(expIn) * 1000); 
        localStorage.setItem("idToken",  res.data.idToken)
        localStorage.setItem("localId",  res.data.localId) 
        localStorage.setItem("expireDate", expireDate)
        localStorage.setItem("refreshToken",  res.data.refreshToken) 
        refreshToken(expIn * 1000)

        message.success("Success");
        router.push("/new-words");  
    }else{ 
        message.error(res.data.errors[0].message)
    }
}).catch((err)=>{
     message.error(err.code ? err.code : "Error")
}) 
};

 const refreshToken = async(expIn) =>{ 
    await setTimeout(()=>{  
        localStorage.removeItem("localId");
        localStorage.removeItem("idToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expireDate");
        router.push("/");
    },expIn)
}

return <BaseLayout pageName="login" >
    <div className={css.Container}>
        <Form name="normal_login" initialValues={{ remember: true, }}  onFinish={onFinish} className={css.FromCss}>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your Username!'}]}>
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
        <Form.Item name="password" rules={[ { required: true, message: 'Please input your Password!'}]}>
            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
                Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"> Log in </Button> 
        </Form.Item>
        </Form>
    </div>
</BaseLayout>
}
export default Login;