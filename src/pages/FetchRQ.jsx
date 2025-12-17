import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPaginationData, updateData } from "../API/api";
import { NavLink } from "react-router";
import { useState } from "react";


function FetchRQ() {
    const [pageNumber, setPageNumber] = useState(1);

    const queryClient = useQueryClient();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts", pageNumber],
        queryFn: () => getPaginationData(pageNumber),
        placeholderData: keepPreviousData,
    });

    // mutation function to delete the post
    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (res, postId) => {
            console.log(res, postId);
            queryClient.setQueryData(["posts", pageNumber], (data) => {
                return data?.filter((post) => post.id !== postId);
            });
        },
    });

    // mutation function to update the post
    const updateMutation = useMutation({
        mutationFn: (id) => updateData(id),
        onSuccess: (res, postId) => {
            console.log(res, postId);
            queryClient.setQueryData(["posts", pageNumber], (data) => {
                return data?.map((post) => post.id === postId ? res.data : post );
            });
        },
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
                                <button onClick={() => deleteMutation.mutate(id) }>Delete</button>
                                <button onClick={() => updateMutation.mutate(id) }>Update</button>
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
