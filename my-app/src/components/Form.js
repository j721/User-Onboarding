import React,{useState} from 'react';
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


return (
        <div>

        </div>
 )
}

export default Form; 