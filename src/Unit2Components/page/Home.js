import React from 'react'
import './cssPage/Home.css'
import Header from './Header'
import Footer from './footer'

function Home () {
    
        return(
            <div className='homeBody'>
                <div className='bar'>
                <Header />
                </div>
                <div className='text bar'>
                        <h3>Our Services</h3>
                        <p className="paragrapheText">With our platform, any trader with a basic mobile phone can access real-time market prices, exchange rates and trade procedures. Our platform leverages the ubiquity of mobile phones and innovates on USSD and SMS technologies to enhance delivery channels of the information necessary for Africa cross-border traders.</p>  
                        <p className="paragrapheText"> Our innovative data collection methods across Africa cross-border spaces allow us to present key attributes of SME border trader’s business and border crossing behaviour. Our unique penetration with cross-border traders gives us superior data-driven insights, enhancing cross-border trade policy advocacy and impact reporting.</p>
                </div>


            <Footer/>
            </div>

        )
    }


export default Home