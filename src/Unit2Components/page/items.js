import React, {useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/items.css'
import Header from './Header'
import Footer from './footer'
import { axiosWithAuth } from '../../Unit3Components/axiosWithAuth'


function  Items(){
    const testItems=[{name:"test2", price:"$242.10", description:"testdesc2", location:"somewhere2"},
    {name:"test", price:"$24.02", description:"testdesc", location:"somewhere"}]
    const [items, setItems]= useState(testItems)
   

    useEffect(()=>{
        axiosWithAuth()
        .get("/items")
        .then((resp)=>{
            console.log(resp)
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
                               return <div className='itemCard bar' key={item.price}>
                                   <h1>{item.name}</h1>
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