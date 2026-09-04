import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { createCollectionThunk } from "../Redux/bookCollectionSlice";
import { useDispatch } from "react-redux";

const ModalComponent = ({ show, onHide, onSubmit }) => {
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        const name = event.target.collectionName.value;
        onSubmit();
        event.preventDefault()
        dispatch(createCollectionThunk(name))
    }
    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title className="libre-heading text-center flex-grow-1" id="contained-modal-title-vcenter">
                    Give your collection a name
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formGroupEmail">

                        <Form.Control name="collectionName" type="text" placeholder="Enter the collection name" />
                    </Form.Group>
                    <Row className="justify-content-center ">
                        <Col className="d-flex justify-content-end"><Button className="custom-btn border-0 " onClick={onHide}>Close</Button></Col>
                        <Col ><Button type="submit" className="custom-btn border-0 ">Save</Button></Col>
                    </Row>
                </Form>
            </Modal.Body>

        </Modal>
    )
}

export default ModalComponent;