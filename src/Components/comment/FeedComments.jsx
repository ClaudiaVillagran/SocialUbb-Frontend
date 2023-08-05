import { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import avatar from '../../assets/img/user.png';
import ReactTimeAgo from 'react-time-ago';
import useAuth from '../../hooks/useAuth';
import { useForm } from "../../hooks/useForm";

export const FeedComments = (publicationId) => {
    const token = localStorage.getItem('token');
    const { auth } = useAuth();
    const { form, changed } = useForm({});
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);
    const [stored, setStored] = useState('not_stored');



    useEffect(() => {
        getComments(1, false);
    }, []);
    const getComments = async (nextPage = 1, showNews = false) =>{
        if (showNews) {
            setComments([]);
            setPage(1);
            nextPage = 1;
        }
        const request = await fetch(Global.url+'comment/commentPublication/'+publicationId.publicationId+'/'+nextPage,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        if (data.status == 'success') {
            // setComments(data.comments);
            let newComments = data.comments;

            if (!showNews && comments.length >= 1) {
                //publications=[1,2,3,4,5] -> publicaciones por pagina
                newComments = [...comments, ...newComments]

            }
            setComments(newComments)
            //publication=[1,2,3,4,5,6,7,8,9,10]
            if ( !showNews && comments.length >= (data.total - comments.length)) {
                setMore(false);
            }
            if (data.totalPages <= 1) {
                setMore(false)
            }
        }
    }
    const deleteComment = async (commentId) => {
        const request = await fetch(Global.url+'comment/deleteComment/'+commentId,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'aplication/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        setPage(1);
        setMore(true);
        getComments(1,true);
    }
    const saveComment = async (e) =>{
        e.preventDefault();

        let newComment = form;
        newComment.student = auth._id;

        const request = await fetch(Global.url+'comment/save/'+publicationId.publicationId,{
            method: 'POST',
            body: JSON.stringify(newComment),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        if (data.status == 'success') {
            setStored('stored');
            const myForm = document.querySelector('#comment-form');
            myForm.reset();
        }else{
            setStored('error');
        }
        const myForm = document.querySelector('#comment-form');
        myForm.reset();
    }
    const resetForm = () => {
        document.getElementById("comment-form").reset();


    }
    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getComments(next);
    };

  return (
    <>

        <div className="content_comment">
            {comments.map(comment =>{
                return (
                    
                    <div className="container_comment" key={comment._id}>
                        <article className="posts__post_comment" >
                        <div className="post__container">
                            <div className="post_comment__image-user">
                                <a href="#" className="post__image-link">


                                             {comment.student.image != 'default.png' && <img src={Global.url + 'student/profilePicture/' + comment.student.image} alt="Foto de perfil" />}
                                            {comment.student.image == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                                </a>
                            </div>

                            <div className="post_comment__body">
                                         <div className="post__user-info">
                                         <a href="#" className="user-info__name">{comment.student.name}</a>
                                          <span className="user-info__divider"> | </span>
                                     <a href="#" className="user-info__create-date"><ReactTimeAgo date={comment.created_at} locale="es-ES" /></a>
                                      </div>

                                     <h4 className="post__content">{comment.text}</h4>
                                       {comment.file && <img src={Global.url + 'publiction/media/' + comment.file} />} 
                            
                            </div>

                        </div>
                        
                        {auth._id == comment.student._id &&
                                    <div className="post__buttons">

                                        <button className="post__button" onClick={() => deleteComment(comment._id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>

                                    </div>
                                }
                        </article>
                    </div>
                   
                )
                
            })}
            {more &&
                <div className="content__container_comment-btn">
                    <button className="content__comment_btn-more-post" onClick={nextPage}>
                        Ver mas comentarios
                    </button>

                </div>
            }
        <form id="comment-form" className="container-form__form-comment" onSubmit={saveComment}>
            <input type="text" name="text" className="inputComment" placeholder="Responder..." onChange={changed}/>
            <input type="submit" value="Enviar" className="form-post__btn-submit" onClick={resetForm} />
        </form>
        </div>

    </>

  )
}
