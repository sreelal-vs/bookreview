import { useEffect, useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap"
import {useDispatch} from "react-router-dom"

const Search = ({showSearch}) => {
    const [Query, setQuery] = useState("");
    const dispatch = useDispatch()
    useEffect(()=>{
        let timeout = null;
        
        timeout = setTimeout(()=>{
            dispatch(searchAsyncThunk(Query))
        },800)
        return () => clearTimeout(timeout);
    },[Query,dispatch])
    
    const handleEvent = (value) => {
        setQuery(value)            
    }
    

    return (
        <Form className={`flex-grow-1    mt-1  mt-lg-0  searchwrapper ${showSearch ? "active" : ""}`}>
            <FormControl
                type="Search"
                placeholder="Search"
                aria-label="search"
                value={Query}
                className="d-lg-block "
                onChange={(e) => handleEvent(e.target.value)}
            >
            </FormControl>
            <ListGroup className={`search-results  ${results.length ? "show" : ""}`}>
                {results.slice(0, 10).map((item, i) => (
                    <ListGroup.Item className="result-items" key={i}>{item}</ListGroup.Item>
                ))}
               
                    {results.length > 10 &&
                        <ListGroup.Item  className="text-center result-items">See results</ListGroup.Item>
                    }
                
            </ListGroup>
        </Form>
    )
}


export default Search;