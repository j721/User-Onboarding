import React,{useState, useEffect} from 'react';
import * as yup from "yup";
import axios from 'axios';



const formSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    terms: yup.boolean().oneOf([true],"Please agree to terms of use"),
    positions: yup.string()
});

function Form () {
//managing state for form inputs
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        positions: '',

    });

//state for errors
const [errors, setErrors]= useState({
    name: '',
    email: '',
    password: '',
    positions: '',
});

//submit button 
const [buttonDisabled, setButtonDisabled] = useState(true);

//state for post requests
const [post, setPost] = useState([]);

useEffect(()=>{
    formSchema.isValid(formState).then(valid=>{
        setButtonDisabled(!valid);
    });
},[formState]);

const validateChange = event =>{
    yup.reach(formState, event.target.name)
    .validate(event.target.value)
    .then(valid=>{
        setErrors({
            ...errors, [event.target.name]:""
        });
    })
    .catch(err=>{
        setErrors({
            ...errors, [event.target.name]: err.errors
        });
    });
}

const formSubmit =event =>{
    event.preventDefault();
    axios.post(" https://reqres.in/api/users", formState)
    .then(response=>{
        setPost(response.data);
        console.log('received data', post);
    })
    .catch(error=>{
        console.log(error.response)
    });
}

const inputChange = event =>{
    event.persist();
    const newFormData ={...formState, [event.target.name]: 
    event.target.type ==="checkbox" ? event.target.checked: event.target.value
    };
    validateChange(event);
    setFormState(newFormData);
}

return (
       <form onSubmit ={formSubmit}>
           <label htmlFor ='name'>Name  
                <input 
                id ="name"
                type="text"
                name= "name"
                value ={formState.name}
                onChange={inputChange}
                />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p>:null}
           </label>

           <label htmlFor ='email'>Email  
                <input 
                id ="email"
                type="text"
                name= "email"
                value ={formState.email}
                onChange={inputChange}
                />
                {errors.email.length > 0 ? <p className="error">{errors.email}</p>:null}
           </label>

           <label htmlFor ='password'>Password
                <input 
                id ="password"
                type="text"
                name= "password"
                value ={formState.password}
                onChange={inputChange}
                />
                {errors.password.length > 0 ? <p className="error">{errors.password}</p>:null}
           </label>

           <label htmlFor="terms" className="terms"> Terms and Conditions
                <input
                type="checkbox"
                name="terms"
                checked ={formState.terms}
                onChange={inputChange}
                />
           </label>
           <pre>{JSON.stringify(post, null, 2)}</pre>
           <button disabled ={buttonDisabled}>Submit</button>
       </form>
 )
}

export default Form; 