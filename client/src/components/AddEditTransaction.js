import React, { useState } from 'react'
import { Form, Input, Modal, Select, message } from 'antd';
import axios from 'axios';
import Spinner from './Spinner';

function AddEditTransaction(
    {
        setShowAddEditTransactionModal,
        showAddEditTransactionModal,
        selectedItemForEdit,
        setSelectedItemForEdit,
        getTransaction }) {
    const [loading, setLoading] = useState(false)


    const onFinish = async (values) => {

        try {

            const user = JSON.parse(localStorage.getItem('money-tracker-user'))
            console.log(user);
            console.log(values + 'values');
            
            
            setLoading(true)
            if (selectedItemForEdit) {
                await axios.post('api/transaction/edit-transaction',
                    {
                        payload: {
                            ...values,
                            userid: user.userid,
                        },
                        transactionId: selectedItemForEdit._id,
                    });

                getTransaction()
                message.success('Transaction updated successfully')
            } else {
                console.log(values);
                await axios.post('api/transaction/add-transaction', { ...values, userid: user.userid })
                getTransaction()
                message.success('Transaction added successfully')
            }
            setShowAddEditTransactionModal(false)
            setSelectedItemForEdit(null)
            setLoading(false)

        } catch (error) {
            message.error('Something went wrong!')
            setLoading(false)
        }

    }
    return (

        <Modal title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
            visible={showAddEditTransactionModal}
            onCancel={() => setShowAddEditTransactionModal(false)}
            footer={false}
        >
            {loading && <Spinner />}

            <Form layout='vertical' className='transaction-form' onFinish={onFinish} initialValues={selectedItemForEdit}>
                <Form.Item label='Amount' name='amount'>
                    <Input type='text' />
                </Form.Item>
                <Form.Item label='Type' name='type'>
                    <Select>
                        <Select.Option value='income'>Income</Select.Option>
                        <Select.Option value='expense'>Expense</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label='Category' name='category'>
                    <Select>
                        <Select.Option value='salary'>Salary</Select.Option>
                        <Select.Option value='freelance'>Freelance</Select.Option>
                        <Select.Option value='food'>Food</Select.Option>
                        <Select.Option value='enternainment'>Enternainment</Select.Option>
                        <Select.Option value='investment'>Investment</Select.Option>
                        <Select.Option value='travel'>Travel</Select.Option>
                        <Select.Option value='education'>Education</Select.Option>
                        <Select.Option value='medical'>Medical</Select.Option>
                        <Select.Option value='tax'>Tax</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label='Date' name='date'>
                    <Input type='date' />
                </Form.Item>
                <Form.Item label='Reference' name='reference'>
                    <Input type='text' />
                </Form.Item>

                <Form.Item label='Description' name='description'>
                    <Input type='text' />
                </Form.Item>

                <div className='d-flex justify-content-end'>
                    <button className='primary' type='submit'>SAVE</button>

                </div>
            </Form>
        </Modal>

    )
}

export default AddEditTransaction