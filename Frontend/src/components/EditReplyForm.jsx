
import { Button, Col, Form, Row } from "react-bootstrap"
import { useDispatch } from "react-redux";

import { useState } from "react";
import { editReplyThunk } from "../Redux/commentSlice";

const EditReplyForm = ({ show,hideEdit, content, commentId }) => {
    const dispatch = useDispatch();
    const [commentContent, setCommentContent] = useState(content);
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(commentContent!=content){
            dispatch(editReplyThunk({commentId,content:commentContent}));
        }
        hideEdit(null)
    }
    return (
        <>
            {show && (
                <div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">

                            <Form.Control name="comment" value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} style={{ height: "40px" }} as="textarea" rows={3} />
                        </Form.Group>
                        <Row className="justify-content-start ">
                            <Col className="flex-grow-0 pe-0"><Button type="submit" className="custom-btn  border-0 pb-3 h-75" >Edit</Button></Col>
                            <Col ><Button className="custom-btn border-0 h-75 pb-3 " onClick={() => hideEdit(null)}>Cancel</Button></Col>
                        </Row>
                    </Form>

                </div>
            )}
        </>
    )
}

export default EditReplyForm;