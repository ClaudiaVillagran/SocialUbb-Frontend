import { useEffect } from 'react'
import { Global } from '../../helpers/Global'
import { useState } from 'react'
import { UserList } from './UserList'

export const User = () => {
  const token = localStorage.getItem('token')
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents(1);
  }, []);

  const getStudents = async (nextPage = 1) => {
    setLoading(true)  
    //peticion para sacar estudiantes
    const request = await fetch(Global.url + 'student/list/'+nextPage, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });
    const data = await request.json();
    //crear un estado para poder listarlos
    if (data.students && data.status == 'success') {
      //console.log('data.students',data);
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
        <h1 className="content__title">Usuarios</h1>
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
