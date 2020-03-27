import React, { useState } from "react";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters.'),
    size: yup.string(),
    pepperoni: yup.boolean(),
    onions: yup.boolean(),
    garlic: yup.boolean(),
    pineapple: yup.boolean(),
    special: yup.string(),
});

export default function Form() {

    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: "",
        onions: "",
        garlic: "",
        pineapple: "",
        special: "",
    })

    const [errors, setErrors] = useState({
        name: "",
    });

    const [post, setPost] = useState([]);

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data);
                setFormState({
                    name: "",
                    size: "",
                    pepperoni: "",
                    onions: "",
                    garlic: "",
                    pineapple: "",
                    special: "",
                });
            })
            .catch(err => console.log(err.response));
    };

    const validateChange = e => {
        yup
            .reach(schema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                console.log(err);
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        const newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
          };
        
        console.log(newFormData);
        validateChange(e);
        setFormState(newFormData);
    };

    return (
      
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={inputChange}
                    />
                     <p className="error">{errors.name}</p> 
                </label>
                
                <label htmlFor="size">
                    Select pizza size: 
                     <select id="size" name="size" onChange={inputChange}>
                        <option>Select...</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </label>
                <p>Select toppings:</p>
                <label class="container"><input onChange={inputChange} type="checkbox" name="pepperoni" />Pepperoni<span class="checkmark"></span></label>
                <label class="container"><input onChange={inputChange} type="checkbox" name="onions" /> Onions<span class="checkmark"></span></label>
                <label class="container"><input onChange={inputChange} type="checkbox" name="garlic" /> Garlic<span class="checkmark"></span></label>
                <label class="container"><input onChange={inputChange} type="checkbox" name="pineapple" /> Pineapple<span class="checkmark"></span></label>
              
                

               
               
                <label htmlFor="special">
                    Special instructions:
                    <textarea
                    id="special"
                        name="special"
                        value={formState.special}
                        onChange={inputChange}
                    />
                </label>
                
                
                <button id="submit" >Add to order!</button>
    
                <pre>{JSON.stringify(post, null, 2)}</pre>
    
            </form>
       
    );
}
