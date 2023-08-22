import { PublicationList } from './PublicationList'
import { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global'

export const Feed = () => {
    const token = localStorage.getItem('token');
    const [publications, setPublications] = useState([]);
    const [page, setPage] = useState(1);
    const [more, setMore] = useState(true);

    useEffect(() => {
        getPublications(1, false);
    }, []);

    const getPublications = async (nextPage = 1, showNews = false) => {

        if (showNews) {
            setPublications([]);
            setPage(1);
            nextPage = 1;
        }
        const request = await fetch(Global.url + 'publication/feed/' + nextPage, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const data = await request.json();
        console.log(data);
        if (data.status == 'success') {
            let newPublications = data.publications;

            if (!showNews && publications.length >= 1) {
                //publications=[1,2,3,4,5] -> publicaciones por pagina
                newPublications = [...publications, ...newPublications]

            }
            setPublications(newPublications)
            //publication=[1,2,3,4,5,6,7,8,9,10]
            if ( !showNews && publications.length >= (data.total - publications.length)) {
                setMore(false);
            }
            if (data.totalPages <= 1) {
                setMore(false)
            }
        }
    }
    return (
        <>
            <header className="content__header">
                <h1 className="content__title">Timeline</h1>
                <button className="content__button" onClick={() => getPublications(1,true)}>Mostrar nuevas</button>
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
