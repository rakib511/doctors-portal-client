import { TextField,Button, Alert } from '@mui/material';
import React,{useState} from 'react';
import useAuth from '../../../hooks/useAuth';

const MakeAdmin = () => {
    const [email,setEmail] = useState('');
    const [success,setSuccess] = useState(false);
    const {token} = useAuth();
    const handleOnBlur = e =>{
        setEmail(e.target.value);
    }
    const handleOnSubmit = e =>{
        const user = {email};

        fetch('https://nameless-oasis-45373.herokuapp.com/users/admin',{
            method:'PUT',
            headers:{ 'authorization':`Bearer ${token}`,'content-type':'application/json'},
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                console.log(data);
                setSuccess(true);
            }
        })
        e.preventDefault();
    }
    return (
        <div>
            <h2>Make an Admin</h2>
            <form onSubmit={handleOnSubmit}>
                <TextField type='email' onBlur={handleOnBlur} label="email" variant='standard'></TextField>
                <Button type='submit' variant='contained'>Make Admin</Button>
            </form>
            {success && <Alert severity="success">make admin successfully!</Alert>}

        </div>
    );
};

export default MakeAdmin;