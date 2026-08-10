import { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const Pagination = () => {

    const { totalPages } = useSelector((state) => state.book)
    const [currentPage, setCurrentPage] = useState(1)
    const totalPageNumber = Array.from({ length: totalPages }, (_, i) => i + 1)
   const [searchParams] = useSearchParams();
    const Query = searchParams.get("q")
    const navigate = useNavigate()
    const handlePagination = (value) => {
        setCurrentPage(value);            
        navigate({
                pathname:"/results",
                search:`?q=${Query}&page=${currentPage}`
            })
    }
    return (
        <div className="my-4">
            <ul className="list-unstyled d-flex mb-0 align-items-center gap-2">
                {totalPageNumber.map((pagenumber) => {
                    if (pagenumber >= currentPage - 1 && pagenumber <= currentPage + 1 || pagenumber === totalPageNumber.length)  {
                        return (
                        
                        
                        < li
                            key={pagenumber}
                            onClick={() => { handlePagination(pagenumber) }}
                            className={`pag-key ${pagenumber=== currentPage ? "active":""}`}
                        >
                            {pagenumber}
                        </li>)
                    }
                    if(pagenumber === totalPageNumber.length - 1){
                        return (
                            <li className="pag-key"> ...</li>
                        )
                    }
                })


                }

            </ul>
        </div >
    )
}


export default Pagination;