import React, {useState} from 'react'
import { Form, message } from 'antd'
import Input from 'antd/lib/input/Input'
import '../resources/authentication.css'
import axios from 'axios'




function ForgotPassword() {
    const [email, setEmail] = useState()

    const onFinish = async (values) => {

        const data = {
            email
            
        }
       

        try {
            // console.log(data)
            const response = await axios.post('/api/users/forgot-password', data);
            // localStorage.setItem('money-tracker-user', JSON.stringify({ ...response.data, password: '' }));
            message.success('Email sent successfully!')
        } catch (error) {
            message.error('Something went wrong!')

        }
    }

    return (
        <div className ='forgot-passord'>
            <div className='col-md-4'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>Forgot Password!</h1>

                        <Form.Item label='Enter your email!' name='email'>
                            <Input onChange = {(e) => {setEmail(e.target.value)}}/>
                        </Form.Item>
                        
                        <div className='d-flex justify-content-between align-items-center mt-2'>
                            
                            <button className='secondary' type='submit'>Login</button>
                        </div>
                    </Form>
                </div>
        </div>
    )
}

export default ForgotPassword
