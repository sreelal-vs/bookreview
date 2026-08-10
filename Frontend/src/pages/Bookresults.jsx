import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/Pagination";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchAsyncThunk } from "../Redux/bookSlice";
import "../styles/Cardimg.css"

const Bookresults = () => {
    const [searchParams] = useSearchParams();
    const Query = searchParams.get("q")
    const page = Number(searchParams.get("page"));
    const truncateText=(text,max)=>{
        if(text.length>max){
            return text.slice(0,max) + "..."
        }else{
            return text
        }
    }



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(searchAsyncThunk({ Query, page }))
    }, [dispatch, page, Query])
    const { books } = useSelector((state) => state.book)

    return (
        <div className="flex-grow-1 d-flex flex-column align-items-center  px-3 px-sm-5 ">
            <Row className="w-75 resulthead">
                <h2  className="libre-heading ">Result for "{Query}"</h2>
            </Row>
            <Row xs={2} sm={3} lg={4} className="section-size result-center g-4">
                
                {books.map((book) => (
                    <Col>
                        <Card className="border-0">
                            <div className="card-img-wrap p-3">
                                <Card.Img   src={`https://covers.openlibrary.org/b/id/${book.coverpicid}-M.jpg`} />
                            </div>
                            <Card.Body>
                                <Card.Title className="libre-heading">{truncateText(book.title,25)}</Card.Title>
                                <Card.Subtitle className="mt-1 text-black-50">{book.author}</Card.Subtitle>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                <Pagination />
            </Row>
        </div>
    )
}

export default Bookresults;