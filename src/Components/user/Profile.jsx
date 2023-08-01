import { useEffect, useState } from 'react'
import avatar from '../../assets/img/user.png'
import { GetProfile } from '../../helpers/GetProfile'
import { Link, useParams } from 'react-router-dom'
import { Global } from '../../helpers/Global'
import useAuth from '../../hooks/useAuth'
import { PublicationList } from '../publication/PublicationList'

export const Profile = () => {
  const params = useParams();
  const [student, setStudent] = useState({})
  const [counter, setCounter] = useState({})
  const token = localStorage.getItem('token');
  const { auth } = useAuth();
  const [iFollow, setIFollow] = useState(false);
  const [publications, setPublications] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);

  useEffect(() => {
    getData();
    getCounters();
    getPublications(1, true);
  }, []);
  useEffect(() => {
    getData();
    getCounters();
    getPublications(1, true);
    setMore(true);
  }, [params]);

  const getData = async () => {
    const dataProfile = await GetProfile(params.studentId, setStudent)
    // console.log(dataProfile)
    if (dataProfile.following && dataProfile.following._id) {
      // console.log(dataProfile.following._id)
      setIFollow(true)
    }
  }

  const getCounters = async () => {
    const request = await fetch(Global.url + 'student/counter/' + params.studentId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    const data = await request.json();
    if (data.status == 'success') {
      setCounter(data)
    }
  }
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
      setIFollow(false)

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
      setIFollow(true);
    }

  };
  const getPublications = async (nextPage = 1, newProfile= false) => {
    const request = await fetch(Global.url + 'publication/publicationStudent/' + params.studentId + '/' + nextPage, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const data = await request.json();
    if (data.status == 'success') {
      let newPublications = data.publications;
    
      if (!newProfile && publications.length >= 1) {
        //publications=[1,2,3,4,5] -> publicaciones por pagina
        newPublications = [...publications , ...newPublications]

      }
      if (newProfile) {
        newPublications = data.publications;
        setMore(true);
        setPage(1);
      }
      setPublications(newPublications)
      //publication=[1,2,3,4,5,6,7,8,9,10]
      if (!newProfile && publications.length >= (data.total - publications.length)) {
        setMore(false);
      }
      if (data.totalPages<=1) {
        setMore(false)
      }
    }
  }
  
  return (
    <>
      <header className="aside__profile-info">

        <div className="profile-info__general-info">
          <div className="general-info__container-avatar">
            {student.image != 'default.png' && <img src={Global.url + 'student/profilePicture/' + student.image} alt="Foto de perfil" />}
            {student.image == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
          </div>

          <div className="general-info__container-names">
            <div className="container-names__name">
              <h1>{student.name}</h1>
              {student._id != auth._id &&
                (iFollow ?
                  <button className="post__button" onClick={() => unFollow(student._id)}>Dejar de seguir</button>
                  : <button className="post__button--green" onClick={() => follow(student._id)}>Seguir</button>
                )}
            </div>
          </div>
        </div>

        <div className="profile-info__stats">

          <div className="stats__following">
            <Link to={'/social/following/' + student._id} className="following__link">
              <span className="following__title">Siguiendo</span>
              <span className="following__number">{counter.followingCount}</span>
            </Link>
          </div>
          <div className="stats__following">
            <Link to={'/social/followers/' + student._id} className="following__link">
              <span className="following__title">Seguidores</span>
              <span className="following__number">{counter.followedCount}</span>
            </Link>
          </div>


          <div className="stats__following">
            <Link to={'/social/profile/' + student._id} className="following__link">
              <span className="following__title">Publicaciones</span>
              <span className="following__number">{counter.publicationsCount}</span>
            </Link>
          </div>


        </div>
      </header>
      <PublicationList
              publications={publications}
              getPublications={getPublications}
              page={page}
              setPage={setPage}
              more={more}
              setMore={setMore}
      />

      
    </>
  )
}
