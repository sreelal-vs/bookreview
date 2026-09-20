import { Button, Card, Col, Dropdown, Form, Image, Modal, Nav, Row, Tab, TabContainer, Tabs } from "react-bootstrap"
import "../styles/profile.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { addlikeReviewThunk, deleteReviewThunk, updateReviewThunk, userReviewsThunk } from "../Redux/reviewSlice";
import { finishedBookThunk } from "../Redux/readingListSlice";
import StarRating from "../components/StarRating";
import dayjs from "dayjs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import relativeTime from "dayjs/plugin/relativeTime"
import defaultPic from "../assets/defaultcover.png"
import defaultUser from "../assets/defaultPic.jpg"
import { Formik } from "formik";
import * as yup from "yup"

import { passwordChangeThunk, userEditThunk } from "../Redux/userSlice";
import { truncateText } from "../assets/assetsFunction";
const Profile = () => {
    const { user } = useSelector(state => state.auth);
    const { reviews } = useSelector(state => state.review);
    const { readListBooks } = useSelector(state => state.Library);
    const [editModal, setEditModal] = useState(false);
    const [textArea, setTextArea] = useState("");
    const [updateStarValue, setUpdatedStarValue] = useState(0);
    const [reviewId, setReviewId] = useState(null);
    const [tab, setTab] = useState("profile");

    const handleEditContent = (index) => {
        setTextArea(reviews[index].content);
        setUpdatedStarValue(reviews[index].rating);
        setEditModal(true)
        setReviewId(reviews[index]._id);
    }
    const handleLike = (user, reviewId) => {
        dispatch(addlikeReviewThunk({ user, reviewId }));
    }
    const handleEdit = (e) => {
        e.preventDefault();
        const reviewData = {
            review: e.target.review.value,
            reviewId,
            starCount: updateStarValue
        }
        dispatch(updateReviewThunk(reviewData))

    }
    dayjs.extend(relativeTime);
    const handleDelete = (id) => {
        dispatch(deleteReviewThunk(id))
    }
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userReviewsThunk())
        dispatch(finishedBookThunk())
    }, [dispatch])




    // edit user setup



    const schema = yup.object().shape({
        fullname: yup.string().required("full name is required"),
        profilePic: yup.mixed(),

    });
    const fileRef = useRef(null)
    const handleData = async (values) => {

        const formData = new FormData();

        formData.append("fullname", values.fullname);
        formData.append("profilePic", values.profilePic);
        formData.append("prevPic", user.profilePic);

        dispatch(userEditThunk(formData))
        // ).unwrap().then(() => {
        //     navigate('/signin');

        // }).catch((data) => {
        //     setFieldError(data.field, data.error)
        // })
        setTab("profile")

    }
    const [preview, setPreview] = useState(
        user.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${user.profilePic}` : defaultUser
    );

    const handlePreviewChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file))
        }


    }
    const handleClick = () => {
        fileRef.current.click();
    }
    const passwordSchema = yup.object().shape({
        prevPassword: yup.string().required("Enter your current password"),
        password: yup
            .string()
            .min(8, "At least 8 characters")
            .required("Enter a new password")
            .notOneOf([yup.ref("prevPassword")],"New password must be different"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")],"Password is not matching")
            .notOneOf([yup.ref("prevPassword")],"New password must be different")
            .required("Confirm your new password"),
    });
    const handlePasswordChange = (values,{resetForm,setFieldError}) => {
        
            dispatch(passwordChangeThunk({prevPassword:values.prevPassword,password:values.password})).unwrap().then(()=>{
                resetForm();
            }).catch((data)=>{
                if(data.field){
                    setFieldError(data.field,data.message)
                }
            })
            setTab("profile")

        
    }
    return (
        <div className="flex-grow-1 d-flex justify-content-center">
            {user && (
                <TabContainer activeKey={tab}>
                    <Row className="section-size px-3 px-xxl-0 ">
                        <Col className="col-lg-3 col-sm-2 col-3">
                            <Nav className="d-flex flex-column pt-5 libre-heading fw-semibold" variant="underline">
                                <Nav.Item >
                                    <Nav.Link eventKey="profile" onClick={() => { setTab("profile") }}>Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link eventKey="editprofile" onClick={() => { setTab("editprofile") }}>
                                        Edit Profile
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link eventKey="password" onClick={() => { setTab("password") }}>
                                        Change password
                                    </Nav.Link>
                                </Nav.Item>

                            </Nav>
                        </Col>
                        <Col className="d-flex flex-column">

                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    <Row className="py-3 flex-grow-0">
                                        <Col className=" col-lg-3 col-sm-4">
                                            <Image src={user.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${user.profilePic}` : (defaultUser)} height="160px" width="160px" roundedCircle className="shadow profile-picture" />
                                        </Col>
                                        <Col className="">
                                            <h1 className="libre-heading user-name">{user.name[0].toUpperCase()}{user.name.slice(1)}</h1>
                                            <hr />
                                            <div className="d-flex gap-2 mono fw-medium profiles-details-size">
                                                <div className="d-flex flex-column">
                                                    <span className="text-center fs-2">{readListBooks.length}</span>
                                                    <span >BOOKS READ</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <span className="text-center fs-2">{reviews.length}</span>
                                                    <span>REVIEWS</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className=" flex-grow-1">
                                        <Col>
                                            <Tabs
                                                className=""
                                                defaultActiveKey="reviews"
                                            >
                                                <Tab eventKey="reviews" title="Reviews">
                                                    {reviews.map((review, i) => {
                                                        const isLiked = review?.likes.some(id => String(id) === String(user._id)) || false;

                                                        return <Card key={review._id} className="bottomborder w-100 p-3 my-2">
                                                            <div>
                                                                <Row>
                                                                    <Col className="flex-grow-0 p-0">
                                                                        <Image src={review.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${review.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={review.book.title} />
                                                                    </Col>
                                                                    <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                        <h4 className="m-0 libre-heading">
                                                                            {review?.book?.title?.[0].toUpperCase() + review?.book?.title?.slice(1)}
                                                                        </h4>
                                                                        <span className="time mono">{dayjs(review.createdAt).fromNow()}</span>
                                                                        <StarRating readOnly={true} starCount={review.rating} size={25} />
                                                                    </Col>
                                                                    <Col className="mono flex-grow-0 d-flex flex-column align-items-center">
                                                                        {user._id === review.user && (
                                                                            <Dropdown>
                                                                                <Dropdown.Toggle className="bg-transparent text-black"><BsThreeDots /></Dropdown.Toggle>
                                                                                <Dropdown.Menu>
                                                                                    <Dropdown.Item onClick={() => { handleEditContent(i) }}>Edit</Dropdown.Item>
                                                                                    <Modal
                                                                                        show={editModal}
                                                                                        size="lg"
                                                                                        aria-labelledby="contained-modal-title-vcenter"
                                                                                        centered
                                                                                        onHide={() => {
                                                                                            setEditModal(false);
                                                                                            setTextArea(null);
                                                                                        }}
                                                                                        className="p-0"
                                                                                    >
                                                                                        <Modal.Header closeButton>
                                                                                            <Modal.Title className="libre-heading text-center flex-grow-1" id="contained-modal-title-vcenter">
                                                                                                Give your collection a name
                                                                                            </Modal.Title>
                                                                                        </Modal.Header>
                                                                                        <Modal.Body>
                                                                                            <Form onSubmit={handleEdit}>
                                                                                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                                                                    <Form.Label className="libre-heading"><FaPencilAlt />  Write</Form.Label>
                                                                                                    <Form.Control name="review" as="textarea" value={textArea} onChange={(e) => { setTextArea(e.target.value) }} style={{ height: "220px" }} rows={3} />
                                                                                                </Form.Group>

                                                                                                <div className="d-flex">
                                                                                                    <span className="libre-heading"> Rating &nbsp;</span>
                                                                                                    <StarRating readOnly={false} starCount={updateStarValue} onRateChange={setUpdatedStarValue} />
                                                                                                </div>

                                                                                                <Row className="justify-content-center align-items-center flex-column row-cols-3">
                                                                                                    <Col ><Button type="submit" className="custom-btn border-0 w-100" onClick={() => setEditModal(false)}>Post</Button></Col>
                                                                                                </Row>
                                                                                            </Form>
                                                                                        </Modal.Body>

                                                                                    </Modal>
                                                                                    <Dropdown.Item onClick={() => { handleDelete(review._id) }}>Delete</Dropdown.Item>
                                                                                </Dropdown.Menu>
                                                                            </Dropdown>
                                                                        )}
                                                                        <span>{review.rating}/5</span>
                                                                        <div onClick={() => { handleLike(user._id, review._id) }}>{!isLiked ? (<IoHeartOutline size={20} />) : (<IoHeartSharp className="text-danger" size={20} />
                                                                        )}</div>
                                                                    </Col>
                                                                </Row>


                                                            </div>
                                                            <p className="my-2 topborder pt-3 fs-2 mono">{review.content}</p>
                                                            <div className="d-flex gap-2">
                                                                <p className="m-0 mono fw-medium text-black-50">{review.likes ? review.likes.length : ""} likes </p>
                                                            </div>
                                                        </Card>
                                                    })}
                                                </Tab>
                                                <Tab eventKey="finishedbooks" title="Finished Books">
                                                    <Row xs={2} sm={3} lg={4}>
                                                        {readListBooks.map((item, i) => (
                                                            <Col key={i}>

                                                                <Card className="border-0">
                                                                    <div className="card-img-wrap p-3 ">
                                                                        <Card.Img className="object-fit-fill" src={item.book.coverpicid ? `https://covers.openlibrary.org/b/id/${item.book.coverpicid}-M.jpg` : (defaultPic)} />
                                                                    </div>

                                                                    <Card.Body>
                                                                        <Card.Title className="libre-heading">{truncateText(item.book.title, 20)}</Card.Title>
                                                                        <Card.Subtitle className="mt-1 text-black-50">{item.book.author}</Card.Subtitle>

                                                                        <StarRating readOnly={true} starCount={item.book.avgrating} />


                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </Tab>

                                            </Tabs>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="editprofile" className="py-5">

                                    <Formik
                                        validationSchema={schema}
                                        onSubmit={handleData}
                                        initialValues={{
                                            fullname: user.name,
                                            proficPic: user.profilePic
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, touched, errors, setFieldValue }) => (
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <Row className="mb-3 justify-content-center">
                                                    <Form.Group controlId="formFile" className="mb-3 d-flex justify-content-center">

                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            name="profilePic"
                                                            ref={fileRef}
                                                            onChange={(event) => {
                                                                setFieldValue('profilePic', event.currentTarget.files[0])
                                                                handlePreviewChange(event);
                                                            }}
                                                            hidden
                                                        />

                                                        <Image onClick={handleClick} src={preview} roundedCircle height="160px" width="160px" />




                                                    </Form.Group>
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



                                                <div className="justify-content-center d-flex">
                                                    <Button type="submit" className="justify-self-center custom-btn border-0">Save changes</Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>

                                </Tab.Pane>
                                <Tab.Pane eventKey="password" className="py-5">

                                    <Formik
                                        validationSchema={passwordSchema}
                                        onSubmit={handlePasswordChange}
                                        initialValues={{
                                            prevPassword: "",
                                            password: "",
                                            confirmPassword: ""
                                        }}
                                    >
                                        {({ handleSubmit, handleChange, values, touched, errors}) => (
                                            <Form noValidate onSubmit={handleSubmit}>
                                                <Row className="mb-3 justify-content-center">

                                                    <Form.Group controlId="validationFormik01">
                                                        <Form.Label>Current Password</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            name="prevPassword"
                                                            value={values.prevPassword}
                                                            onChange={handleChange}
                                                            isValid={touched.prevPassword && !errors.prevPassword}
                                                            isInvalid={touched.prevPassword && !!errors.prevPassword}
                                                        />
                                                        <Form.Control.Feedback type="invalid">{errors.prevPassword}</Form.Control.Feedback>
                                                    </Form.Group>
                                                    <Form.Group controlId="validationFormik02">
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
                                                    </Form.Group><Form.Group controlId="validationFormik03">
                                                        <Form.Label>Confirm Password</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type="password"
                                                            name="confirmPassword"
                                                            value={values.confirmPassword}
                                                            onChange={handleChange}
                                                            isValid={touched.confirmPassword && !errors.confirmPassword}
                                                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                                        />
                                                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                                                    </Form.Group>
                                                </Row>

                                                <div className="justify-content-center d-flex">
                                                    <Button type="submit" className="justify-self-center custom-btn border-0">Save Password</Button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>

                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </TabContainer>

            )}
        </div>
    )

}


export default Profile