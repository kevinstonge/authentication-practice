import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
    username: yup.string().required("please enter your username"),
    password: yup.string().required("please enter your password")
  });

const Login = (props) => {
    const [loginStatus, setLoginStatus] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
      });
    const onSubmit = data => {
        setLoginStatus("... attempting to log in ...");
        setSubmitDisabled(true);
        axios.post('http://localhost:5000/login', data)
            .then(r => {
                if (r.status === 200) {
                    setLoginStatus("success!");
                    props.setLoggedIn(true);
                }
            })            
            .catch(error => {
                console.log(error);
                setSubmitDisabled(false);
                if (error.response.data.message === "incorrect password") {
                    setLoginStatus("incorrect password");
                }
                else if (error.response.data.message === "no such user") {
                    setLoginStatus("username does not exist");
                }
                else {
                    setLoginStatus("unknown error logging in");
                }
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>log in</h2>
            <label htmlFor="username">
                username: <input type="text" id="username" name="username" ref={register} />
                <p className="form-error">{errors.username?.message}</p>
            </label>
            <label htmlFor="password">
                password: <input type="password" id="password" name="password" ref={register} />
                <p className="form-error">{errors.password?.message}</p>
            </label>
            <button type="submit" disabled={submitDisabled}>log in</button>
            <p className="form-error">{loginStatus}</p>
        </form>
    )
}

export default Login;