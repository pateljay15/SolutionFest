import React, { useState, useEffect } from 'react';
import { getPlaceByUser, isAuthenticated, workDoneByNgo, workDoneOfPlace } from '../API_CALLS/apiHandler.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Nav from './Nav.js';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import '../Styles/Myplaces.css';
import Footer from './Footer.js';
import { MdAccountBalance, MdCall, MdMailOutline, MdOutlineLocationOn } from "react-icons/md";



function Myplaces() {


    const [userPlaces, setUserPlaces] = useState([]);
    const [error, setError] = useState(false);

    const { user, token } = isAuthenticated();

    const loadAllUserPlaces = () => {
        getPlaceByUser(user._id, token).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setUserPlaces(data);
                console.log(data);
            }
        })
    }

    useEffect(() => {
        loadAllUserPlaces();

    }, []);

    const handleWorkDone = (id) => {
        workDoneOfPlace(id, user._id, token)
            .then((data) => {
                loadAllUserPlaces()
            }

            )
            .catch((err) => console.log(err))

    }
    return (
        <div >
            <Nav />
            <div className="nothing"></div>
            <div className="places_title"> My Contribution</div>


            {userPlaces.length !== 0 ?
                <div className="my_places_map">
                    {userPlaces.map((place, index) => {
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
                                        {place.ngoAssigned !== undefined ? <>

                                            {place.workDoneByNgo ? <>{place.workDone ? <>Successfully completed </> : <Button onClick={() => handleWorkDone(place._id)} size="small">Work done</Button>}</> : <>NGO is still working on it</>}

                                        </> : <>Not accepted by any NGO</>}

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
                                        {place.ngoAssigned !== undefined ? <>

                                            {place.workDoneByNgo ? <>{place.workDone ? <>Successfully completed </> : <span onClick={() => handleWorkDone(place._id)} className="btn_accept">Work done</span>}</> : <>NGO is still working on it</>}

                                        </> : <>Not accepted by any NGO</>}

                                        <div className="uploaded_by"> - {place.uploadBy.firstname}</div>
                                    </div>
                                </div>

                            </div>
                        )
                    })}
                </div>
                : <>No work posted by you</>}
            <br />
            <Footer />
        </div>
    );
}

export default Myplaces;