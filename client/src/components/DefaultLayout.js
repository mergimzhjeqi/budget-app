import React from 'react'
import {  Dropdown, Menu } from 'antd';
import '../resources/default-layout.css'
import { useNavigate } from 'react-router-dom';

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('money-tracker-user'))
    const navigate = useNavigate(true)
    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <li onClick={ () => {
                            localStorage.removeItem('money-tracker-user')
                            navigate('/login');
                        }}>Logout</li>
                    ),
                }
                
            ]}
        />
    );

    return (
        <div className='layout'>
            <div className='header d-flex justify-content-between align-items-center'>
                <h1 className='logo'>Budget App</h1>
                <div>
                    <Dropdown overlay={menu} placement="bottomLeft">
                        <button className='primary'>{user.name}</button>
                    </Dropdown>
                </div>
            </div>


            <div className='content'>
                {props.children}
            </div>
        </div>
    )
}

export default DefaultLayout
