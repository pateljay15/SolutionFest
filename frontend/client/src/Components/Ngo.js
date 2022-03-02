import React, { useState, useEffect } from 'react';
import Nav from './Nav.js';
import '../Styles/Ngo.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { getNgos } from '../API_CALLS/apiHandler.js';
import { MdAccountBalance, MdCall, MdMailOutline, MdOutlineLocationOn } from "react-icons/md";
import Footer from './Footer.js';



function Ngo() {

    const [ngos, setNgos] = useState([]);
    const [error, setError] = useState(false);

    const loadAllNgos = () => {
        getNgos().then(data => {
            if (data.error) {
                setError(true);
            } else {
                setNgos(data);
                // console.log(data);
            }
        })
    }

    useEffect(() => {
        loadAllNgos();

    }, [])
    return (
        <div>
            <Nav />
            <div className="nothing"></div>

            <div className="ngo_title">Different NGOs</div>

            {ngos.length !== 0 ? <div className="ngo_map">
                {

                    ngos.map((ngo, index) => {
                        return (

                            <>
                                < div key={index} >

                                    <div className="ngo_card">
                                        <div className="ngo_card_title">{ngo.name}</div>
                                        <hr />
                                        <div className="ngo_card_detals">
                                            <div><MdAccountBalance className="place_icon" /> : {ngo.ngoDetails.noOfActiveMembers} Active Members</div>
                                            <br />

                                            <div><MdCall className="place_icon" /> : +91 {ngo.ngoDetails.phoneNumber}</div>
                                            <br />
                                            <div><MdMailOutline className="place_icon" /> : {ngo.email}</div><br />
                                            <div><MdOutlineLocationOn className="place_icon" /> : {ngo.ngoDetails.address} ,  {ngo.ngoDetails.City} , {ngo.ngoDetails.State} ,  {ngo.ngoDetails.pincode}</div>
                                            <br />
                                            <div className="support_ngo">Donate </div>
                                            <br />
                                        </div>

                                    </div>
                                    <br />
                                </div>
                            </>

                        )
                    })

                }
            </div> : <>No NGO Exist</>}
            <br />
            <Footer />
        </div >
    );
}

export default Ngo;
