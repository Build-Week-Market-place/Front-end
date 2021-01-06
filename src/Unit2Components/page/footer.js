import React from 'react'
import {Link} from 'react-router-dom'
import './cssPage/Footer.css'


function Footer(){

    return(
        <div className="footerDiv">
            <p>African Market LLC</p>
            <Link to='/' className="logOutLink">Log Out</Link>
            <p>© 2021 Track Team 11</p>
        </div>
    )


}

export default Footer