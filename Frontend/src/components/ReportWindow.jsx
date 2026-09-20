import { Alert, Button, Card, Col, Form, Image, Modal, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import defaultPic from "../assets/defaultcover.png"
import { useEffect } from "react";

import defaultUser from "../assets/defaultPic.jpg"
import { addReportThunk, commentPreviewThunk, reviewPreviewThunk } from "../Redux/reportsSlice";

import { useState } from "react";

const ReportWindow = ({ show, onHide, onSubmit, itemId, reportedFor }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (itemId && reportedFor === "review") {
            dispatch(reviewPreviewThunk(itemId))
            return
        }
        if (itemId && reportedFor === "comment") {
            dispatch(commentPreviewThunk(itemId))
        }
        return


    }, [itemId, dispatch, reportedFor])


    const { reportPreview } = useSelector(state => state.reports)

    const reportReasons = [
        { id: "harassment", label: "Harassment or bullying" },
        { id: "hate_speech", label: "Hate speech" },
        { id: "spam", label: "Spam or misleading" },
        { id: "violence", label: "Violence or dangerous content" },
        { id: "false_info", label: "False information" }
    ]

    const [selectedReasons, setSelectedReasons] = useState([])
    const handleCheckToggle = (id) => {
        setSelectedReasons(prev =>
            prev.includes(id) ? prev.filter(r => r != id) : [...prev, id]
        )
    }
    const [selectedUserReasons, setSelectedUserReasons] = useState([])
    const handleUserReport = (id) => {
        setSelectedUserReasons(prev =>
            prev.includes(id) ? prev.filter(r => r != id) : [...prev, id]
        )
    }
    const [error, setError] = useState("");
    const [userError, setuserError] = useState("")

    const handleSubmit = () => {
        dispatch(addReportThunk({ violations: selectedReasons, targetId: itemId, reportedFor })).
            unwrap().then(() => {
                if (error) {
                    setError(null)
                }
                onSubmit()
            }).catch((data) => {
                if (data.error) {
                    setError(data.error)
                }
            })

    }
    const handleSubmitOfUser = () => {
        dispatch(addReportThunk({ violations: selectedUserReasons, targetId: reportPreview.user._id, reportedFor: "user" })).
            unwrap().then(() => {
                if (userError) {
                    setuserError(null)
                }

                
                onSubmit()
            }).catch((data) => {
                if (data.error) {
                    setuserError(data.error)
                }
            })

    }
    if (reportPreview?._id == itemId) {

        return (
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={onHide}
                className="p-0"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="libre-heading text-center flex-grow-1" id="contained-modal-title-vcenter">
                        Report an Issue
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tab.Container defaultActiveKey="reportItem">
                        <Row className="flex-column ">
                            <Col className="col-12">
                                <Nav variant="pills" className="justify-content-center gap-2 p-2 report-nav libre-heading">
                                    <Nav.Item >
                                        <Nav.Link eventKey="reportItem">Report To {reportedFor}</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="user">Report User Account</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col>
                                <Tab.Content className="p-3">
                                    <Tab.Pane eventKey="reportItem" >
                                        {reportedFor === "review" && (
                                            <div>
                                                <Card className="bottomborder w-100 p-3 my-2">
                                                    <div>
                                                        <Row>
                                                            <Col className="flex-grow-0 p-0">
                                                                <Image src={reportPreview?.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${reportPreview.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={reportPreview.book.title} />
                                                            </Col>
                                                            <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                <h4 className="m-0 libre-heading">
                                                                    {reportPreview?.book?.title?.[0].toUpperCase() + reportPreview?.book?.title?.slice(1)}
                                                                </h4>
                                                                {/* <span className="time mono">{dayjs(Item.createdAt).fromNow()}</span> */}
                                                                <StarRating readOnly={true} starCount={reportPreview.rating} size={25} />
                                                            </Col>
                                                            <Col className="mono flex-grow-0 d-flex flex-column align-items-center">

                                                                <span>{reportPreview.rating}/5</span>

                                                            </Col>
                                                        </Row>


                                                    </div>
                                                    <p className="my-2 topborder pt-3 fs-2 mono">{reportPreview.content}</p>
                                                    <div className="d-flex gap-2">
                                                        <p className="m-0 mono fw-medium text-black-50">{reportPreview.likes ? reportPreview.likes.length : ""} likes </p>
                                                    </div>
                                                </Card>
                                                <Row className="py-5 flex-column">
                                                    <Col className="col-12 mono">
                                                        <Form>
                                                            {error && (
                                                                <Alert variant="warning">{error}</Alert>
                                                            )}
                                                            {reportReasons.map((reasons) => (
                                                                <Form.Check id={reasons.id} key={reasons.id} checked={selectedReasons.includes(reasons.id)} label={reasons.label} type="checkbox" className="fs-4" onChange={() => handleCheckToggle(reasons.id)} />
                                                            ))}

                                                        </Form>
                                                    </Col>
                                                    <Col className="col-12 my-3">
                                                        <Button className="my-2 custom-btn border-0" onClick={handleSubmit} disabled={selectedReasons.length === 0}>
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                        {reportedFor === "comment" && (
                                            <div>

                                                <Row className="bg-secondary-subtle p-3 rounded-1">
                                                    <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                                        <Image src={reportPreview.user.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${reportPreview.user.profilePic}` : (defaultUser)} height="50px" width="50px" roundedCircle />
                                                    </Col>
                                                    <Col className=" d-flex justify-content-center flex-column col-8">
                                                        <p className="m-0">
                                                            {/* <span className="mono commment-time pe-1 text-black-50">{dayjs(comment.createdAt).fromNow()}</span> */}
                                                            {reportPreview.isEdited && (
                                                                <span className="text-black">edited</span>
                                                            )}
                                                        </p>
                                                        <p className="h-100 m-0 mono fs-5">
                                                            <span className="fw-medium pe-1">{reportPreview?.user?.name?.[0].toUpperCase() + reportPreview?.user?.name?.slice(1)}</span>
                                                            <span className="text-info fs-6">@{reportPreview.repliedTo.name}</span>
                                                            {reportPreview.content}
                                                        </p>
                                                    </Col>


                                                </Row>
                                                <Row className="py-5 flex-column">
                                                    <Col className="col-12 mono">
                                                        <Form>
                                                            {error && (
                                                                <Alert variant="warning">{error}</Alert>
                                                            )}
                                                            {reportReasons.map((reasons) => (
                                                                <Form.Check id={reasons.id} key={reasons.id} checked={selectedReasons.includes(reasons.id)} label={reasons.label} type="checkbox" className="fs-4" onChange={() => handleCheckToggle(reasons.id)} />
                                                            ))}

                                                        </Form>
                                                    </Col>
                                                    <Col className="col-12 my-3">
                                                        <Button className="my-2 custom-btn border-0" onClick={handleSubmit} disabled={selectedReasons.length === 0}>
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="user">
                                        <Card className="bottomborder w-100 p-3 my-2">
                                            <div>
                                                <Row>
                                                    <Col className="flex-grow-0 p-0">
                                                        <Image src={reportPreview.user.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${reportPreview.user.profilePic}` : (defaultUser)} height="60px" width="60px" roundedCircle className="shadow profile-picture" />

                                                    </Col>
                                                    <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                        <h4 className="m-0 libre-heading">
                                                            {reportPreview?.user?.name?.[0].toUpperCase() + reportPreview?.user?.name?.slice(1)}
                                                        </h4>
                                                    </Col>

                                                </Row>
                                                <Row className="py-5 flex-column">
                                                    <Col className="col-12 mono">
                                                        <Form>
                                                            {userError && (
                                                                <Alert variant="warning">{userError}</Alert>
                                                            )}
                                                            {reportReasons.map((reasons) => (
                                                                <Form.Check id={reasons.id} key={reasons.id} checked={selectedUserReasons.includes(reasons.id)} label={reasons.label} type="checkbox" className="fs-4" onChange={() => handleUserReport(reasons.id)} />
                                                            ))}

                                                        </Form>
                                                    </Col>
                                                    <Col className="col-12 my-3">
                                                        <Button className="my-2 custom-btn border-0" onClick={handleSubmitOfUser} disabled={selectedUserReasons.length === 0}>
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            </div>

                                        </Card>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Modal.Body>

            </Modal>
        )
    }
    return null;
}

export default ReportWindow;