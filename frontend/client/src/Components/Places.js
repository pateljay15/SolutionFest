import React, { useState, useEffect } from 'react';
import Nav from './Nav.js';
import '../Styles/Places.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getPlaces, createPlace, isAuthenticated, updatePlace } from '../API_CALLS/apiHandler.js';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { MdAccountBalance, MdCall, MdMailOutline, MdOutlineLocationOn } from "react-icons/md";
import Footer from './Footer.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function Places() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        name: "",
        description: "",
        address: "",
        peopleNeeded: "",
        photo: "",
        State: "",
        City: "",
        pincode: "",
        loading: false,
        createdProduct: "",
        getaRedirect: false,
        formData: "",
        key: ""
    })
    const [places, setPlaces] = useState([])
    const [error, setError] = useState(false)
    const { name, description, address, peopleNeeded, photo, State, City, pincode, loading, formData } = values


    const loadAllPlaces = () => {
        getPlaces().then(data => {
            if (data.error) {
                setError(true);
            } else {
                setPlaces(data);
                // console.log(data);
            }
        })
    }

    useEffect(() => {
        loadAllPlaces();
        setValues({ ...values, formData: new FormData() });
    }, [])



    // useEffect(() => {

    // }, [])



    const handleChange = name => event => {
        // console.log(event.target.files[0])
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value)
        // console.log(formData);
        setValues({ ...values, [name]: value })
    }

    const onSubmit = event => {
        event.preventDefault()
        console.log(formData);
        setValues({ ...values, error: "", loading: true })
        formData.set("uploadBy", user._id);
        createPlace(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values })
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        getaRedirect: true,
                        uploadFile: "",
                        name: "",
                        formData: "",
                        description: "",
                        address: "",
                        peopleNeeded: "",
                        photo: "",
                        State: "",
                        City: "",
                        pincode: "",
                    })

                    setOpen(false);
                    loadAllPlaces();

                }
            })
            .catch(console.log("Unable to fetch product"))
    }

    const handleNgoAssign = (id) => {
        updatePlace(id, user._id, token)
            .then(data => {
                loadAllPlaces();
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Nav />
            <div className="nothing"></div>
            <div className="places_title"> Different Places</div>



            <div onClick={handleOpen} className="add_place_fixed">Add Place +</div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div class="add_place_head" >
                        Add Place
                    </div>
                    <br />
                    <br />
                    <label className="label">Place Name :</label> <input type="text" value={name} onChange={handleChange("name")} /><br /><br />
                    <label className="label">Description :</label> <input type="text" value={description} onChange={handleChange("description")} /><br /><br />
                    <label className="label">Address :</label><input type="text" value={address} onChange={handleChange("address")} /><br /><br />
                    <label className="label">People Needed :</label><input type="text" value={peopleNeeded} onChange={handleChange("peopleNeeded")} /><br /><br />
                    <input type="file" placeholder="Choose a File" name="uploadFile" onChange={handleChange("photo")} /><br /><br />
                    <label className="label">City :</label><input type="text" value={City} onChange={handleChange("City")} /><br /><br />
                    <label className="label">State :</label><input type="text" value={State} onChange={handleChange("State")} /><br /><br />
                    <label className="label">Pincode :</label><input type="text" value={pincode} onChange={handleChange("pincode")} /><br /><br />
                    <br />
                    <br />
                    <br />
                    <div onClick={onSubmit}>Add Place</div>
                </Box>
            </Modal>

            <div>
                {places.length !== 0 ? <div className="places_map">
                    {

                        places.map((place, index) => {
                            return (
                                <>
                                    <div key={index}  >
                                        {place.workDone ? <></> : <div className="populate_place">

                                            <div key={index} >
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

                                                        {user.role === 1 ? <> {place.ngoAssigned == undefined ? <><Button onClick={() => handleNgoAssign(place._id)} size="small">Accept this work</Button></> : <>It is already assigned</>}</> : <></>}


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
                                                        {user.role === 1 ? <> {place.ngoAssigned == undefined ? <><span onClick={() => handleNgoAssign(place._id)} className="btn_accept">Accept this work</span><br />
                                                        </> : <>It is already assigned<br />
                                                        </>}</> : <></>}

                                                        <div className="uploaded_by"> - {place.uploadBy.firstname}</div>
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        </div>}
                                    </div>
                                </>
                            )
                        })

                    }
                </div> : <>No post Exist</>}
            </div>
            <br />
            <Footer />
        </div>
    );
}

export default Places;