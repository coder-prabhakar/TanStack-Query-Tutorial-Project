import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchInvPost } from '../../API/api';

function FetchIndv() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchInvPost(id),
    });

    if (isPending) return <main>Loading....</main>;
    if (isError) return <main>Error: {error.message || "Something went wrong!"}</main>;

    return (
        <main>
            <ul className="section-accordion">
                <li>
                    <p>ID: {data.id}</p>
                    <p>Title: {data.title}</p>
                    <p>Body: {data.body}</p>
                    <button onClick={() => navigate(-1)}>Go Back</button>
                </li>
            </ul>
        </main>
    )
};

export default FetchIndv;
