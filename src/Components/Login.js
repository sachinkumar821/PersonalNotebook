import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import sideImage from "../Assets/undraw_file_sync_ot38.svg"

export const Login = (props) => {
    // To update Top Loading Bar and change Title of tab 
    const updateProgress = () => {
        props.setProgress(100);
        document.title = "Login to iNotebook - iNotebook";
    }
    useEffect(() => {
        updateProgress();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const hostURL = process.env.REACT_APP_HOST_URL;

    // State to keep track of credentials
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    // useNavigate to redirect to Home page of Notes
    let navigate = useNavigate();
    // Send the reponse to API and authenticate the user
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(`${hostURL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            console.log(json)
            if (json.success === true) {
                // Save the authtoken in local storage & redirect
                localStorage.setItem('token', json.JWT_AuthToken);
                props.showAlertMsg("Logged In Successfully", "success");
                navigate("/");
            } else {
                props.showAlertMsg("Invalid Credentials", "danger");
            }
        } catch {
            props.showAlertMsg("Request Timed Out. Check your Internet Connection", "danger");
        }
    }
    // To display the change in every keystroke at input fields 
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className="content">
                <div className="container mt-3 login--container">
                    <div className="row">
                        <div className="col-md-6 order-md-2">
                            <img src={sideImage} alt="coverImage" className="img-fluid" />
                        </div>

                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3 className='signup--heading'>Log in to <strong> iNotebook</strong></h3>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <div className="form-group first">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} placeholder='example@mail.com' />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="form-group last">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" name='password' id="password" value={credentials.password} onChange={onChange} />
                                                <div id="emailHelp" className="form-text">We'll never share your email and password with anyone else.</div>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block my-2 login--btn" disabled={credentials.email.length === 0 || credentials.password.length === 0}>Log In</button>
                                        <div id="signIn" className="form-text mt-4 redirect">New to iNotebook?
                                            <Link className='redirect--link' to="/signup"> Create an account </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
