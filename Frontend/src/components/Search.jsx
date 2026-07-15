import { useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap"

const Search = ({showSearch}) => {
    const [Query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const data = ["harry potter", "chicken soup", "atomic habits", "chikk pett","copy bai"];


    const handleSearch = (value) => {
        setQuery(value);
        if (!value) return setResults([])

        const filter = data.filter((item) => (
            item.toLowerCase().startsWith(value.toLowerCase())
        ));

        setResults(filter);

    }

    return (
        <Form className={`flex-grow-1  position-relative p-0 mt-1  mt-lg-0  searchwrapper ${showSearch ? "active" : ""}`}>
            <FormControl
                type="Search"
                placeholder="Search"
                aria-label="search"
                value={Query}
                className="d-lg-block "
                onChange={(e) => handleSearch(e.target.value)}
            >
            </FormControl>
            <ListGroup className={`search-results mt-2 ${results.length ? "show" : ""}`}>
                {results.slice(0, 10).map((item, i) => (
                    <ListGroup.Item className="result-items" key={i}>{item}</ListGroup.Item>
                ))}
               
                    {results.length > 1 &&
                        <ListGroup.Item  className="text-center result-items">See results</ListGroup.Item>
                    }
                
            </ListGroup>
        </Form>
    )
}


export default Search;