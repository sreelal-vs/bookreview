import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup"
import "../styles/App.css"
import { useDispatch } from "react-redux";
import { userLoginThunk } from "../Redux/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email("Does not looks like an email").required("email is required"),
        password: yup.string().required("password is required"),

    });

    const handleData = (values,{setFieldError}) =>{    
        dispatch(userLoginThunk(values)).unwrap().then(()=>{    
            navigate('/')             
        }).catch((data)=>{  
                    
            setFieldError(data.field,data.message)         
        })
           
    }
    return (
        <div className=" d-flex flex-column align-items-center flex-grow-1 justify-content-center py-5">
            <Row className=" section-size justify-content-center ">
                <Col xs={10} sm={8} md={5} className="shadow p-4 auth-card">
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleData}
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors}) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3 justify-content-center">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={touched.email && !!errors.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3 justify-content-center">
                                    <Form.Group controlId="validationFormik02">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>

                                <p>you don't have an account? <Link to="/register">Create account</Link></p>
                                <div className="justify-content-center d-flex">
                                    <Button type="submit" className="justify-self-center border-0 custom-btn fs-5 mono">Login</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </div>
    )
}

export default Signin;