import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";

export const FeedComments = (publicationId) => {
    console.log(publicationId)
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem('token');
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    useEffect(() => {
        getComments(1, false);
    }, []);
    const getComments = async (nextPage = 1, showNews = false) =>{
        if (showNews) {
            setComments([]);
            setPage(1);
            nextPage = 1;
        }
        const request = await fetch(Global.url+'comments/commentPublication/'+publicationId.publicationId+'/'+nextPage,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
    }
  return (
    <div>FeedComments</div>
  )
}
