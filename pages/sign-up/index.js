import BaseLayout from "@/components/layout";
import { 
    Button, 
    Form,
    Input,
    message,  
} from 'antd'; 
import css from "./style.module.css"
import axios from "axios";
import { useRouter } from "next/router";
const SignUp = () =>{
    const [form] = Form.useForm();
    const router = useRouter();
    const onFinish = (values) => { 
      const body = {
        email: values.email,
        password: values.password,
        returnSecureToken: true
    }
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAA_wX14i2xQr-owSd7-iAxcp4J3qRdgMI", body).then((res)=>{
            message.log("Success");
            Router.push("/")
            router.log(res.data);
        }).catch((err)=>{
            console.log("err: ", err)
        })
    };
    return<BaseLayout>
        <div  className={css.Container}>
            <Form  
            className={css.FromCss}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
                residence: ['zhejiang', 'hangzhou', 'xihu'],
                prefix: '86',
            }}
            style={{
                maxWidth: 600,
            }}
            scrollToFirstError
            >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                },
                {
                    required: true,
                    message: 'Please input your E-mail!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item> 
            <Form.Item  >
                <Button type="primary" htmlType="submit">
                 Register
                </Button>
            </Form.Item>
            </Form>
        </div>
    </BaseLayout>
}
export default SignUp;