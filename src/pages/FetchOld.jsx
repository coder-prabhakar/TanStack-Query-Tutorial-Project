import { useEffect, useState } from "react";
import { getData } from "../API/api";


function FetchOld() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getPostData = async () => {
        try {
            const res = await getData();
            if(res.status === 200) {
                setData(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error)
            setError(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getPostData();
    }, [])

    if (isLoading) return <main>Loading....</main>;
    if (error) return <main>Error: {error.message || "Something went wrong!"}</main>;

    return (
        <main>
            <ul className="section-accordion">
                {
                    data?.map((curEle) => {
                        const {id, title, body} = curEle;
                        return (
                            <li key={id}>
                                <p>{title}</p>
                                <p>{body}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default FetchOld;
