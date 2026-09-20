import { useEffect } from "react";
import { Card, Col, Image, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { reportUserReviewsThunk } from "../Redux/reviewSlice";
import dayjs from "dayjs";
import defaultPic from "../assets/defaultcover.png"


const UserReviews = ({ show, onHide, userId }) => {
    const dispatch = useDispatch()
    const { reviews } = useSelector(state => state.review)
    useEffect(() => {
        dispatch(reportUserReviewsThunk({ userId }))
    }, [dispatch, userId])
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            style={{height:"700px"}}
            scrollable
        >
            <Modal.Header className="fs-4 libre-heading" closeButton>
                This user's reviews
            </Modal.Header>
            <Modal.Body>
                {reviews.map((review) => {

                    return <Card key={review._id} className="bottomborder w-100 p-3 my-2">
                        <div>
                            <Row>
                                <Col className="flex-grow-0 p-0">
                                    <Image src={review.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${review.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={review.book.title} />
                                </Col>
                                <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                    <h4 className="m-0 libre-heading">
                                        {review.book?.title?.[0].toUpperCase() + review.book?.title?.slice(1)}
                                    </h4>
                                    <span className="time mono">{"Posted on " + dayjs(review.createdAt).format('DD-MM-YYYY')}</span>

                                </Col>
                                <Col className="mono flex-grow-0 d-flex flex-column align-items-center">

                                    <span>{review.rating}/5</span>

                                </Col>
                            </Row>


                        </div>
                        <p className="my-2 topborder pt-3 fs-2 mono">{review.content}</p>
                        <div className="d-flex gap-2">
                            <p className="m-0 mono fw-medium text-black-50">{review.likes ? review.likes.length : ""} likes </p>
                        </div>
                        
                    </Card>
                })}
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}

export default UserReviews;