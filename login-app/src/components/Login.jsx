import { GoogleLogin } from '@react-oauth/google';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function Login() {

    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                      const result =   axios.post(`http://localhost:3001/user/create-user`,res.data);
                      console.log(result,res.data)
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };


    return (
        <div>
            <h2>React  Login</h2>
            <br />
            <br />
            {profile ? (
                 <div className='d-flex justify-content-center'>
                 <div  style={{"width": 18 + 'em'}}>
                     <img src={profile.picture} alt="user image" className="card-img-top" style={{"height" : "50%", "width" : "50%", "marginRight":"50%"}}/>
                     <div className="card-body">
                         <h5 className="card-title">{profile.name}</h5>
                         <p className="card-text"> {profile.email}</p>
                         <button className="btn btn-primary" onClick={logOut}>Log out</button>
                     </div>
                 </div>
              </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    )
}
