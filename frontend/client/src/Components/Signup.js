import React, { useEffect, useState } from 'react';
import Nav from './Nav.js';
import "../Styles/Signup.css";
import { NavLink, Outlet } from 'react-router-dom';
import { ngosignup, signup, authenticate } from '../API_CALLS/apiHandler.js';


function Signup() {

    const [isUser, setIsUser] = useState(true);

    const [userValues, setUserValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        cpassword: "",
        error: "",
        loading: "",
        success: false
    })

    const [ngoValues, setNgoValues] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        address: "",
        noOfActiveMembers: "",
        phoneNumber: "",
        State: "",
        City: "",
        pincode: "",
        error: "",
        loading: "",
        success: false
    })
    const handleChange = name => event => {
        setUserValues({ ...userValues, error: false, [name]: event.target.value })
    }

    const handleNgoChange = name => event => {
        setNgoValues({ ...ngoValues, error: false, [name]: event.target.value })
    }


    const onSubmit = event => {
        event.preventDefault();
        setUserValues({ ...userValues, error: false });
        if (userValues.password === userValues.cpassword) {
            signup({ firstname: userValues.firstname, lastname: userValues.lastname, email: userValues.email, password: userValues.password })
                .then((data) => {
                    if (data.error) {
                        console.log(data)
                        setUserValues({ ...userValues, error: data.error, success: false });
                    } else {
                        console.log(data)
                        setUserValues({
                            ...userValues,
                            firstname: "",
                            lastname: "",
                            email: "",
                            password: "",
                            error: "",
                            cpassword: "",
                            success: true
                        });
                    }
                    // setSignIn(!signIn);

                })
                .catch(console.log("Error in signup"));
        }
        else {
            // toast.error("Confirm Password is different", {
            //     position: toast.POSITION.TOP_RIGHT, autoClose: 2000
            // });
            console.log("Confirm Password is different");
        }

    };

    const onNgoSubmit = event => {
        event.preventDefault();
        setNgoValues({ ...ngoValues, error: false });
        if (ngoValues.password === ngoValues.cpassword) {
            ngosignup({ name: ngoValues.name, email: ngoValues.email, password: ngoValues.password, ngoDetails: { address: ngoValues.address, noOfActiveMembers: ngoValues.noOfActiveMembers, phoneNumber: ngoValues.phoneNumber, State: ngoValues.State, City: ngoValues.City, pincode: ngoValues.pincode } })
                .then((data) => {
                    if (data.error) {
                        console.log(data)
                        setNgoValues({ ...ngoValues, error: data.error, success: false });
                    } else {
                        console.log(data)
                        setNgoValues({
                            ...ngoValues,
                            name: "",
                            email: "",
                            password: "",
                            cpassword: "",
                            address: "",
                            noOfActiveMembers: "",
                            phoneNumber: "",
                            State: "",
                            City: "",
                            pincode: "",
                            success: true
                        });
                    }
                    // setSignIn(!signIn);

                })
                .catch(console.log("Error in signup"));
        }
        else {
            // toast.error("Confirm Password is different", {
            //     position: toast.POSITION.TOP_RIGHT, autoClose: 2000
            // });
            console.log("Confirm Password is different");
        }

    };


    return (
        <div >
            <Nav />
            <div className="nothing"></div>

            <div className="authenticate_form" >
                <div className="form_header">Sign Up</div>
                <div className="form_data_select">
                    {isUser ? <> <span className="select_user active" onClick={() => { isUser ? <></> : setIsUser(!isUser) }}>User</span>  <span className="select_ngo " onClick={() => { isUser ? setIsUser(!isUser) : <></> }}>NGO</span></> :
                        <> <span className="select_user" onClick={() => { isUser ? <></> : setIsUser(!isUser) }}>User</span>  <span className="select_ngo active" onClick={() => { isUser ? setIsUser(!isUser) : <></> }}>NGO</span></>}

                </div>
                {
                    isUser ? <>
                        <form className="authenticate_form_field">
                            <input type="text" placeholder="FirstName" className="textField" value={userValues.firstname} onChange={handleChange("firstname")} />
                            <br />
                            <br />
                            <input type="text" placeholder="LastName" className="textField" value={userValues.lastname} onChange={handleChange("lastname")} />
                            <br />
                            <br />
                            <input type="email" placeholder="E-mail" className="textField" value={userValues.email} onChange={handleChange("email")} />
                            <br />
                            <br />
                            <input type="password" placeholder="Password" className="textField" value={userValues.password} onChange={handleChange("password")} />
                            <br />
                            <br />
                            <input type="password" placeholder="Confirm Password" className="textField" value={userValues.cpassword} onChange={handleChange("cpassword")} />

                            <br /><br />
                            <button className="sign_btn" onClick={onSubmit} >Sign In</button>

                        </form></> : <>
                        <form className="authenticate_form_field">
                            <input type="text" placeholder="NGO Name" className="textField" value={ngoValues.name} onChange={handleNgoChange("name")} />
                            <br />
                            <br />
                            <input type="text" placeholder="Active Members" className="textField" value={ngoValues.noOfActiveMembers} onChange={handleNgoChange("noOfActiveMembers")} />
                            <br />
                            <br />
                            <input type="email" placeholder="E-mail" className="textField" value={ngoValues.email} onChange={handleNgoChange("email")} />
                            <br />
                            <br />
                            <textarea placeholder="Address" className="address" value={ngoValues.address} onChange={handleNgoChange("address")} ></textarea>
                            <br />
                            <br />
                            <input type="text" placeholder="State" className="textField" value={ngoValues.State} onChange={handleNgoChange("State")} />
                            <br />
                            <br />
                            <input type="text" placeholder="City" className="textField" value={ngoValues.City} onChange={handleNgoChange("City")} />
                            <br />
                            <br />
                            <input type="number" placeholder="PINCODE" className="textField" value={ngoValues.pincode} onChange={handleNgoChange("pincode")} />
                            <br />
                            <br />
                            <input type="number" placeholder="Mobile" className="textField" value={ngoValues.phoneNumber} onChange={handleNgoChange("phoneNumber")} />
                            <br />
                            <br />

                            <input type="password" placeholder="Password" className="textField" value={ngoValues.password} onChange={handleNgoChange("password")} />
                            <br />
                            <br />
                            <input type="password" placeholder="Confirm Password" className="textField" value={ngoValues.cpassword} onChange={handleNgoChange("cpassword")} />

                            <br /><br />
                            <button className="sign_btn" onClick={onNgoSubmit}>Sign In</button>

                        </form></>
                }


                <hr />
                <div className="form_footer">Have an account <span className="form_footer_link" > <NavLink style={{ textDecoration: 'none' }} to="/auth/login"><span className="link">Login</span></NavLink></span></div>
            </div>
            <Outlet />
        </div>
    );
}

export default Signup;