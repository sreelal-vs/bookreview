import { Button, Col, Form, Row } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup"
import "../styles/App.css"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import { userRegisterThunk } from "../Redux/userSlice";
const Register = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const schema = yup.object().shape({
        fullname: yup.string().required("full name is required"),
        email: yup.string().email("Email format is wrong").required("email is required"),
        password: yup.string().required("Password is required"),
        profilePic: yup.mixed(),

    });
    const handleData = async (values)=>{

        const formData = new FormData();

        formData.append("fullname",values.fullname);
        formData.append("email",values.email);
        formData.append("password",values.password);
        formData.append("profilePic",values.profilePic);
                
        dispatch(userRegisterThunk(formData));
        navigate('/signin');
        
    }
    return (
        <div className="d-flex justify-content-center align-items-center py-5 flex-grow-1">
            <Row className="section-size  justify-content-center m-0">
                <Col xs={10} sm={8} md={5} className="shadow p-4 auth-card">
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleData}
                        initialValues={{
                            fullname: '',
                            email: '',
                            password: '',
                            proficPic: null
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors ,setFieldValue}) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <Row className="mb-3 justify-content-center">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="fullname"
                                            value={values.fullname}
                                            onChange={handleChange}
                                            isValid={touched.fullname && !errors.fullname}
                                            isInvalid={touched.fullname && !!errors.fullname}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.fullname}</Form.Control.Feedback>

                                    </Form.Group>
                                </Row>
                                <Row className="mb-3 justify-content-center">
                                    <Form.Group controlId="validationFormik02">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isValid={touched.email && !errors.email}
                                            isInvalid={touched.email && !!errors.email}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3 justify-content-center">
                                    <Form.Group controlId="validationFormik01">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            isValid={touched.password && !errors.password}
                                            isInvalid={touched.password && !!errors.password}
                                        />

                                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>

                                    </Form.Group>
                                </Row>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Default file input example</Form.Label>
                                    <Form.Control
                                     type="file" 
                                     name="profilePic"
                                     onChange={(event)=>{
                                        setFieldValue('profilePic',event.currentTarget.files[0])
                                     }}
                                     
                                     />
                                </Form.Group>

                                <div className="justify-content-center d-flex">
                                    <Button type="submit" className="justify-self-center custom-btn border-0">Register</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </div>
    )
}

export default Register;