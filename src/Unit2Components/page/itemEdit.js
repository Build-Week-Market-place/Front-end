import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/ItemEdit.css'
import Header from './Header'
import Footer from './footer'
import { axiosWithAuth } from '../../Unit3Components/axiosWithAuth'
import axios from "axios"

function ItemEdit (props) {
        
    const emptyItem = {
        name: '',
        price: '',
        description: '',
        location: '',
    };
    
        const [form, setForm] = useState(emptyItem);
        const [buttonDisable, setButtonDisable] = useState(true);
        const [errors, setErrors] = useState({
            name: '',
            price: '',
            description: '',
            location: '',
        });
        const [submitComplete, setSubmitComplete]=useState(false)
    
        const formSchema = yup.object().shape({
                name: yup
                    .string()
                    .required()
                    .label('Name')
                    .min(4, 'Must be at least 4 characters.'),
                price: yup
                    .number()
                    .required()
                    .label('Price')
                    .min(0.50, 'Price must be at least 0.50 USD.'),
                location: yup
                    .string()
                    .required()
                    .label('Location')
                    .min(3, ' Must be at least 3 Characters.'),
                description: yup
                    .string()
                    .required()
                    .label('Description')
                    .min(10, 'must be at least 10 characters.'),
                })
            const validateChange = (e) => {
                yup
                    .reach(formSchema, e.target.name)
                    .validate(e.target.name === 'terms' ? e.target.checked : e.target.value)
                    .then((valid) => {
                        setErrors({
                            ...errors,
                            [e.target.name]: '',
                        });
                    })
                    .catch((err) => {
                        console.log(err);
    
                        setErrors({
                            ...errors,
                            [e.target.name]: err.errors[0],
                        });
                    });
            };    
            const inputChange = (e) => {
                    e.persist();
                    const newFormData = {
                        ...form,
                        [e.target.name]:
                            e.target.type === 'checkbox' ? e.target.checked : e.target.value,
                    };
            
                    validateChange(e);
                    setForm(newFormData);
            };


            const formSubmit = (e) => {
                    e.preventDefault();
                    console.log(form)
                    axios
                        .post('https://african-marketplace-back-end.herokuapp.com/items/additem',
                         form,
                        {headers:{authorization:localStorage.getItem('token')}
                    })
                        .then(resp=>{
                            console.log(resp)
                            setSubmitComplete(true)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    
            };


            useEffect(() => {
                    formSchema.isValid(form).then((isValid) => {
                        setButtonDisable(!isValid);
                    });
            }, [form, formSchema]);
            
     

        return(

            <div className='itemBody'>
                <div className='homeBody'>
                <div className='bar'>
                <Header/>
                </div>
                <div className='mainForm'>
                    <form className='form' onSubmit={formSubmit}>
                        <div class="form-group">
                            <label >Item Name</label>
                            <p className='error'>{errors.name}</p>
                            <input type="text" name='name' id='name' onChange={inputChange} className="form-control" placeholder="Item Name"/>
                        </div>
                        <div class="form-group">
                            <label>Location</label>
                            <p className='error'>{errors.location}</p>
                            <input type="text" name='location' id='location' onChange={inputChange} className="form-control" placeholder="Location"/>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <p className='error'>{errors.description}</p>
                            <textarea type="text" name='description' id='description' onChange={inputChange} className="form-control" placeholder="Description"/>
                        </div>
                        <div class="form-group">
                            <label>Price</label>
                            <p className='error'>{errors.price}</p>
                            <input type="text" name='price' id='price' className="form-control" onChange={inputChange} placeholder="Price"/>
                        </div>
                        <div className={(submitComplete===true)? "displaySuccess":"hideSuccess"}>
                            Success! Your product has been added to the marketplace.
                        </div>
                        <button type="submit" disabled={(submitComplete===true) ? true:buttonDisable} className="btn submitBtn">Add Item</button>
                        
                    </form>
                    
                    
                </div>
                <Footer/>
            </div>  
            </div>
            
            )
    }
    
    export default ItemEdit