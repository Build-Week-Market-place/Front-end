import React from 'react'
import './cssPage/users.css'
import Header from './Header'

function Users () {

        return(
            <div className='homeBody userBckg'>
                <div className='bar'>
                <Header />
                </div>
                <section className='sectionUsers'>
			
                    <h2>All Sellers</h2>
                    <p>
                        Below are all our registered small business owners. Please click on
                        their name for more information.
                    </p>
                    <div className='users-container'>
                        <section className='user-list'>
                            
                                   
                            
                        </section>
                        <section className='user-card-box'>
                    
                            
                        </section>
                    </div>
                </section>


            </div>

        )
    }

    export default Users