import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/signform.css'
import Footer from './footer'
import axios from 'axios'

function SignForm (props){
    
    const url = "https://african-marketplace-back-end.herokuapp.com/auth/login"

        const [form, setForm] = useState({
            username: '',
            password: '',
            department:'',
        });

        const [buttonDisable, setButtonDisable] = useState(true);

        const [errors, setErrors] = useState({
            username: '',
            password: '',
            department:'',
        });

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

        const formSubmit = (event) => {
            event.preventDefault()
            const user = {       
                "username": form.username,
                "password": form.password,
                "department": form.department
            }
            // console.log(user)
            axios.post(url, user, {"Headers":{"Content-type": "application/json"},})
            .then (res =>{
                    console.log(res)
                    // window.location="/home"
            })
            .catch(err=>{
                console.log(err)
            })
        }

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

        const formSchema = yup.object().shape({
            username: yup
                .string()
                .required('Must include a username'),
            password: yup
                .string()
                .required('Password is required'),
            department: yup
                .string().required("Department is required"),
        });

        useEffect(() => {
            formSchema.isValid(form).then((isValid) => {
                setButtonDisable(!isValid);
            });
        }, [form, formSchema]);


        return(

            <div className='signBody'>
                <div className='bar'>
                    <div className='myName'>
                       <h1>African <span>Marketplace</span></h1>
                    </div>
                </div>
                <div className='signForm'>
                    <form className='form' onSubmit={formSubmit}>
                        <div className="form-group">
                            <label >Username</label>
                            <p className='error'>{errors.username}</p>
                            <input type="text" id='username' name='username' className="form-control" onChange={inputChange}  placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label >Password</label>
                            <p className='error'>{errors.password}</p>
                            <input type="text" id='password' name='password' className="form-control"  onChange={inputChange}  placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label ><p className='error'>{errors.department}</p></label>
                            <select type="text" name='department' id='department' onChange={inputChange} className="form-control">
                                <option value="">--Select department--</option>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option> 
                            </select>
                        </div>                        
                        <button type="submit" disabled={buttonDisable} className="btn submitBtn">Log in</button>
                        <div className='registerBtn'>
                        <Link className='link' to='/register' >No account yet? Register here</Link>
                    </div>
                    </form>
                <Footer/>  
                </div>
            </div>        
        
            )
    }
    

    export default SignForm