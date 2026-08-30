import { Card, Col, Image, Row } from "react-bootstrap";
import homepagePic from "../assets/homepagepic1.jpg";
import "../styles/Home.css"
import { HiLibrary } from "react-icons/hi";
import { MdOutlineReviews } from "react-icons/md";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";


const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="flex-grow-1 d-flex justify-content-center">
            <div className="section-size px-3 px-sm-5 px-lg-0 d-flex flex-column">
                <Row sm={2} className="flex-grow-1 explore row-cols-1 py-5 mx-0">
                    <Col className="d-flex flex-column justify-content-center ">
                        <h3 className="libre-heading">Your personal <br />library,<br />reimagined</h3>
                        <p className="mono py-3">
                            Track your reading goals,discover new favourites,<br />and organize your digital shelves with elegant simplicity.<br />The perfect quiet space for dedicated readers
                        </p>
                        <button onClick={()=>{
                            navigate({
                                pathname:"/Discovery"
                            })
                        }} className=" border-0 w-50 p-2 discovery-btn libre-heading">Discoveries &nbsp; <FaArrowRightLong className="hover-arrow"/></button>
                    </Col>
                    <Col>
                        <div className="px-lg-4 py-4">
                            <Image className="object-fit-cover rounded-4" height="400px" width="100%" src={homepagePic} />
                        </div>
                    </Col>
                </Row>
                <h3 className="text-center py-4 libre-heading fw-semibold">Designed for dedicated reader</h3>
                <Row className="flex-grow-1 mb-4 row-cols-1 row-cols-lg-3 g-4 mx-0 px-3">
                    <Col>
                        <Card className="p-5 feature-card">
                            <Card.Header ><HiLibrary size={50} /></Card.Header>
                            <Card.Body>
                                <Card.Title className="libre-heading">Library Tracking</Card.Title>
                                <Card.Text>Log every book you read,organize,them onto custom shelves and track your annual reading goals with intutive progress indicators</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-5 feature-card">
                            <Card.Header><MdOutlineReviews size={50}/></Card.Header>
                            <Card.Body>
                                <Card.Title className="libre-heading">Community reviews</Card.Title>
                                <Card.Text>Share your thought with fellow biblophiles.Write detailed reviews,rate your favourite</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-5 feature-card">
                            <Card.Header><RiCompassDiscoverLine size={50}/></Card.Header>
                            <Card.Body>
                                <Card.Title className="libre-heading">Curate Discoveries</Card.Title>
                                <Card.Text>Find your next adventure with our recommendations </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Home;