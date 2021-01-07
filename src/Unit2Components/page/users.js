import React, {useEffect,useState} from 'react'
import './cssPage/users.css'
import Header from './Header'
import Footer from './footer'
import { axiosWithAuth } from '../../Unit3Components/axiosWithAuth'

function Users () {
    const testUsers=[{name:"Billy", id:5, location:"place", password:"353532523523#%#@%@#%", username:'TOM'},
    {name:"Lilly",email:"Lilly@bill.com", id:7, location:"home", password:"353532523523#%#@%@#%", username:'Lill'}]
    const [usersArray, setUsersArray]= useState(testUsers)
    const [selectedUser,setSelectedUser]=useState(null)

    useEffect(()=>{
    axiosWithAuth()
        .get("/users")
        .then((resp)=>{
        console.log(resp)
        setUsersArray(resp.data)
    })
    .catch((err)=>{
        console.log(err)
    })
}, [])
        //API call goes here
    

    const openDetails=(id)=>{
        if (selectedUser===id){setSelectedUser(null)}
        else {setSelectedUser(id)}
    }

        return(
            <div className='homeBody userBckg'>
                <div className='bar'>
                <Header />
                </div>
                <section className='sectionUsers'>
			
                    <h2>All Sellers</h2>
                    <p>
                        Below are all our registered small business owners. <span className="clickText">Click</span> on
                        their name for more information.
                    </p>
                    <div className='users-container'>
                        <section className='user-list'>
                        {usersArray.map(item=>{
                               return <div onClick={()=>openDetails(item.id)}>
                                   <h3 className={selectedUser===item.id ? "selectedUserNameDiv" : "userNameDiv"}>{item.username}</h3>
                                {selectedUser===item.id &&
                                <div className="detailsDiv">
                                <p>Name: {item.username}</p>
                                <p>Email: {item.email}</p>
                                <p>Location: {item.location}</p>
                                
                                
                                </div>}


                                </div>
                                
                            })}
                                   
                            
                        </section>
                        <section className='user-card-box'>
                    
                            
                        </section>
                    </div>
                </section>

            <Footer/>
            </div>

        )
    }

    export default Users