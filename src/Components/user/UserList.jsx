import { Link } from 'react-router-dom';
import avatar from '../../assets/img/user.png'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import ReactTimeAgo from 'react-time-ago'

export const UserList = ({ students, getStudents, following, setFollowing, page, setPage, more, loading }) => {
    const { auth } = useAuth();
    const token = localStorage.getItem('token');

    const nextPage = () => {
        let next = page + 1;
        setPage(next);
        getStudents(next);
    };

    const unFollow = async (studentId) => {
        //peticion al backend para dejar de seguir
        const request = await fetch(Global.url + 'follow/unFollow/' + studentId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        if (data.status == 'success') {
            let filtrar = following.filter(followingStudentId => studentId !== followingStudentId);
            setFollowing(filtrar);
            
        }
    };
    const follow = async (studentId) => {
        //peticion al backend para guardar follow
        const request = await fetch(Global.url + 'follow/save', {
            method: 'POST',
            body: JSON.stringify({ followed: studentId }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();

        if (data.status == 'success') {

            //actualizar
            setFollowing([...following, studentId]);
        }

    };

    return (
        <>
            <div className="content__posts">
                {loading ? <h1>CARGANDO...</h1> : ''}
                {students.map(student => {
                    return (
                        <article className="posts__post container" key={student._id}>
                            
                            <div className="post__container">

                                <div className="post__image-user">
                                    <Link to={'/social/profile/'+student._id} className="post__image-link">
                                        {student.image == 'default.png' ?
                                            <img src={avatar} className="post__user-image" alt="Foto de perfil" />
                                            : ''
                                        }
                                        {student.image != 'default.png' ?
                                            <img src={Global.url + 'student/profilePicture/' + student.image} className="post__user-image" alt="Foto de perfil" />
                                            : ''
                                        }

                                    </Link>
                                </div>

                                <div className="post__body">

                                    <div className="post__user-info">
                                        <Link to={'/social/profile/'+student._id} className="user-info__name">{student.name}</Link>
                                        <span className="user-info__divider"> | </span>
                                        <Link to={'/social/profile/'+student._id} className="user-info__create-date"><ReactTimeAgo date={student.created_at} locale="es-ES"/> </Link>
                                    </div>
                                </div>

                            </div>

                            {student._id != auth._id &&
                                <div className="post__buttons">
                                    {following.includes(student._id) &&
                                        <button className="post__button" onClick={() => unFollow(student._id)}>
                                            Dejar de seguir
                                        </button>
                                    }
                                    {!following.includes(student._id) &&
                                        <button className="post__button post__button--green" onClick={() => follow(student._id)}>
                                            Seguir
                                        </button>
                                    }


                                </div>
                            }
                        </article>

                    )
                })}


            </div>
            
            {more &&
                <div className="content__container-btn">
                    <button className="content__btn-more-post" onClick={nextPage}>
                        Ver mas personas
                    </button>
                </div>
            }

            <br />
        </>
    )
}
