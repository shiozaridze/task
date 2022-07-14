import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            if (!noData) {
                getInfo();
            }
        }
    }

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        setLoading(true);
        setTimeout(() => {
            axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
                .then(({ data }) => {
                    const newList = userList.concat(data.list);
                    setUserList(newList);
                    setPage(page + 1);
                    if (data.length === 0) {
                        setNoData(true);
                    }

                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                })

        })
    }



    const makeView = () => {
        return (
            userList.length > 0 && userList.map((el, k) => (
                < div className='col-3' key={k}>
                    <Link to={`/user/${el.id}`}>
                        <img src={el.imageUrl} className="card-img-top" />
                        <div className='card'>
                            <div className='card-body'>
                                <div className="card-title">
                                    {el.title}
                                </div>
                                <b>{el.prefix}  {el.name} {el.lastName}</b>
                            </div>
                        </div>
                    </Link>
                </div>
            ))
        )

    }

    return (
        <div className="container">
            <div className="row">
                {makeView()}
                {loading ? <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div> : ""}
                {noData ? <div className="text-center">no data anymore ...</div> : ""}
            </div>
        </div>
    )
}

export default HomePage