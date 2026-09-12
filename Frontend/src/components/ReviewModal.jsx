import { useCallback, useEffect, useState } from "react";
import { Button, Card, Col, Dropdown, Form, Image, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { addlikeReviewThunk, createReviewThunk, deleteReviewThunk, getReviewsThunk, updateReviewThunk } from "../Redux/reviewSlice";
import { FaPencilAlt } from "react-icons/fa";
import StarRating from "./StarRating";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BsThreeDots } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import ReplyForm from "./ReplyForm";






const ReviewModal = ({ show, onHide, bookId }) => {
    dayjs.extend(relativeTime);
    const dispatch = useDispatch();
    const { reviews } = useSelector(state => state.review);
    const { user } = useSelector(state => state.auth);
  

    useEffect(() => {
        if (!show) return;
        dispatch(getReviewsThunk(bookId));

    }, [dispatch, bookId, show])

    const [editModal, setEditModal] = useState(false);
    const [reviewId, setReviewId] = useState(null);
    const [updateStarValue, setUpdatedStarValue] = useState(0);
    const [textArea, setTextArea] = useState("")
    const [starValue, setStarValue] = useState(0);
    const [showReplyFormID, setShowReplyFormID] = useState(null);
    const resetFuntion = useCallback(() =>{
        setEditModal(false);
        setReviewId(null);
        setShowReplyFormID(null);
        setTextArea(null);
        setStarValue(0);
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const reviewData = {
            review: e.target.review.value,
            bookId,
            starCount: starValue
        }
        dispatch(createReviewThunk(reviewData))
        e.target.reset();
        setStarValue(0)
    }

    const handleLike = (user, reviewId) => {
        dispatch(addlikeReviewThunk({ user, reviewId }));
    }
    const handleEditContent = (index) => {
        setTextArea(reviews[index].content);
        setUpdatedStarValue(reviews[index].rating);
        setEditModal(true)
        setReviewId(reviews[index]._id);
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

    const handleDelete = (id) => {
        dispatch(deleteReviewThunk(id))
    }
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-center"
            centered
            onHide={()=>{
                resetFuntion()
                onHide()
            }}
            className="p-0"
        >
            <Modal.Header className="libre-heading" closeButton>Readers Review</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="libre-heading"><FaPencilAlt />  Write</Form.Label>
                        <Form.Control name="review" as="textarea" rows={3} />
                    </Form.Group>

                    <div className="d-flex">
                        <span className="libre-heading"> Rating &nbsp;</span>
                        <StarRating readOnly={false} starCount={starValue} onRateChange={setStarValue} />
                    </div>

                    <Row className="justify-content-center align-items-center flex-column row-cols-3">
                        <Col ><Button type="submit" className="custom-btn border-0 w-100" >Post</Button></Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Row className="flex-column w-100 g-2">
                    {reviews.map((review, i) => {
                        const isLiked = review?.likes.some(id => String(id) === String(user._id)) || false;
                        return (<Col key={review._id}>
                            <Card className="bottomborder w-100 p-3">
                                <div>
                                    <Row>
                                        <Col className="flex-grow-0 p-0">
                                            <Image src={review.user?.profilePic ? `http://localhost:5000/${review.user.profilePic}` : `http://localhost:5000/Uploads/defaultPic.jpg`} height="70px" width="70px" roundedCircle />

                                        </Col>
                                        <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                            <h4 className="m-0 libre-heading">
                                                {review?.user?.name?.[0].toUpperCase() + review?.user?.name?.slice(1)}
                                            </h4>
                                            <span className="time mono">{dayjs(review.createdAt).fromNow()}</span>
                                        </Col>
                                        <Col className="mono flex-grow-0 d-flex flex-column align-items-center">
                                            {user._id === review.user._id && (
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
                                    <StarRating readOnly={true} starCount={review.rating} />

                                </div>
                                <p className="my-2 topborder pt-3 fs-2 mono">{review.content}</p>
                                <div className="d-flex gap-2">
                                    <p className="m-0 mono fw-medium text-black-50">{review.likes ? review.likes.length : ""} likes </p>
                                    <p style={{ cursor: "pointer" }} className="m-0 mono fw-medium text-black-50" onClick={() => { setShowReplyFormID(prev => prev == review._id ? null : review._id) }}>Comments</p>
                                </div>


                            </Card>
                            <Row className=" justify-content-end w-100">
                                <Col className="col-9 p-0"><ReplyForm reviewId={review._id} setShow={setShowReplyFormID} commentShow={true} show={review._id == showReplyFormID} repliedTo={review.user._id}/></Col>
                            </Row>
                            
                        </Col>)
                    })}
                </Row>
            </Modal.Footer>

        </Modal>
    )
}



export default ReviewModal