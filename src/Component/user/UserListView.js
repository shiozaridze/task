import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import FriendList from '../friends/FriendList';

const UserListView = (params) => {
    let { userId } = useParams();

    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const navigate = useNavigate()


    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        setLoading(true);
        setTimeout(() => {
            axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${userId}`)
                .then(({ data }) => {
                    const newList = userList.concat(data.list);
                    setUserInfo(data)
                    // setPage(page + 1);
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

    return (
        <>
            <div className='container'>
                <div className='row'>
                    {userInfo ? (
                        <>
                            <div className='col-4'>
                                <div className="card ">
                                    <img className='card-img' s src={userInfo.imageUrl} />
                                    <div className='card-body'>
                                        <h2>{userInfo.title}</h2>
                                        <p><b>User: </b>{userInfo.prefix} {userInfo.name} {userInfo.lastName}</p>
                                        <p><b>Address: </b>{userInfo.address.state} {userInfo.address.country} {userInfo.address.city} {userInfo.address.streetAddress} </p>
                                        <p><b>zip: </b>{userInfo.address.zipCode}  </p>
                                    </div>
                                </div>
                                <button className='btn btn-danger w-100' onClick={() => navigate(-1)}>
                                    Back
                                </button>
                            </div>
                            <div className='col-8'>
                                <FriendList userId={userInfo.id} />
                            </div>
                        </>
                    ) : ""}
                </div>
            </div>
        </>
    )
}

export default UserListView