
import { Global } from '../../../helpers/Global';
import useAuth from '../../../hooks/useAuth';
import avatar from '../../../assets/img/user.png';
import { Link } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { useState } from 'react';
import { SerializeForm } from "../../../helpers/SerializeForm";

export const Sidebar = () => {
    const { auth, count } = useAuth();
    const { form, changed } = useForm({});
    const [stored, setStored] = useState('not_stored');

    const savePublication = async (e) => {
        e.preventDefault();
        // //RECORGER DATOS DEL FORMULARIO
        let newPublication = form;
        newPublication.student = auth._id;
        
        // //HACER REQUEST PARA GUARDAR EN BD
        console.log(newPublication)
        const request = await fetch(Global.url + 'publication/save', {
            method: 'POST',
            body: JSON.stringify(newPublication),
            headers: {
               'Content-Type': 'application/json',
               'Authorization': localStorage.getItem('token')
           }
        });
        const data = await request.json();
        // //MOSTRAR MENSAJE DE EXITO O ERROR 
        if (data.status == 'success') {
           setStored('stored')
            // const myForm = document.querySelector('#publication-form');
            // myForm.reset();

        } else {
            setStored('error')
        }
        //SUBIR IMAGEN
        const fileInput = document.querySelector('#image')
        if (data.status == 'success' && fileInput.files[0]) {
            const formData = new FormData();
            formData.append('upload0', fileInput.files[0]);
            console.log(data.publication._id)
            console.log(formData);
            const uploadRequest = await fetch(Global.url + 'publication/upload/' + data.publication._id, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });

            const uploadData = await uploadRequest.json();
            if (uploadData.status == 'success') {
                setStored('stored')

            } else {
                setStored('error')
            }
        }
        const myForm = document.querySelector('#publication-form');
        myForm.reset();
    }
    return (
        <aside className="layout__aside">

            <header className="aside__header">
                <h1 className="aside__title">Hola, {auth.name}</h1>
            </header>

            <div className="aside__container">

                <div className="aside__profile-info">

                    <div className="profile-info__general-info">
                        <div className="general-info__container-avatar">
                            {auth.image != 'default.png' && <img src={Global.url + 'student/profilePicture/' + auth.image} alt="Foto de perfil" />}
                            {auth.image == 'default.png' && <img src={avatar} className="container-avatar__img" alt="Foto de perfil" />}
                        </div>

                        <div className="general-info__container-names">
                            <div className="container-names__name">
                                <Link to={'/social/profile/' + auth._id} className="container-names__name_a" >{auth.name}</Link>
                                {/* <p className="container-names__nickname">MysticKali</p> */}
                            </div>

                        </div>
                    </div>

                    <div className="profile-info__stats">

                        <div className="stats__following">
                            <Link to={'following/' + auth._id} className="following__link">
                                <span className="following__title">Siguiendo</span>
                                <span className="following__number">{count.followingCount}</span>
                            </Link>
                        </div>
                        <div className="stats__following">
                            <Link to={'followers/' + auth._id} className="following__link">
                                <span className="following__title">Seguidores</span>
                                <span className="following__number">{count.followedCount}</span>
                            </Link>
                        </div>


                        <div className="stats__following">
                            <Link to={'/social/profile/' + auth._id} className="following__link">
                                <span className="following__title">Publicaciones</span>
                                <span className="following__number">{count.publicationsCount}</span>
                            </Link>
                        </div>


                    </div>
                </div>


                <div className="aside__container-form">
                    {stored === 'stored' ?
                        <strong className="alert alert-success">Publicada correctamente!!!</strong>
                        : ""}
                    {stored === 'error' ?
                        <strong className="alert alert-danger">Error al realizar la publicación!</strong>
                        : ""}

                    <form id='publication-form' className="container-form__form-post" onSubmit={savePublication}>

                        <div className="form-post__inputs">
                            <label htmlFor="text" className="form-post__label">¿Que estas pesando hoy?</label>
                            <textarea name="text" className="form-post__textarea" onChange={changed} />
                            <label htmlFor="text" className="form-post__label">Escribe tus #hastags</label>
                            <textarea name="categories" className="form-post__textarea" onChange={changed} placeholder='#ciencia #computacion...' />
                        </div>

                        <div className="form-group">
                            <label htmlFor="image">Avatar</label>
                            <input type="file" name="upload0" id="image" />
                        </div>

                        <input type="submit" value="Enviar" className="form-post__btn-submit" />

                    </form>

                </div>

            </div>



        </aside>


    )
}
