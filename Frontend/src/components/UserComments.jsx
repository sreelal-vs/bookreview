import { useEffect } from "react"
import { Card, Col, Image, Modal, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { reportUserCommentsThunk } from "../Redux/commentSlice"
import defaultUser from "../assets/defaultPic.jpg"
import dayjs from "dayjs"
import defaultPic from "../assets/defaultcover.png"

const UserComments = ({ show, onHide, userId }) => {
    const dispatch = useDispatch()
    const { comments } = useSelector(state => state.comment)
    useEffect(() => {
        dispatch(reportUserCommentsThunk({ userId }))
    }, [dispatch, userId])
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
        >
            <Modal.Header className="fs-4 libre-heading" closeButton>
                This user's comments
            </Modal.Header>
            <Modal.Body className="px">
                {comments.map(comment => (
                    <div key={comment._id} className="mb-2  ">
                        <Row className="justify-content-end">
                            <Col className="col-12 p-0">
                                {comment.repliedFor === null ? (
                                    <Card key={comment.review._id} className="bottomborder w-100 p-3 my-2">
                                        <div>
                                            <Row>
                                                <Col className="flex-grow-0 p-0">
                                                    <Image src={comment.review.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${comment.review.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={comment.review.book.title} />
                                                </Col>
                                                <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                    <h4 className="m-0 libre-heading">
                                                        {comment.review.book?.title?.[0].toUpperCase() + comment.review.book?.title?.slice(1)}
                                                    </h4>
                                                    <span className="time mono">{"Posted on " + dayjs(comment.review.createdAt).format('DD-MM-YYYY')}</span>

                                                </Col>
                                                <Col className="mono flex-grow-0 d-flex flex-column align-items-center">

                                                    <span>{comment.review.rating}/5</span>

                                                </Col>
                                            </Row>


                                        </div>
                                        <p className="my-2 topborder pt-3 fs-2 mono">{comment.review.content}</p>
                                        <div className="d-flex gap-2">
                                            <p className="m-0 mono fw-medium text-black-50">{comment.review.likes ? comment.review.likes.length : ""} likes </p>
                                        </div>

                                    </Card>
                                ) : (
                                    <Row className="bg-secondary-subtle rounded-1 p-3 mt-1 m-0">
                                        <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                            <Image src={comment.repliedFor.user?.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${comment.repliedFor.user.profilePic}` : (defaultUser)} height="50px" width="50px" roundedCircle />
                                        </Col>
                                        <Col className=" d-flex justify-content-center flex-column col-8">
                                            <p className="h-100 m-0 mono fs-5">
                                                <span className="fw-medium pe-1">{comment.repliedFor.user?.name?.[0].toUpperCase() + comment.repliedFor.user?.name?.slice(1)}</span>
                                                {comment.repliedFor.repliedTo?.name && (
                                                    <span className="text-info fs-6">@{comment.repliedFor.repliedTo.name}</span>
                                                )}
                                                {comment.repliedFor.content}
                                            </p>
                                        </Col>
                                    </Row>
                                )}
                            </Col>
                            <span className="mono">Reply</span>
                            <Col className="col-10 ">
                                <Row className="bg-secondary-subtle rounded-1 p-3 mt-1">
                                    <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                        <Image src={comment.user?.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${comment.user.profilePic}` : (defaultUser)} height="50px" width="50px" roundedCircle />
                                    </Col>
                                    <Col className=" d-flex justify-content-center flex-column col-8">
                                        <p className="h-100 m-0 mono fs-5">
                                            <span className="fw-medium pe-1">{comment.user?.name?.[0].toUpperCase() + comment.user?.name?.slice(1)}</span>
                                            {comment.repliedTo?.name && (
                                                <span className="text-info fs-6">@{comment.repliedTo.name}</span>
                                            )}
                                            {comment.content}
                                        </p>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                    </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    )


}

export default UserComments;