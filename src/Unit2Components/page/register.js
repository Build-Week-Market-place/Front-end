import React, {useState, useEffect} from 'react'
import * as yup from 'yup';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/register.css'
import Footer from './footer'

function Register(props) {
        const url = "https://african-marketplace-back-end.herokuapp.com/auth/register"
        
        const [form, setForm] = useState({
            password: '',
		    username: '',
		    department: '',
		    terms: false,
        })
        const [errors, setErrors]= useState({
		    password: '',
		    username: '',
		    department: '',
		    terms: false,
        })
        const [buttonDisable, setButtonDisable] = useState(true)

        const registerSchema = yup.object().shape({
            username: yup.string().required('Username is required'),
            password: yup
                        .string()
                        .min(8,'Password must be 8 letter long minimum')
                        .max(16,'Password must be 16 letter long maximum'),
            department: yup
                        .string().required("Department is required"),
            terms: yup.boolean().oneOf([true], 'Please agree to Terms and Conditions'),
            
        })

        const confirmChange = (event) =>{
                yup
                    .reach(registerSchema, event.target.name)
                    .validate(event.target.name === 'terms' ? event.target.checked : event.target.value)
                    .then((valid)=>{
                        setErrors({
                            ...errors,
                            [event.target.name]:'',
                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                        setErrors({
                            ...errors,
                            [event.target.name]:err.errors[0]
                        })
                    })
        }
        const formSubmit = (event) => {
            event.preventDefault()
            const user = {       
                "username": form.username,
                "password": form.password,
                "department": form.department
            }
            console.log(user)
            axios.post(url, user, {"Headers":{"Content-type": "application/json"},})
            .then (res =>{
                    console.log("register res", res)
                window.location="/"
            })
            .catch(err=>{
                console.log(err)
            })
        }
        const inputChange = (event) => {
            event.persist();
            console.log('input changed!', event.target.value);
            const newFormData = {
                ...form,
                [event.target.name]:
                    event.target.type === 'checkbox' ? event.target.checked : event.target.value,
            };
    
            confirmChange(event);
            setForm(newFormData);
        };
       
        useEffect(()=>{
            registerSchema.isValid(form).then((isValid)=>{
                setButtonDisable(!isValid)
            })
        }, [form, registerSchema])

        return(

            <div className='signBody'>
                <div className='bar'>
                    <div className='myName paddingBottom'>
                       <h1>African <span>Marketplace</span></h1>
                    </div>
                </div>
                <div className='mainForm'>
                    <form className='form' onSubmit={formSubmit}>
                        <div className="form-group">
                            <label ><h2>Welcome</h2></label>
                            <p className='error'>{errors.username}</p>
                            <input type="text" id='username' name="username" onChange={inputChange} className="form-control"  placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <label ><p className='error'>{errors.password}</p></label>
                            <input type="password" name="password" id="password" onChange={inputChange} className="form-control"  placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label ><p className='error'>{errors.department}</p></label>
                            <select type="text" name='department' id='department' onChange={inputChange} className="form-control">
                                <option value="">--Select department--</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option> 
                            </select>
                        </div>
                        <div className="form-check">
                            <p className='error'>{errors.terms}</p>
                            <input type="checkbox" name='terms' id='terms' onChange={inputChange} className="form-check-input" />
                            <label className="form-check-label" >Terms and Conditions</label>
                        </div>
                        <button type="submit" disabled={buttonDisable} className="btn submitBtn">Submit</button>
                        <div className='registerBtn'>
                        <small id="emailHelp" className="form-text ">We'll never share your information.</small>
                    </div>
                    </form>
                <Footer/> 
                </div>
            </div>        
            
            )
    }
    

    export default Register