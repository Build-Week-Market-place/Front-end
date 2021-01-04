import React, {useState, useEffect} from 'react'
import * as yup from 'yup'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cssPage/ItemEdit.css'
import Header from './Header'


function Contact (props) {
        
    const emptyItem = {
        name: '',
        email: '',
        message: '',
    };
    
        const [form, setForm] = useState(emptyItem);
        const [buttonDisable, setButtonDisable] = useState(true);
        const [errors, setErrors] = useState({
            name: '',
            email: '',
            message: '',
        });
    
        const formSchema = yup.object().shape({
                name: yup
                    .string()
                    .required()
                    .label('Name')
                    .min(4, 'Must be at least 4 characters.'),

                email: yup
                    .string()
                    .email('Enter a valid Email')
                    .required('Must include an Email'),
                    
                message: yup
                    .string()
                    .required()
                    .label('message')
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
                    console.log('input changed!', e.target.value);
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
                            <label >Name</label>
                            <p className='error'>{errors.name}</p>
                            <input type="text" name='name' id='name' onChange={inputChange} className="form-control" placeholder="Name"/>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <p className='error'>{errors.email}</p>
                            <input type="email" name='email' id='email' onChange={inputChange} className="form-control" placeholder="Email"/>
                        </div>
                        <div class="form-group">
                            <label>Message</label>
                            <p className='error'>{errors.message}</p>
                            <textarea type="text" name='message' id='message' onChange={inputChange} className="form-control" placeholder="Your Message"/>
                        </div>
                    
                        <button type="submit" disabled={buttonDisable} className="btn submitBtn">Send Message</button>
                        
                    </form>
                    
                    
                </div>
            </div>        
            </div>
            
            )
    }
    
    export default Contact