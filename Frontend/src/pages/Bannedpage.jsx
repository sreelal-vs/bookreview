import { useNavigate } from "react-router-dom";

import { Button, Col } from "react-bootstrap";
import { FaBan } from "react-icons/fa";

export default function Bannedpage() {
  const navigate = useNavigate();

  return (
    
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="section-size px-3 px-sm-5 px-lg-0">
                <Col className="text-center libre-heading">
                <FaBan className="text-danger" size={30}/>
                <h4 className="fw-semibold">Your account has been banned</h4>
                <p>You can't log in or post on BookNest right now. Your reviews and comments are hidden from other readers.</p>
                </Col>
                
                <Col className="text-center mono">
                <a href="mailto:sevensreelal@gmail.com" className="me-3 custom-btn text-decoration-none text-light" >Contact Support</a>
                <Button className="custom-btn border-0" onClick={()=>{navigate("/signin")}}>Back to Login</Button>
                </Col>
            </div>
        </div>
  );
}