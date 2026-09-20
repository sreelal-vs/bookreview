
import { Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, isAuthChecked } = useSelector(state => state.auth)
    if (!isAuthChecked) {
        return <Row className="loading justify-content-center align-items-center w-100">
            <Spinner animation="border" role="status" >
                <span className="visually-hidden ">Loading...</span>
            </Spinner>
        </Row>
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />
    }
    return children;
}

export default ProtectedRoute;