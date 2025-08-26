import { useGo } from "@refinedev/core";
import { useRegister } from "@refinedev/core"; // <-- for register mutation
import { Card, Form, Input, Button, Typography, Divider, theme } from "antd";

export const RegisterForm = () => {
    const go = useGo();
    const { token } = theme.useToken();
    const { mutate: register } = useRegister();

    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        const { name, email, password } = values;

        register({
            name,
            email,
            password,
        });
    };

    return (
        <Card
            style={{
                maxWidth: 400,
                margin: "0 auto",
                padding: 24,
                backgroundColor: token.colorBgElevated,
                borderRadius: 8,
                boxShadow: token.boxShadow,
            }}
            bodyStyle={{ padding: "24px" }}
        >
            <Typography.Title
                level={3}
                style={{
                    textAlign: "center",
                    color: token.colorPrimaryTextHover,
                    marginBottom: 24,
                    fontWeight: 600,
                }}
            >
                Create your account
            </Typography.Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                requiredMark={false}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Name is required" }]}
                >
                    <Input size="large" placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Invalid email address" },
                    ]}
                >
                    <Input size="large" placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: "Password is required" }]}
                >
                    <Input.Password size="large" placeholder="●●●●●●●●" />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Please confirm your password" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Passwords do not match"));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" placeholder="Confirm password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" size="large" htmlType="submit" block >
                        Register
                    </Button>
                </Form.Item>

                <Divider style={{ margin: "16px 0" }} />

                <Form.Item style={{ textAlign: "center", marginTop: 0 }}>
                    <Typography.Text style={{ fontSize: 14 }}>
                        Already have an account?{" "}
                        <Typography.Link
                            style={{ fontWeight: 600, color: token.colorPrimaryTextHover }}
                            onClick={() => go({ to: "/login" })}
                        >
                            Login
                        </Typography.Link>
                    </Typography.Text>
                </Form.Item>
            </Form>
        </Card>
    );
};
