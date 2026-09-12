import { useEffect, useState } from "react";
import { Card, Col, Dropdown, Image, Row } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { deletetCommentThunk, getCommentsThunk } from "../Redux/commentSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import ReplyForm from "./ReplyForm";
import EditReplyForm from "./EditReplyForm";

const CommentComponent = ({ reviewId }) => {
    const dispatch = useDispatch();
    dayjs.extend(relativeTime)
    useEffect(() => {
        dispatch(getCommentsThunk(reviewId))
    }, [dispatch, reviewId])
    const { comments } = useSelector(state => state.comment)
    const { user } = useSelector(state => state.auth);

    const [showReplyFormID, setShowReplyFormID] = useState(false)
    const [editReplyId, setEditReplyId] = useState(false)
    const handleDelete = (commentId) => {
        dispatch(deletetCommentThunk(commentId));
    }

    return (
        <div>
            {comments.map(comment => (
                <Card key={comment._id} className="bottomborder my-2 w-100 p-3">
                    <div>
                        <Row >
                            <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                <Image src={comment.user?.profilePic ? `http://localhost:5000/${comment.user.profilePic}` : `http://localhost:5000/Uploads/defaultPic.jpg`} height="50px" width="50px" roundedCircle />
                            </Col>
                            <Col className=" d-flex justify-content-center flex-column col-8">
                                <p className="m-0">
                                    <span className="mono commment-time pe-1 text-black-50">{dayjs(comment.createdAt).fromNow()}</span>
                                    {comment.isEdited && (
                                        <span className="text-black">edited</span>
                                    )}
                                </p>
                                <p className="h-100 m-0 mono fs-5">
                                    <span className="fw-medium pe-1">{comment?.user?.name?.[0].toUpperCase() + comment?.user?.name?.slice(1)}</span>
                                    <span className="text-info fs-6">@{comment.repliedTo.name}</span>
                                    {comment.content}
                                </p>
                            </Col>

                            <Col className="mono  d-flex flex-column col-2 align-items-center p-0">
                                {user._id === comment.user._id && (
                                    <Dropdown>
                                        <Dropdown.Toggle className="bg-transparent text-black p-0"><BsThreeDotsVertical /></Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => { handleDelete(comment._id) }}>Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}


                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-2"></Col>
                            <Col className="">
                                <div>
                                    <span style={{ cursor: "pointer" }} onClick={() => { setShowReplyFormID(prev => prev == comment._id ? null : comment._id) }}>Reply</span>
                                    {user._id === comment.user._id&&(
                                    <span style={{ cursor: "pointer" }} className="ps-2" onClick={() => { setEditReplyId(prev => prev == comment._id ? null : comment._id) }}>Edit</span>

                                    )}
                                </div>

                                <Col className="col-9 p-0"><ReplyForm setForm={true} hideReply={setShowReplyFormID} commentShow={false} reviewId={reviewId} repliedFor={comment._id} show={comment._id == showReplyFormID} repliedTo={comment.user._id} /></Col>
                                <Col className="col-9 p-0"><EditReplyForm commentId={comment._id} show={comment._id === editReplyId} hideEdit={setEditReplyId} content={comment.content} /></Col>


                            </Col>
                        </Row>

                    </div>
                </Card>
            ))}
        </div>
    )
}

export default CommentComponent;


