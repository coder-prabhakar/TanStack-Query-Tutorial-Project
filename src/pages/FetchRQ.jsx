import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPaginationData } from "../API/api";
import { NavLink } from "react-router";
import { useState } from "react";


function FetchRQ() {
    const [pageNumber, setPageNumber] = useState(1);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts", pageNumber],
        queryFn: () => getPaginationData(pageNumber),
        placeholderData: keepPreviousData,
    });

    if (isPending) return <main>Loading....</main>;
    if (isError) return <main>Error: {error.message || "Something went wrong!"}</main>;

    return (
        <main>
            <ul className="section-accordion">
                {
                    data?.map((curEle) => {
                        const {id, title, body} = curEle;
                        return (
                            <li key={id}>
                                <NavLink style={{all:'unset', cursor:'pointer'}} to={`/rq/${id}`}>
                                    <p>{id}. {title}</p>
                                    <p>{body}</p>
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>

            <div className="pagination-section container">
                <button 
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((prev) => prev-1)}
                >
                    Prev
                </button>
                <h2>{pageNumber}</h2>
                <button 
                    onClick={() => setPageNumber((prev) => prev+1)}
                >
                    Next
                </button>
            </div>
        </main>
    )
}

export default FetchRQ;
