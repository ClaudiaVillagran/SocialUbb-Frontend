import { useState } from "react";
import { Global } from "../../helpers/Global";
import { useForm } from "../../hooks/useForm"
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { form, changed } = useForm({});
  const [login, setLogin] = useState("not_loged");

  const { setAuth } = useAuth();

  const loginStudent = async (e) => {
    e.preventDefault();
    let studentLoged = form;

    const request = await fetch(Global.url + 'student/login', {
      method: 'POST',
      body: JSON.stringify(studentLoged),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await request.json();

    if (data.status === 'success') {
      //guardar los datos en el localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('student', JSON.stringify(data.student));

      setLogin("loged");
      //set datos auth
      setAuth(data.student);
      //redireccion
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } else {
      setLogin("error");
    }

  };
  return (
    <>


      <div className="content-login">
        <h1>Login</h1>
        {login === 'loged' ?
          <div className="alert-form-login">
            <strong className="alert alert-success alert-form-login"> Ingresando...</strong>
          </div>
          : ""}
        {login === 'error' ?
          <div className="alert-form-login">
            <strong className="alert alert-danger">Datos incorrectos  </strong>
          </div>
          : ""}
        <div className="content-form-login">
          <form className="form-login" onSubmit={loginStudent} >

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={changed} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" onChange={changed} />
            </div>

            <input type="submit" value='ingresar' className="btn btn-success" />

          </form>
        </div>


      </div>
    </>

  )
}
