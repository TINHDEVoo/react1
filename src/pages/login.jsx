import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.services";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const { setUser } = useContext(AuthContext);
    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.email, values.password)
        if (res.data) {
            message.success("dang nhap thanh cong")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        } else {
            notification.error({
                message: "error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{
                padding: "50px",
            }}
        >
            <Row justify={"center"}>
                <h3>Login</h3>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={10}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: "email",
                                message: "Email khong dung dinh dang",
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={10}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    form.submit()
                                }
                            }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={10} style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <div>
                        <Button
                            loading={loading}
                            onClick={() => form.submit()}
                            type="primary">Login</Button>
                    </div>
                    <div><Link to={"/"}>Go to home</Link></div>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Divider />
                <span>Chưa có tài khoản?</span><Link to={"/register"}> Đăng ký tại đây</Link>
            </Row>
        </Form >
    )
}

export default LoginPage