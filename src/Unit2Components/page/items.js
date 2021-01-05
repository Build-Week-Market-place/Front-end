import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/items.css'
import Header from './Header'
import Footer from './footer'

function  Items(){
        return(

            <div className='itemBody'>
                
                <div className='homeBody itmBckg'>
                <div className='bar'>
                <Header />
                </div>
                    <div className='itemList'>
                        <div className='itemCard bar'>
                            <h3>Item: </h3>
                            <p>Description: </p>
                            <p>Location:</p>
                            <span>Price: </span>
                        </div>
                            
                    </div>  
                 <Footer/>
            </div>
            </div>
                   
        
            )
    }
    

    export default Items