import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import avatar from '../../assets/img/user.png';
import ReactTimeAgo from 'react-time-ago';
import useAuth from '../../hooks/useAuth';
import { useForm } from "../../hooks/useForm";

export const LikesPublication = (publicationId) => {
    const token = localStorage.getItem('token');
    const { auth } = useAuth();
    const [likes, setLikes] = useState([]);
    const [likeStudent, setLikeStudent] = useState({});
    const [page, setPage] = useState(1);
    const [countLike, setCountLike] = useState(1);
    const [more, setMore] = useState(true);
    const [stored, setStored] = useState('not_stored');
    const [change, setChange] = useState('not_change');

    useEffect(() => {
        getLikes(1,false);
    }, []);

    const getLikes = async (nextPage = 1, showNews = false) => {
        if (showNews) {
            setLikes([]);
            setPage(1);
            nextPage = 1;
        }
        const request = await fetch(Global.url + 'publication/publicationWithLike/' + publicationId.publicationId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        if (data.status == 'success') {
            let newLikes = data.publication.likes;
            setCountLike(newLikes.length);
            if (!showNews && likes.length >= 1) {
                newLikes = [...likes, ...newLikes]
            }
            setLikes(newLikes)
            if (!showNews && likes.length >= (data.total - likes.length)) {
                setMore(false);
            }
            if (data.totalPages <= 1) {
                setMore(false)
            }
        }
    }
    const unlike = async () => {
        const request = await fetch(Global.url + 'like/unlikePublication/' + publicationId.publicationId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        setPage(1);
        setMore(true);
        getLikes(1, true);
        console.log('data del unlike', data);
        if (data.status === 'success') {
            let filtrar = likes.filter(likePublicationId => publicationId.publicationId !== likePublicationId);
            setLikes(filtrar);
            console.log(likes)
        }
    }
    const saveLike = async () => {
        const request = await fetch(Global.url + 'like/likePublication/' + publicationId.publicationId, {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        if (data.status == 'success') {
            setStored('saved')
        }
    };
    const verPersonas = async (nextPage = 1, showNews = false) => {
        if (showNews) {
            setLikes([]);
            setPage(1);
            nextPage = 1;
        }
        const request = await fetch (Global.url + 'publication/publicationWithLike/'+publicationId.publicationId,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        console.log(data);
        if (data.status == 'success') {
            let studentsLike = data.publication.likes
            if (!showNews && likeStudent.length >= 1) {
                studentsLike = [...likeStudent, ...studentsLike]
            }
            setLikeStudent(studentsLike)
            if (!showNews && likes.length >= (data.total - likeStudent.length)) {
                setMore(false);
            }
            if (data.totalPages <= 1) {
                setMore(false)
            }
            setChange('change');
        }
    };
    return (
        <>

            {countLike == 0 &&
                <button onClick={saveLike}>Me gusta</button>
            }
            {likes.map(like => {
                return (
                    <div className="container_comment" key={like._id}>
                        {
                            like.student.includes(auth._id) &&
                            <button onClick={unlike}>No me gusta</button>
                        }
                        {
                            !like.student.includes(auth._id) &&
                            <button onClick={saveLike}>Me gusta</button>
                        }
                        
                    </div>

                )
            })

            }
            <h1>le gusta a {countLike} personas</h1>
            {countLike>0 &&
                
            <button onClick={()=>verPersonas(publicationId)}>ver personas</button>
            }
            {change=='change' &&
                likeStudent.map(student=>{
                    return (
                        <div className="likes_student" key={student.student}>
                            <h1>{student.student}</h1>
                        </div>
    
                    )
                })
            }
        </>
    )
}
