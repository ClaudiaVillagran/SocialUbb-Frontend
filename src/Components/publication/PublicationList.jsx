import { Global } from "../../helpers/Global";
import useAuth from '../../hooks/useAuth'
import ReactTimeAgo from 'react-time-ago'

import avatar from '../../assets/img/user.png'

export const PublicationList = ({publications,getPublications,page, setPage, more, setMore}) => {
    const { auth } = useAuth();
    const token = localStorage.getItem('token');
    
    const nextPage = () => {
        let next = page+1;
        setPage(next);
        getPublications(next);
      };
      const deletePublication = async (publicationId) =>{
        const request = await fetch (Global.url+'publication/deletePublication/'+ publicationId,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'aplication/json',
            'Authorization': token
          }
        });
        const data = await request.json();
        console.log(data)
        setPage(1);
        setMore(true);
        getPublications(1,true);
      }
    return (
        <>
        <div className="content__posts">
            {publications.map(publication => {
                return (
                    <div className="container" key={publication._id}>
                    <article className="posts__post" >

                        <div className="post__container">

                            <div className="post__image-user">
                                <a href="#" className="post__image-link">
                                    {publication.student.image != 'default.png' && <img src={Global.url + 'student/profilePicture/' + publication.student.image} alt="Foto de perfil" />}
                                    {publication.student.image == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                                </a>
                            </div>

                            <div className="post__body">
                                <div className="post__user-info">
                                    <a href="#" className="user-info__name">{publication.student.name}</a>
                                    <span className="user-info__divider"> | </span>
                                    <a href="#" className="user-info__create-date"><ReactTimeAgo date={publication.created_at} locale="es-ES" /></a>
                                </div>

                                <h4 className="post__content">{publication.text}</h4>
                                {publication.file && <img src={Global.url + 'publiction/media/' + publication.file} />}
                            </div>

                        </div>

                        {auth._id == publication.student._id &&
                            <div className="post__buttons">

                                <button className="post__button" onClick={() => deletePublication(publication._id)}>
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>

                            </div>
                        }
                    </article>
                    </div>
                )
            })}


        </div>

        { more &&
            <div className="content__container-btn">
            <button className="content__btn-more-post" onClick={nextPage}>
                Ver mas publicaciones
            </button>

            </div>
        }   

        </>
    )
}
