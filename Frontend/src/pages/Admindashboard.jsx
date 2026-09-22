import { Button, Card, Col, Image, Nav, Row, Tab, TabContainer, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import defaultUser from "../assets/defaultPic.jpg"
import defaultPic from "../assets/defaultcover.png"
import { HiShieldCheck } from "react-icons/hi2";
import { FaCircleDown } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { commentReportsThunk, FlagCommentThunk, FlagReviewThunk, handleBanThunk, reviewReportsThunk, userReportsThunk } from "../Redux/reportsSlice";
import { getAllUsersThunk, updateRole } from "../Redux/userSlice";
import dayjs from "dayjs"
import { reasonsLabel } from "../assets/assetsFunction";
import UserReviews from "../components/UserReviews";
import UserComments from "../components/UserComments";

const Admindashboard = () => {
    const { user } = useSelector(state => state.auth);
    const { users } = useSelector(state => state.user);
    const { userReports, commentReports, reviewReports } = useSelector(state => state.reports);
    const [showReviews, setShowReviews] = useState()
    const [showComments, setShowComments] = useState()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(reviewReportsThunk());
        dispatch(userReportsThunk());
        dispatch(commentReportsThunk());
        dispatch(getAllUsersThunk())
    }, [dispatch])
    const UpdateRole = (role, id) => {
        dispatch(updateRole({ role, userId: id }))
    }
    const handleFlagComment = (reportId, reportStatus, flag) => {
        dispatch(FlagCommentThunk({ reportId, reportStatus, flag }));
    }
    const handleFlagReview = (reportId, reportStatus, flag) => {
        dispatch(FlagReviewThunk({ reportId, reportStatus, flag }))
    }
    const handleBanUser = (reportId, reportStatus, ban) => {
        dispatch(handleBanThunk({ reportId, reportStatus, ban }))
    }



    return (
        <div className="flex-grow-1 d-flex justify-content-center">
            {user && (
                <TabContainer defaultActiveKey="users" >
                    <Row className="section-size px-3 px-xxl-0 ">
                        <Col className="col-lg-3 col-sm-2 col-3">
                            <Nav className="d-flex flex-column pt-5 libre-heading fw-semibold" variant="underline">
                                <Nav.Item >
                                    <Nav.Link eventKey="users" >Users</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link eventKey="flagged-contents" >
                                        Flagged Contents
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link eventKey="reported-users" >
                                        Reported Users
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col className="d-flex flex-column">

                            <Tab.Content>
                                <Tab.Pane eventKey="flagged-contents">

                                    <Row className=" flex-grow-1">
                                        <Col>
                                            <Tabs
                                                className="mb-1 libre-heading fs-5  fw-semibold"
                                                defaultActiveKey="reviews"
                                                
                                            >
                                                <Tab eventKey="reviews" title="Reviews" >
                                                    <Tabs defaultActiveKey="unresolved">
                                                        <Tab eventKey="unresolved" title="Unresolved">
                                                            {reviewReports.map((report) => {
                                                                if (report.status === "unresolved") {
                                                                    return <Card key={report._id} className="bottomborder w-100 p-3 my-2">
                                                                        <div>
                                                                            <Row>
                                                                                <Col className="flex-grow-0 p-0">
                                                                                    <Image src={report.targetId.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${report.targetId.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={report.targetId.book.title} />
                                                                                </Col>
                                                                                <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                                    <h4 className="m-0 libre-heading">
                                                                                        {report.targetId?.book?.title?.[0].toUpperCase() + report.targetId?.book?.title?.slice(1)}
                                                                                    </h4>
                                                                                    <span className="time mono">{"Posted on " + dayjs(report.targetId.createdAt).format('DD-MM-YYYY')}</span>

                                                                                </Col>
                                                                                <Col className="mono flex-grow-0 d-flex flex-column align-items-center">

                                                                                    <span>{report.targetId.rating}/5</span>

                                                                                </Col>
                                                                            </Row>


                                                                        </div>
                                                                        <p className="my-2 topborder pt-3 fs-2 mono">{report.targetId.content}</p>
                                                                        <div className="d-flex gap-2">
                                                                            <p className="m-0 mono fw-medium text-black-50">{report.targetId.likes ? report.targetId.likes.length : ""} likes </p>
                                                                        </div>
                                                                        <Row className="justify-content-center bg-body rounded-1">
                                                                            <Col className=" col-10 py-2 d-flex flex-column">
                                                                                {report.violations?.map((violation, i) => (
                                                                                    <span key={i} className="mono fs-6 text-danger">{reasonsLabel(violation)}</span>

                                                                                ))}
                                                                            </Col>
                                                                            <div className="py-2 d-flex gap-1">
                                                                                <Button className="custom-btn border-0" onClick={() => handleFlagReview(report._id, "resolved", true)}>Flag the review</Button>
                                                                                <Button className="custom-btn border-0" onClick={() => handleFlagReview(report._id, "rejected", true)}>Reject the report</Button>
                                                                            </div>



                                                                        </Row>
                                                                    </Card>
                                                                }
                                                            })}
                                                        </Tab>
                                                        <Tab eventKey="resolved" title="resolved">
                                                            {reviewReports.map((report) => {
                                                                if (report.status === "resolved") {
                                                                    return <Card key={report._id} className="bottomborder w-100 p-3 my-2">
                                                                        <div>
                                                                            <Row>
                                                                                <Col className="flex-grow-0 p-0">
                                                                                    <Image src={report.targetId.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${report.targetId.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={report.targetId.book.title} />
                                                                                </Col>
                                                                                <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                                    <h4 className="m-0 libre-heading">
                                                                                        {report.targetId?.book?.title?.[0].toUpperCase() + report.targetId?.book?.title?.slice(1)}
                                                                                    </h4>
                                                                                    <span className="time mono">{"Posted on " + dayjs(report.targetId.createdAt).format('DD-MM-YYYY')}</span>

                                                                                </Col>
                                                                                <Col className="mono flex-grow-0 d-flex flex-column align-items-center">

                                                                                    <span>{report.targetId.rating}/5</span>

                                                                                </Col>
                                                                            </Row>


                                                                        </div>
                                                                        <p className="my-2 topborder pt-3 fs-2 mono">{report.targetId.content}</p>
                                                                        <div className="d-flex gap-2">
                                                                            <p className="m-0 mono fw-medium text-black-50">{report.targetId.likes ? report.targetId.likes.length : ""} likes </p>
                                                                        </div>
                                                                        <Row className="justify-content-center bg-body rounded-1">
                                                                            <Col className=" col-10 py-2 d-flex flex-column">
                                                                                {report.violations?.map((violation, i) => (
                                                                                    <span key={i} className="mono fs-6 text-danger">{reasonsLabel(violation)}</span>

                                                                                ))}
                                                                            </Col>
                                                                            <div className="py-2"><Button className="custom-btn border-0" onClick={() => handleFlagReview(report._id, "rejected", false)}>Unflag the review</Button></div>

                                                                        </Row>
                                                                    </Card>
                                                                }
                                                            })}
                                                        </Tab>
                                                        <Tab eventKey="rejected" title="rejected">
                                                            {reviewReports.map((report) => {
                                                                if (report.status === "rejected") {
                                                                    return <Card key={report._id} className="bottomborder w-100 p-3 my-2">
                                                                        <div>
                                                                            <Row>
                                                                                <Col className="flex-grow-0 p-0">
                                                                                    <Image src={report.targetId.book?.coverpicid ? `https://covers.openlibrary.org/b/id/${report.targetId.book.coverpicid}-M.jpg` : defaultPic} height="140px" alt={report.targetId.book.title} />
                                                                                </Col>
                                                                                <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                                    <h4 className="m-0 libre-heading">
                                                                                        {report.targetId?.book?.title?.[0].toUpperCase() + report.targetId?.book?.title?.slice(1)}
                                                                                    </h4>
                                                                                    <span className="time mono">{"Posted on " + dayjs(report.targetId.createdAt).format('DD-MM-YYYY')}</span>

                                                                                </Col>
                                                                                <Col className="mono flex-grow-0 d-flex flex-column align-items-center">

                                                                                    <span>{report.targetId.rating}/5</span>

                                                                                </Col>
                                                                            </Row>


                                                                        </div>
                                                                        <p className="my-2 topborder pt-3 fs-2 mono">{report.targetId.content}</p>
                                                                        <div className="d-flex gap-2">
                                                                            <p className="m-0 mono fw-medium text-black-50">{report.targetId.likes ? report.targetId.likes.length : ""} likes </p>
                                                                        </div>
                                                                        <Row className="justify-content-center bg-body rounded-1">
                                                                            <Col className=" col-10 py-2 d-flex flex-column">
                                                                                {report.violations?.map((violation, i) => (
                                                                                    <span key={i} className="mono fs-6 text-danger">{reasonsLabel(violation)}</span>

                                                                                ))}
                                                                            </Col>
                                                                            <div className="py-2"><Button className="custom-btn border-0" onClick={() => handleFlagReview(report._id, "unresolved", false)}>Recheck</Button></div>

                                                                        </Row>
                                                                    </Card>
                                                                }
                                                            })}
                                                        </Tab>
                                                    </Tabs>

                                                </Tab>
                                                <Tab eventKey="comments" title="Comments">
                                                    <Tabs defaultActiveKey="unresolved">
                                                        <Tab eventKey="unresolved" title="unresolved">
                                                            {commentReports?.map(report => {
                                                                if (report.status === "unresolved") {
                                                                    return <div key={report._id} className="mb-2  ">
                                                                        <Row className="bg-secondary-subtle rounded-top p-3 mt-1">
                                                                            <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                                                                <Image src={report.targetId.user?.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${report.targetId.user.profilePic}` : (defaultUser)} height="50px" width="50px" roundedCircle />
                                                                            </Col>
                                                                            <Col className=" d-flex justify-content-center flex-column col-8">
                                                                                <p className="h-100 m-0 mono fs-5">
                                                                                    <span className="fw-medium pe-1">{report.targetId?.user?.name?.[0].toUpperCase() + report.targetId?.user?.name?.slice(1)}</span>
                                                                                    {report.targetId?.repliedTo?.name && (
                                                                                        <span className="text-info fs-6">@{report.targetId.repliedTo.name}</span>
                                                                                    )}
                                                                                    {report.targetId.content}
                                                                                </p>
                                                                            </Col>


                                                                        </Row>
                                                                        <Row className="justify-content-center bg-body rounded-bottom">
                                                                            <Col className=" col-10 py-2 d-flex flex-column">
                                                                                {report.violations?.map((violation, i) => (
                                                                                    <span key={i} className="mono fs-6 text-danger">{reasonsLabel(violation)}</span>

                                                                                ))}
                                                                            </Col>
                                                                            <div className="py-2 d-flex gap-2">
                                                                                <Button className="custom-btn border-0" onClick={() => handleFlagComment(report._id, "resolved", true)}>Flag the comment</Button>
                                                                                <Button className="custom-btn border-0" onClick={() => handleFlagComment(report._id, "rejected", false)}>Reject the report</Button>
                                                                            </div>



                                                                        </Row>
                                                                    </div>
                                                                }
                                                            })}
                                                        </Tab>
                                                        <Tab eventKey="resolved" title="resolved">
                                                            {commentReports?.map(report => {
                                                                if (report.status === "resolved") {
                                                                    return <div key={report._id} className="mb-2  ">
                                                                        <Row className="bg-secondary-subtle rounded-top p-3 mt-1">
                                                                            <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                                                                <Image src={report.targetId.user?.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${report.targetId.user.profilePic}` : (defaultUser)} height="50px" width="50px" roundedCircle />
                                                                            </Col>
                                                                            <Col className=" d-flex justify-content-center flex-column col-8">
                                                                                <p className="h-100 m-0 mono fs-5">
                                                                                    <span className="fw-medium pe-1">{report.targetId?.user?.name?.[0].toUpperCase() + report.targetId?.user?.name?.slice(1)}</span>
                                                                                    {report.targetId?.repliedTo?.name && (
                                                                                        <span className="text-info fs-6">@{report.targetId.repliedTo.name}</span>
                                                                                    )}
                                                                                    {report.targetId.content}
                                                                                </p>
                                                                            </Col>


                                                                        </Row>
                                                                        <Row className="justify-content-center bg-body rounded-bottom">
                                                                            <Col className=" col-10 py-2 d-flex flex-column">
                                                                                {report.violations?.map((violation, i) => (
                                                                                    <span key={i} className="mono fs-6 text-danger">{reasonsLabel(violation)}</span>

                                                                                ))}
                                                                            </Col>
                                                                            <div className="py-2"><Button className="custom-btn border-0" onClick={() => handleFlagComment(report._id, "rejected", false)}>Unflag the comment</Button></div>

                                                                        </Row>
                                                                    </div>
                                                                }
                                                            })}
                                                        </Tab>
                                                        <Tab eventKey="rejected" title="rejected">
                                                            {commentReports?.map(report => {
                                                                if (report.status === "rejected") {
                                                                    return <div key={report._id} className="mb-2  ">
                                                                        <Row className="bg-secondary-subtle rounded-top p-3 mt-1">
                                                                            <Col className=" p-0 col-2 p-0 d-flex justify-content-center">
                                                                                <Image src={report.targetId.user?.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${report.targetId.user.profilePic}` : (defaultUser)} height="50px" width="50px" roundedCircle />
                                                                            </Col>
                                                                            <Col className=" d-flex justify-content-center flex-column col-8">
                                                                                <p className="h-100 m-0 mono fs-5">
                                                                                    <span className="fw-medium pe-1">{report.targetId?.user?.name?.[0].toUpperCase() + report.targetId?.user?.name?.slice(1)}</span>
                                                                                    {report.targetId?.repliedTo?.name && (
                                                                                        <span className="text-info fs-6">@{report.targetId.repliedTo.name}</span>
                                                                                    )}
                                                                                    {report.targetId.content}
                                                                                </p>
                                                                            </Col>


                                                                        </Row>
                                                                        <Row className="justify-content-center bg-body rounded-bottom">
                                                                            <Col className=" col-10 py-2 d-flex flex-column">
                                                                                {report.violations?.map((violation, i) => (
                                                                                    <span key={i} className="mono fs-6 text-danger">{reasonsLabel(violation)}</span>

                                                                                ))}
                                                                            </Col>
                                                                            <div className="py-2"><Button className="custom-btn border-0" onClick={() => handleFlagComment(report._id, "unresolved", false)}>Recheck</Button></div>

                                                                        </Row>
                                                                    </div>
                                                                }
                                                            })}
                                                        </Tab>
                                                    </Tabs>
                                                </Tab>

                                            </Tabs>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="users" className="py-3 px-2">
                                    {users.length > 0 ? (users.map(user => (
                                        <div key={user._id}>
                                            <Row className="p-3 bg-body mb-3">
                                                <Col className="flex-grow-0 p-0">
                                                    <Image src={user.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${user.profilePic}` : (defaultUser)} height="60px" width="60px" roundedCircle className="shadow profile-picture" />

                                                </Col>
                                                <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                    <h4 className="m-0 libre-heading">
                                                        {user?.name?.[0].toUpperCase() + user?.name?.slice(1)} <span className="mono fs-6">&nbsp;role:{user.role}</span>
                                                    </h4>
                                                    <p>{user.email}</p>

                                                </Col>
                                                <div>
                                                    <Col>{user.role === "user" ? (
                                                        <Button className="promote-btn" onClick={() => UpdateRole("admin", user._id)}><HiShieldCheck className="mb-1" />&nbsp;Promote to Admin</Button>
                                                    ) : (
                                                        <Button className="demote-btn" onClick={() => UpdateRole("user", user._id)}><FaCircleDown className="mb-1" />&nbsp;Demote</Button>
                                                    )}</Col>
                                                </div>
                                            </Row>

                                        </div>
                                    ))) : (<h4 className="m-0 libre-heading">
                                        There is no users yet
                                    </h4>)}
                                </Tab.Pane>
                                <Tab.Pane eventKey="reported-users" className="py-3 px-2">
                                    <Tabs defaultActiveKey="Unresolved">
                                        <Tab eventKey="Unresolved" title="Pending Reports">
                                            {userReports.length > 0 ? (userReports.map(report => {
                                                if (report.status === "unresolved") {
                                                    return <div key={report._id}>
                                                        <Row className="p-3 bg-body mb-3">
                                                            <Col className="flex-grow-0 p-0">
                                                                <Image src={report.targetId.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${report.targetId.profilePic}` : (defaultUser)} height="60px" width="60px" roundedCircle className="shadow profile-picture" />

                                                            </Col>
                                                            <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                <div className="d-flex">
                                                                    <h4 className="m-0 libre-heading me-2">
                                                                        {report.targetId?.name?.[0].toUpperCase() + report.targetId?.name?.slice(1)} <span className="mono fs-6">&nbsp;role:{report.targetId.role}</span>
                                                                    </h4>
                                                                    <Button className="custom-btn border-0 p-1  me-2 mono" onClick={() => setShowReviews((prev) => prev ? null : report.targetId._id)}>Reviews</Button>
                                                                    <Button className="custom-btn border-0 p-1  me-2 mono" onClick={() => setShowComments((prev) => prev ? null : report.targetId._id)}>Comments</Button>
                                                                    {report.targetId._id === showReviews && (
                                                                        <UserReviews show={report.targetId._id === showReviews} onHide={() => setShowReviews(null)} userId={showReviews} />

                                                                    )}
                                                                    {report.targetId._id === showComments && (
                                                                        <UserComments show={report.targetId._id === showComments} onHide={() => setShowComments(null)} userId={showComments} />

                                                                    )}


                                                                </div>
                                                                <p>{report.targetId.email}</p>

                                                            </Col>
                                                            <div>
                                                                <Col className="mt-3">
                                                                    <Button className="bg-danger custom-btn border-0 p-1 me-2 mono" onClick={() => { handleBanUser(report._id, "resolved", true) }}>Ban</Button>
                                                                    <Button className="bg-success custom-btn border-0 p-1 me-2 mono" onClick={() => { handleBanUser(report._id, "reject", false) }}>Reject</Button>

                                                                </Col>
                                                            </div>
                                                        </Row>

                                                    </div>
                                                }
                                            })) : (<h4 className="m-0 libre-heading">
                                                There is no users reports
                                            </h4>)}
                                        </Tab>
                                        <Tab eventKey="banned" title="Banned Users">
                                            {userReports.length > 0 ? (userReports.map(report => {

                                                if (report.status === "resolved") {


                                                    return <div key={report._id}>
                                                        <Row className="p-3 bg-body mb-3">
                                                            <Col className="flex-grow-0 p-0">
                                                                <Image src={report.targetId.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${report.targetId.profilePic}` : (defaultUser)} height="60px" width="60px" roundedCircle className="shadow profile-picture" />

                                                            </Col>
                                                            <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                <div className="d-flex">
                                                                    <h4 className="m-0 libre-heading me-2">
                                                                        {report.targetId?.name?.[0].toUpperCase() + report.targetId?.name?.slice(1)} <span className="mono fs-6">&nbsp;role:{report.targetId.role}</span>
                                                                    </h4>
                                                                    <Button className="custom-btn border-0 p-1  me-2 mono" onClick={() => setShowReviews((prev) => prev ? null : report.targetId._id)}>Reviews</Button>
                                                                    <Button className="custom-btn border-0 p-1  me-2 mono" onClick={() => setShowComments((prev) => prev ? null : report.targetId._id)}>Comments</Button>
                                                                    {report.targetId._id === showReviews && (
                                                                        <UserReviews show={report.targetId._id === showReviews} onHide={() => setShowReviews(null)} userId={showReviews} />

                                                                    )}
                                                                    {report.targetId._id === showComments && (
                                                                        <UserComments show={report.targetId._id === showComments} onHide={() => setShowComments(null)} userId={showComments} />

                                                                    )}


                                                                </div>
                                                                <p>{report.targetId.email}</p>

                                                            </Col>
                                                            <div>
                                                                <Col className="mt-3">
                                                                    <Button className="bg-danger custom-btn border-0 p-1 me-2 mono" onClick={() => { handleBanUser(report._id, "rejected", false) }}>Unban</Button>

                                                                </Col>
                                                            </div>
                                                        </Row>

                                                    </div>
                                                }
                                            })) : (<h4 className="m-0 libre-heading">
                                                There is no users reports
                                            </h4>)}
                                        </Tab>
                                        <Tab eventKey="rejected" title="Rejected Reports">
                                            {userReports.length > 0 ? (userReports.map(report => {
                                                if (report.status === "rejected") {
                                                    return <div key={report._id}>
                                                        <Row className="p-3 bg-body mb-3">
                                                            <Col className="flex-grow-0 p-0">
                                                                <Image src={report.targetId.profilePic ? `${import.meta.env.VITE_BASEURL}/Uploads/${report.targetId.profilePic}` : (defaultUser)} height="60px" width="60px" roundedCircle className="shadow profile-picture" />

                                                            </Col>
                                                            <Col className="flex-grow-1 d-flex justify-content-center flex-column">
                                                                <div className="d-flex">
                                                                    <h4 className="m-0 libre-heading me-2">
                                                                        {report.targetId?.name?.[0].toUpperCase() + report.targetId?.name?.slice(1)} <span className="mono fs-6">&nbsp;role:{report.targetId.role}</span>
                                                                    </h4>
                                                                    <Button className="custom-btn border-0 p-1  me-2 mono" onClick={() => setShowReviews((prev) => prev ? null : report.targetId._id)}>Reviews</Button>
                                                                    <Button className="custom-btn border-0 p-1  me-2 mono" onClick={() => setShowComments((prev) => prev ? null : report.targetId._id)}>Comments</Button>
                                                                    {report.targetId._id === showReviews && (
                                                                        <UserReviews show={report.targetId._id === showReviews} onHide={() => setShowReviews(null)} userId={showReviews} />

                                                                    )}
                                                                    {report.targetId._id === showComments && (
                                                                        <UserComments show={report.targetId._id === showComments} onHide={() => setShowComments(null)} userId={showComments} />

                                                                    )}


                                                                </div>
                                                                <p>{report.targetId.email}</p>

                                                            </Col>
                                                            <div>
                                                                <Col className="mt-3">
                                                                    <Button className="bg-danger custom-btn border-0 p-1 me-2 mono" onClick={() => { handleBanUser(report._id, "unresolved", false) }}>Recheck</Button>
                                                                </Col>
                                                            </div>
                                                        </Row>

                                                    </div>
                                                }
                                            })) : (<h4 className="m-0 libre-heading">
                                                There is no users reports
                                            </h4>)}
                                        </Tab>
                                    </Tabs>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </TabContainer>

            )}
        </div>
    )
}

export default Admindashboard