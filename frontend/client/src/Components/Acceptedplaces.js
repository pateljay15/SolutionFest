import React, { useState, useEffect } from 'react';
import { getPlaceByNgo, isAuthenticated, workDoneByNgo } from '../API_CALLS/apiHandler.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Nav from './Nav.js';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../Styles/Acceptedplaces.css';
import { MdAccountBalance, MdCall, MdMailOutline, MdOutlineLocationOn } from "react-icons/md";
import Footer from './Footer';



function Acceptedplaces() {

    const [ngoPlaces, setNgoPlaces] = useState([]);
    const [error, setError] = useState(false);

    const { user, token } = isAuthenticated();

    const loadAllNgoPlaces = () => {
        getPlaceByNgo(user._id, token).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setNgoPlaces(data);
                console.log(data);
            }
        })
    }

    useEffect(() => {
        loadAllNgoPlaces();

    }, []);

    const handleWorkDone = (id) => {
        workDoneByNgo(id, user._id, token)
            .then((data) => {
                loadAllNgoPlaces()
            }

            )
            .catch((err) => console.log(err))

    }
    return (
        <div >
            <Nav />
            <div className="nothing"></div>
            <div className="places_title"> My Contribution</div>
            <br />

            {ngoPlaces.length !== 0 ?
                <div className="my_places_map">
                    {ngoPlaces.map((place, index) => {
                        return (
                            <div key={index} className="col-4 mb-4">
                                {/* <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={`https://gdschackathon.herokuapp.com/api/place/photo/${place._id}`}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {place.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {place.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {place.address}
                                            <br />
                                            {place.State}&nbsp;
                                            {place.City}&nbsp;
                                            {place.pincode}&nbsp;

                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {place.peopleNeeded}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {place.peopleNeeded}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {place.uploadBy.firstname}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        {place.workDoneByNgo ? <>Waiting for user to confirm</> : <><Button onClick={() => handleWorkDone(place._id)} size="small">Work done</Button></>}

                                    </CardActions>

                                </Card> */}

                                <div className="place_card">
                                    <div>
                                        <img src={`https://gdschackathon.herokuapp.com/api/place/photo/${place._id}`} className="places_img" />
                                    </div>
                                    <div className="places_detail">
                                        {place.description}
                                        <br />
                                        <br />
                                        People Needed:  {place.peopleNeeded}
                                        <br />
                                        <br />
                                        <MdOutlineLocationOn className="place_icon" /> : {place.address} ,  {place.City} , {place.State} ,  {place.pincode}
                                        <br />
                                        <br />
                                        <MdMailOutline className="place_icon" /> : {place.uploadBy.email}
                                        <br />
                                        <br />
                                        {/* <span onClick={() => handleNgoAssign(place._id)} className="btn_accept">Accept this work</span> */}
                                        {place.workDoneByNgo ? <>Waiting for user to confirm</> : <><Button onClick={() => handleWorkDone(place._id)} size="small">Work done</Button></>}

                                        <div className="uploaded_by"> - {place.uploadBy.firstname}</div>
                                    </div>
                                </div>


                            </div>
                        )
                    })}
                </div>
                : <>No work accepted by you</>}

            <br />
            <Footer />
        </div>
    );
}

export default Acceptedplaces;