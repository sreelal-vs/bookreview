import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { createReplyThunk } from "../Redux/commentSlice";
import CommentComponent from "./CommentComponent";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";


const ReplyForm = ({ show,setForm, reviewId,repliedTo,commentShow,repliedFor,hideReply}) => {
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(setForm);
    
    const handleSubmit = (e) => {
        e.preventDefault();       
        dispatch(createReplyThunk({ reviewId, content: e.target.comment.value,repliedTo,repliedFor}));
        if(commentShow){
            setShowForm(false);
        }else{
            hideReply(null);
        }
    }
    return (
        <div className="mt-2">
            {show && (
                <div>
                    {showForm ? (
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                                <Form.Control name="comment" placeholder="Write your reply... " style={{height:"40px"}} as="textarea" rows={3} />
                        </Form.Group>


                        <Row className="justify-content-start ">
                            <Col className="flex-grow-0"><Button type="submit" className="custom-btn  border-0 pb-3 h-75" >Post</Button></Col>
                            <Col ><Button className="custom-btn border-0 h-75 pb-3" onClick={() => (commentShow?setShowForm(false):hideReply(null))}>Cancel</Button></Col>
                        </Row>
                    </Form>
                    ):(
                    <div className="w-100 my-2" ><Button className="custom-btn border-0 h-50" onClick={()=>{setShowForm(prev=>!prev)}}><FaPencilAlt />  Write</Button></div>
                    )}
                    {commentShow&&(
                    <div className="w-100 "><CommentComponent reviewId={reviewId} /></div>

                    )}
                </div>
            )}
        </div>
    )
}

export default ReplyForm;