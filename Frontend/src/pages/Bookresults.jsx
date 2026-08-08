import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";


const Bookresults = () => {

    const {books} = useSelector((state)=>state.book)

    return (
        <div className="flex-grow-1 d-flex justify-content-center">
           <Row className="section-size px-3 px-sm-5 px-xxl-0 ">
               
           </Row>
        </div>
    )
}

export default Bookresults;