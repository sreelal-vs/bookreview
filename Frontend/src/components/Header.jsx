
import { useState } from "react";
import { Button, Container, Dropdown, DropdownDivider, DropdownMenu, DropdownToggle, Image, ListGroup, Nav, Navbar, Offcanvas } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutThunk } from "../Redux/authSlice";
import { addQuery } from "../Redux/bookSlice";

function Header() {
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [showBg, setshowBg] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { user, isAuthenticated, isAuthChecked } = useSelector((state) => state.auth)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogout = () =>{
        
        handleClose();
        dispatch(userLogoutThunk());
    }


    return (

        <>
            <Navbar
                expand="lg"
                expanded={expanded}
                onToggle={(isopen) => {

                    setExpanded(isopen);
                    isopen && setShowSearch(false);

                }}
                className="mx-md-4 mx-sm-2">
                <Container className="d-lg-flex d-block position-relative">
                    <div className="d-flex align-items-center">
                        <div>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => {
                                setshowBg(true)


                            }} className="custom-toggle">

                            </Navbar.Toggle>
                            <Navbar.Brand className="brand-name"><Image src="./booknestfavicon.png" alt="logo" className="mx-2" />
                                BookNest
                            </Navbar.Brand>
                        </div>

                        <Nav.Link

                            onClick={() => {
                                !showSearch && setExpanded(false)
                                setShowSearch(!showSearch)
                                {showSearch&&dispatch(addQuery(""))}
                            }}
                            className="d-lg-none ms-auto"
                        ><IoIosSearch size={25} /></Nav.Link>

                        <Nav.Link className="d-lg-none d-block"><CiHeart size={25} /></Nav.Link>
                        {isAuthChecked ? (
                            isAuthenticated ?
                                (
                                    <div className="d-lg-none d-block ms-3">
                                        <Image src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : `http://localhost:5000/Uploads/defaultPic.jpg`} height="50px" width="50px" roundedCircle onClick={handleShow} />

                                        <Offcanvas show={show} onHide={handleClose} placement="end" className="custom-offcan">
                                            <Offcanvas.Header closeButton>
                                                <p className="flex-grow-1 text-center">{user.email}</p>
                                            </Offcanvas.Header>
                                            <Offcanvas.Body className="pt-0">
                                                <div className="d-flex flex-column align-items-center">
                                                    <Image src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : `http://localhost:5000/Uploads/defaultPic.jpg`} height="100px" width="100px" roundedCircle />
                                                    <h5>Hi,{user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h5>
                                                </div>
                                                <ListGroup className="pt-4">

                                                    <ListGroup.Item>Manage account</ListGroup.Item>
                                                    <ListGroup.Item onClick={handleLogout}>Logout</ListGroup.Item>

                                                </ListGroup>
                                            </Offcanvas.Body>
                                        </Offcanvas>
                                    </div>
                                )
                                : (<Button onClick={() => { navigate('/signin') }} className="d-lg-none d-block custom-btn ms-3 border-0">Sign in</Button>))
                            : null}
                    </div>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3 ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3 ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/Discovery">Discoveries</Nav.Link>
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3  ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/aboutus">About Us</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                    <Nav.Link className="d-lg-block d-none mx-2" as={Link} to={"/favourites"}><CiHeart size={25} /></Nav.Link>


                    <Search showSearch={showSearch} />

                    {isAuthChecked ? (
                        isAuthenticated ?
                            (
                                <Dropdown align="end" className="d-lg-block d-none ms-3">
                                    <DropdownToggle as="div" >
                                        <Image src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : `http://localhost:5000/Uploads/defaultPic1.jpg`} height="50px" width="50px" roundedCircle />
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <div className="d-flex flex-column p-3 align-items-center">
                                            <Image src={user.profilePic ? `http://localhost:5000/${user.profilePic}` : `http://localhost:5000/Uploads/defaultPic1.jpg`} height="50px" width="50px" roundedCircle />
                                            <h5 className="m-0"> Hi,{user.name.charAt(0).toUpperCase() + user.name.slice(1)}!</h5>

                                            <p className="text-muted small">{user.email}</p>
                                        </div>
                                        <DropdownDivider />
                                        <Dropdown.Item>Manage account</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate('/library') }}>Library</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { navigate('/profile') }}>Profile</Dropdown.Item>
                                        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>

                                    </DropdownMenu>
                                </Dropdown>
                            )
                            : (<Button onClick={() => { navigate('/signin') }} className="d-lg-block d-none custom-btn ms-3 border-0">Sign in</Button>))
                        : null}
                </Container>
            </Navbar>
        </>
    )
}

export default Header;