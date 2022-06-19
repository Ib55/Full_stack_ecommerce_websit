import React, { useState } from 'react'
import Axios from 'axios'
import { domain } from '../env'
const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loginbutton = async () => {
        await Axios({
            method: 'post',
            url: `${domain}/api/login/`,
            data: {
                'username': username,
                'password': password
            }
        }).then((response) => {

            window.localStorage.setItem("token", response.data['token'])
            window.location.href = '/'
        }).catch((error) => {
            alert('Your Username or Password Wrong')

        })

    }
    return (
        <div className='container'>



            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">User Name</label>
                <input onChange={(e) => setUsername(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" />
            </div>

            <div className="mb-3">
                <label for="exampleInputPassword2" className="form-label">Password</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword2" />
            </div>

            <button onClick={loginbutton} type="submit" className="btn btn-primary">Submit</button>


        </div>
    )
}

export default LoginPage