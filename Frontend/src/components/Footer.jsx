import { Accordion, Col, Container, Row } from "react-bootstrap"
import '../styles/Footer.css';
import { FaHome } from "react-icons/fa";
import {IoMdCall } from "react-icons/io";
import { RiBookShelfFill, RiBookShelfLine } from "react-icons/ri";
import { MdLocalLibrary } from "react-icons/md";
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUser, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";


const Footer = () => {
    const location = useLocation();
    const isActive = location.pathname;
    const { isAuthenticated } = useSelector((state) => state.auth)
    return (
        <Container fluid className="footer py-0 py-md-3">
            <Row className="justify-content-center ">
                <Col md={8}>
                    <Row className="d-none d-lg-flex">
                        <Col className="align-content-center pe-5">

                            <ul className="list-unstyled orange-gray spacemono">
                                <h3 className="playfair  text-black-50">Contact Us</h3>
                                <li><FaHome className="mb-1 me-1" />NewYork,NY 10071,US</li>
                                <li><CiMail className="mb-1 me-1" />info@example.com
                                </li>
                                <li><IoMdCall className="mb-1 me-1" />+01 234 56788</li>
                                <li><MdLocalLibrary className="mb-1 me-1" />+01 555 56788</li>
                            </ul>

                        </Col>
                        <Col>
                            <ul className="list-unstyled orange-gray spacemono">
                                <h3 className="playfair  text-black-50">Explore</h3>
                                <li>Home</li>
                                <li>Blog
                                </li>
                                <li>Destinations</li>
                                <li>Contact</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul className="list-unstyled orange-gray spacemono">
                                <h3 className="playfair  text-black-50">Connect</h3>
                                <li>Facebook</li>
                                <li>Instagram</li>
                                <li>Twitter</li>
                                <li>Youtube</li>
                            </ul>
                        </Col>
                        <Col>
                            <ul className="list-unstyled orange-gray spacemono">
                                <h3 className="playfair text-black-50">Company</h3>
                                <li>About Us</li>
                                <li>Careers</li>
                                <li>Partners</li>
                                <li>Privacy Policy</li>
                            </ul>
                        </Col>
                    </Row>
                    <Row className=" d-none d-md-flex d-lg-none ">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    <h3 className="m-0  text-black-50 fs-5">Contact Us</h3>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled text-black spacemono">
                                        <li><FaHome className="mb-1 me-1" />NewYork,NY 10071,US</li>
                                        <li><CiMail className="mb-1 me-1" />info@example.com
                                        </li>
                                        <li><IoMdCall className="mb-1 me-1" />+01 234 56788</li>
                                        <li><MdLocalLibrary className="mb-1 me-1" />+01 555 56788</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    <h3 className="m-0  text-black-50 fs-5">Explore</h3>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled text-black spacemono">
                                        <li>Home</li>
                                        <li>Blog
                                        </li>
                                        <li>Destinations</li>
                                        <li>Contact</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>
                                    <h3 className="m-0  text-black-50 fs-5">Connect</h3>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled text-black spacemono">
                                        <li>Facebook</li>
                                        <li>Instagram</li>
                                        <li>Twitter</li>
                                        <li>Youtube</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>
                                    <h3 className="m-0  text-black-50 fs-5">Company</h3>

                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-unstyled text-black spacemono">
                                        <li>About Us</li>
                                        <li>Careers</li>
                                        <li>Partners</li>
                                        <li>Privacy Policy</li>
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Row>
                    {isAuthenticated ? (<Row className="d-flex d-md-none m-0 mono phone-nav">
                        <Col className={`text-center  ${isActive === "/" ? "col-active" : ""}`}>

                            <Link to="/" className=" text-decoration-none">

                                {
                                    isActive === "/" ? (
                                        <IoHomeSharp   className="text-black"/>
                                    ) : (
                                        <IoHomeOutline className="phn-nav" />
                                    )
                                }

                                <p className="mb-1  phn-nav d-flex flex-column align-items-center fs-5">Home</p>
                            </Link>
                        </Col>
                        <Col className={`text-center  ${isActive === "/library" ? "col-active" : ""}`}>
                            <Link to="/library" className=" text-decoration-none">
                                {
                                    isActive === "/library" ? (
                                        <RiBookShelfFill  className="text-black"/>
                                    ) : (
                                        <RiBookShelfLine  className="phn-nav" />
                                    )
                                }

                                <p className="mb-1  phn-nav d-flex flex-column align-items-center fs-5">Library</p>
                            </Link>
                        </Col>
                        <Col className={`text-center ${isActive === "/profile" ? "col-active" : ""}`} >
                            <Link to="/profile" className=" text-decoration-none">
                                {
                                    isActive === "/profile" ? (
                                        <HiUser   className="text-black" />
                                    ) : (
                                        <HiOutlineUser  className="phn-nav" />
                                    )
                                }

                                <p className="mb-1 phn-nav d-flex flex-column align-items-center fs-5">Profile</p>
                            </Link>
                        </Col>
                    </Row>) : (
                        <Row className=" d-flex d-md-none fs-6">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <h3 className="m-0  text-black-50 fs-5">Contact Us</h3>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-unstyled text-black spacemono">
                                            <li><FaHome className="mb-1 me-1" />NewYork,NY 10071,US</li>
                                            <li><CiMail className="mb-1 me-1" />info@example.com
                                            </li>
                                            <li><IoMdCall className="mb-1 me-1" />+01 234 56788</li>
                                            <li><MdLocalLibrary className="mb-1 me-1" />+01 555 56788</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        <h3 className="m-0  text-black-50 fs-5">Explore</h3>

                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-unstyled text-black spacemono">
                                            <li>Home</li>
                                            <li>Blog
                                            </li>
                                            <li>Destinations</li>
                                            <li>Contact</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>
                                        <h3 className="m-0  text-black-50 fs-5">Connect</h3>

                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-unstyled text-black spacemono">
                                            <li>Facebook</li>
                                            <li>Instagram</li>
                                            <li>Twitter</li>
                                            <li>Youtube</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>
                                        <h3 className="m-0  text-black-50 fs-5">Company</h3>

                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <ul className="list-unstyled text-black spacemono">
                                            <li>About Us</li>
                                            <li>Careers</li>
                                            <li>Partners</li>
                                            <li>Privacy Policy</li>
                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Row>
                    )}
                </Col>

            </Row>


        </Container>
    )
}


export default Footer;