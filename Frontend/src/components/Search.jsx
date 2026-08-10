import { useEffect, useState } from "react";
import { Col, Form, FormControl, Image, ListGroup, Row } from "react-bootstrap"

import { addQuery, searchAsyncThunk } from "../Redux/bookSlice";
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom";
const Search = ({ showSearch }) => {
    const page = 1;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { books, Query, loading } = useSelector((state) => state.book)
    const [showSuggestions,setShowSuggestions] = useState(false);
    
    
    useEffect(() => {
        let timeout = null;
        if(location.pathname === "/results") return;
        if(Query.length<1)return
        timeout = setTimeout(() => {
            dispatch(searchAsyncThunk({Query,page}))
        }, 800)
        return () => clearTimeout(timeout);
    }, [Query, dispatch,location.pathname,page])

    const handleEvent = (value) => {
        dispatch(addQuery(value))
    }


    return (
        <Form onSubmit={(e) => {
            e.preventDefault()  
            setShowSuggestions(false)         
            navigate({
                pathname:"/results",
                search:`?q=${Query}&page=1`
            })
        }}
            className={`flex-grow-1    mt-1  mt-lg-0  searchwrapper ${showSearch ? "active" : ""}`}>
            <FormControl
                type="Search"
                placeholder="Search"
                aria-label="search"
                value={Query}
                className="d-lg-block "
                onChange={(e) => {
                    if(location.pathname !== "/results"){
                        setShowSuggestions(true);
                    }
                    handleEvent(e.target.value)
                }}


            >
            </FormControl>

            {!loading && (
                <ListGroup className={`search-results  ${books.length && Query && showSuggestions ? "show" : ""}`}>
                    {books.slice(0, 3).map((item, i) => (
                        <ListGroup.Item className="result-items" key={i}>
                            <Row>
                                <Col lg={3} className="d-none d-lg-block">
                                    {item.coverpicid ? (<Image
                                        className="h-100 w-100"
                                        src={`https://covers.openlibrary.org/b/id/${item.coverpicid}-M.jpg`}
                                        height="50px"
                                    />) : (
                                        <Image
                                            src="./assets/defaultcover.png"
                                            height="50px"
                                        />
                                    )}
                                </Col>
                                <Col>
                                    <p className="m-0 heading">{item.title}</p>
                                    <p className="m-0 mono">{item.author}</p>

                                </Col>

                            </Row>
                        </ListGroup.Item>
                    ))}

                    {books.length > 10 &&
                        <ListGroup.Item className="text-center mono result-items"
                            style={{ cursor: "pointer" }}
                        >See results</ListGroup.Item>
                    }

                </ListGroup>
            )}

        </Form>
    )
}


export default Search;