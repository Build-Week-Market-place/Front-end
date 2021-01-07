import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/items.css'
import Header from './Header'
import Footer from './footer'
import { axiosWithAuth } from '../../Unit3Components/axiosWithAuth'


function  Items(){
    
    const [items, setItems]= useState([])
   

    useEffect(()=>{
        axiosWithAuth()
        .get("/items")
        .then((resp)=>{
            console.log("items resp",resp)
            setItems(resp.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

   

    
    



        return(

            <div className='itemBody'>
                
                <div className='homeBody itmBckg'>
                <div className='bar'>
                <Header />
                </div>
                    <div className='itemList'>
                        
                        
                           {items.map(item=>{
                               return <div className='itemCard bar' key={item.id}>
                                   <h1>{item.name}</h1>
                                   <div className={item.URL ? 'imgContainer':"itemImgHide"}><img className={item.URL ? "itemImg":"hideBorder"} src={item.URL}/></div>
                                   <p>{item.description}</p>
                                   {(item.location===null) ? null: <span className='locationSpan'> Location: {item.location}</span> }
                                   <span className='priceSpan'>${item.price}</span>

                                </div>
                                
                            })}
                        </div>
                            
                    </div>  

                 <Footer/>
            </div>
            

        
            )
    }
    

    export default Items