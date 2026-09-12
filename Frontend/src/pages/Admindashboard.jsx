import { Col, Image, Nav, Row, Tab, TabContainer, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import defaultUser from "../assets/defaultPic.jpg"

const Admindashboard = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <div className="flex-grow-1 d-flex justify-content-center">
            {user && (
                <TabContainer defaultActiveKey="" className="">
                    <Row className="section-size px-3 px-xxl-0 ">
                        <Col className="col-lg-3 col-sm-2 col-3">
                            <Nav className="d-flex flex-column pt-5" variant="underline">
                                <Nav.Item >
                                    <Nav.Link eventKey="dashboard" >Dashboard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link eventKey="flagged-comments" >
                                        flagged comments
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item >
                                    <Nav.Link eventKey="flagged-comments" >
                                        Edit Profile
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
                                                    {/* <span className="text-center fs-2">{readListBooks.length}</span> */}
                                                    <span >BOOKS READ</span>
                                                </div>
                                                <div className="d-flex flex-column">
                                                    {/* <span className="text-center fs-2">{reviews.length}</span> */}
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
                                                    {/* {reviews.map((review, i) => {
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
                                                    })} */}
                                                </Tab>
                                                <Tab eventKey="finishedbooks" title="Finished Books">
                                                    <Row xs={2} sm={3} lg={4}>
                                                        {/* {readListBooks.map((item, i) => (
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
                                                        ))} */}
                                                    </Row>
                                                </Tab>

                                            </Tabs>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="editprofile" className="py-5">

                                   

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