import { useEffect } from 'react'
import { Global } from '../../helpers/Global'
import { useState } from 'react'
import { UserList } from '../user/UserList'
import { useParams } from 'react-router-dom'
import {GetProfile} from '../../helpers/GetProfile'

export const Following = () => {
  const token = localStorage.getItem('token')
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    getStudents(1);
    GetProfile(params.studentId, setStudentProfile, token);
  }, []);

  const getStudents = async (nextPage = 1) => {
    setLoading(true)
    //sacar stduentID
    const studentId = params.studentId
    //peticion para sacar estudiantes
    const request = await fetch(Global.url + 'follow/following/'+studentId+'/'+nextPage, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const data = await request.json();
    let cleanStudent= [];
    //RECORRER Y LIMPIAR FOLLOWS para quedarme con followed
    data.follows.forEach(follow =>{
        cleanStudent = [...cleanStudent, follow.followed]
    });
    data.students = cleanStudent
    
    //crear un estado para poder listarlos
    if (data.students && data.status == 'success') {
      // console.log('data.students',data.students);
      let newStudents =  data.students;
      // console.log(data.students.length)
       if (students.length >=1) {
         newStudents=[...students, ...data.students];
      //   console.log('newStudents', newStudents)
      }
      // console.log('newStudents', newStudents)
      setStudents(newStudents)
      // console.log('students',students)
       setLoading(false)
       setFollowing(data.student_following)
      // //paginacion
      if (students.length>=(data.total- data.itemsPerPage)) {
        setMore(false);
      }
    }
  }
  
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Usuarios que sigue {studentProfile.name}</h1>
      </header>

      <UserList students={students}
                getStudents={getStudents}
                following={following}
                setFollowing={setFollowing}
                page={page}
                setPage={setPage}
                more={more}
                loading={loading}/>
    </>
  )
}
