import React from 'react';
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import '../Styles/Footer.css'


function Footer() {
    return (
        <div className="footer">

            <div className="footer_heading">NGO Helpers</div>
            <div className="footer_heading_follow_up">Let's make a better world together!</div>

            <br />
            <div className="icons"><FaInstagram className="final_Icon" /><FaTwitter className="final_Icon" /><FaLinkedin className="final_Icon" /></div>
            <div className="footer_mention">Made with 💗 by JAY & AKSHIT</div>
            {/* <br /> */}
        </div>
    );
}

export default Footer;