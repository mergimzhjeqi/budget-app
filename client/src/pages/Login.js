
import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd'
import Input from 'antd/lib/input/Input'
import { Link, useNavigate } from 'react-router-dom'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    const onFinish = async (values) => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', values);
            console.log(response.data)
            localStorage.setItem('money-tracker-user', JSON.stringify({ ...response.data, password: '' }));
            console.log(localStorage.getItem('money-tracker-user'))
            setLoading(false)
            message.success('Login successfull!')
            navigate('/')
        } catch (error) {
            setLoading(false)
            message.error('Login failed!')

        }
    }
    useEffect(() => {
        if (localStorage.getItem('money-tracker-user')) {
            navigate('/')
        }
    }, [])

    return (
        <div className='register'>
            {loading && <Spinner />}
            <div className='row justify-content-center align-items-center h-100 w-100'>
                <div className='col-md-4'>
                    <Form layout='vertical' onFinish={onFinish}>
                        <h1>Track Your Finances</h1>

                        <Form.Item label='Email' name='email'>
                            <Input />
                        </Form.Item>
                        <Form.Item label='Password' name='password'>
                            <Input type='password' />
                        </Form.Item>
                        <div className='d-flex justify-content-between align-items-center'>
                            <Link to='/register'>Not Registered Yet, Click Here to Register!</Link>
                            <button className='secondary' type='submit'>Login</button>
                        </div>
                    </Form>
                </div>
                <div className='col-md-5'>
                    <div className='lottie'>
                        <lottie-player
                            src="https://assets7.lottiefiles.com/packages/lf20_06a6pf9i.json"
                            background="transparent"
                            speed="1"
                            loop autoplay>

                        </lottie-player>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Login
