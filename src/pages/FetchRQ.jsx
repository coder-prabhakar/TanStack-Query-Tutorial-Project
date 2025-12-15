import { useQuery } from "@tanstack/react-query";
import { getData } from "../API/api";
import { NavLink } from "react-router";


function FetchRQ() {
    const getPostData = async () => {
        try {
            const res = await getData();
            return res.status === 200 ? res.data : [];
        } catch (error) {
            console.log(error);
        }
    };

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["posts"],
        queryFn: getPostData,
        // gcTime: 1000,
        staleTime: 300000,
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true,
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
        </main>
    )
}

export default FetchRQ;
