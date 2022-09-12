import React, {useState, useEffect} from 'react'
import { Form, message } from 'antd'
import Input from 'antd/lib/input/Input'
import {useLocation} from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios'

function ResetPassword() {
    const location = useLocation()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [token, setToken] = useState()
    

    useEffect(()=> {
        const params = new URLSearchParams(location.search)
        setToken(params.get('token'))
    })

    const onFinish = async (values) => {

        if (!password){
            message.error('Please enter a password!')
            return
        }

        if(confirmPassword !== password) {
            message.error('Passwords do not match!')
            return
        }

        

       const config = {
           headers: {
               Authorization: `Bearer ${token}`,

           },
           data: password,
       }

        try {
            // console.log(data)
            const response = await axios.post('/api/users/reset-password', config);
            // localStorage.setItem('money-tracker-user', JSON.stringify({ ...response.data, password: '' }));
            message.success('Password changed successfully!')
        } catch (error) {
            message.error('Something went wrong!')

        }
    }
    return (
        <div>
              <div className ='forgot-passord'>
            <div className='col-md-4'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>Reset Password!</h1>

                        <Form.Item label='Enter your new password!' name='password'>
                            <Input type='password' onChange = {(e) => {setPassword(e.target.value)}}/>
                        </Form.Item>
                        <Form.Item label='Confrim your password!' name='confirm-passord'>
                            <Input  type='password' onChange = {(e) => {setConfirmPassword(e.target.value)}}/>
                        </Form.Item>
                        
                        <div className='d-flex justify-content-between align-items-center mt-2'>
                            
                            <button className='secondary' type='submit'>Login</button>
                        </div>
                    </Form>
                </div>
        </div>
        </div>
    )
}

export default ResetPassword
