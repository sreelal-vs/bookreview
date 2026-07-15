
import { useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { IoIosSearch } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import Search from "./Search";

function Header() {

    const [showSearch, setShowSearch] = useState(false);
    const [showBg, setshowBg] = useState(false);
    const [expanded, setExpanded] = useState(false);



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
                            <Navbar.Brand className="brand-name"><Image src='./booknestfavicon.png' alt="logo" className="mx-2" />
                                BookNest
                            </Navbar.Brand>
                        </div>

                        <Nav.Link

                            onClick={() => {
                               !showSearch&&setExpanded(false)
                               
                                setShowSearch(!showSearch)



                                console.log("search-->", showSearch);
                            }}
                            className="d-lg-none ms-auto"
                        ><IoIosSearch size={25} /></Nav.Link>

                        <Nav.Link className="d-lg-none d-block"><CiHeart size={25} /></Nav.Link>
                        <Button className="d-lg-none d-block custom-btn ms-3 border-0">Sign in</Button>
                    </div>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3 ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/">Home</Nav.Link>
                            <Nav.Link className={`mx-0 mx-lg-3  px-lg-0 px-3 ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/">Latest</Nav.Link>
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3 ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/">Categories</Nav.Link>
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3  d-lg-none d-xl-block ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/">About Us</Nav.Link>
                            <Nav.Link className={`mx-0 mx-lg-3 px-lg-0 px-3 ${showBg ? "showborder" : "noborder"} inter`} as={Link} to="/">Contact</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>
                    <Nav.Link className="d-lg-block d-none mx-2"><CiHeart size={25} /></Nav.Link>

                    

                    <Search showSearch={showSearch} />
                    <Button className="d-lg-block d-none custom-btn mx-3 border-0">Sign in</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;