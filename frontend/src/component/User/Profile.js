import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import './Profile.css'

const Profile = () => {
    const { user, isAuthenticated } = useSelector(state => state.user);
    const history = useDispatch()

    useEffect(() => {
        if (isAuthenticated === false) {
            history("/login");
        }
    }, [history, isAuthenticated])

    return (
        <Fragment>
            <MetaData title={`${user.name}'s Profile`} />
            <div className='profileContainer'>
                <div>
                    <h1>My Profile</h1>
                    <img
                        src='https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
                        alt='user'
                    />
                    <Link to="/details/update">Edit Profile</Link>
                </div>
                <div>
                    <div>
                        <h4>Name</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>Role</h4>
                        <p>{user.role}</p>
                    </div>
                    <div>
                        <Link to="/password/update">Change Password</Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Profile