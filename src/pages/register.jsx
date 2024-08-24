import { Button, Form, Input, notification, Row, Col, Divider } from "antd"
import { registerUserAPI } from "../services/api.services";
import { Link, useNavigate } from "react-router-dom";
const RegisterPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(">> check values", values)

        //call apivalues.
        const res = await registerUserAPI(
            values.fullName,
            values.email,
            values.password,
            values.phone)

        if (res.data) {
            notification.success({
                message: "Register user",
                description: "Dang ky user thanh cong"
            })
            navigate("/login")
        }
        else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            })
        }
    }
    return (
        <>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{
                    padding: "50px",
                }}
            // onFinishFailed={onFinishFailed}
            >
                <Row justify={"center"}>
                    <h3>Register</h3>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Full Name"
                            name="fullName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your fullName!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
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
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            label="Phone Number"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    pattern: new RegExp(/\d+/g),
                                    message: "Wrong format!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Col xs={24} md={12}>
                        <div>
                            <Button onClick={() => form.submit()}
                                type="primary">Register</Button>
                        </div>
                    </Col>
                </Row>
                <Row justify={"center"}>
                    <Divider />
                    <span>Đã có tài khoản?</span><Link to={"/login"}> Đăng nhập tại đây</Link>
                </Row>
            </Form>
        </>
    )
}

export default RegisterPage