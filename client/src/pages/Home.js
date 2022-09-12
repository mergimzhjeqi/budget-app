import React, { useState, useEffect } from 'react'
import { message, Table, Select, DatePicker } from 'antd';
import DefaultLayout from '../components/DefaultLayout'
import '../resources/transactions.css'
import { Footer } from 'antd/lib/layout/layout';
import AddEditTransaction from '../components/AddEditTransaction';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
var moment = require('moment');

const { RangePicker } = DatePicker;


function Home() {
    const [showAddEditTransactionModal, setShowAddEditTransactionModal] = useState(false)
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null)
    const [loading, setLoading] = useState(false)
    const [transactionData, setTransactionData] = useState([])
    const [frequency, setFrequency] = useState('7')
    const [type, setType] = useState('all')
    const [selectedRange, setSelectedRange] = useState([])

    const getTransaction = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('money-tracker-user'))
            setLoading(true)
            const response = await axios.post('/api/transaction/get-all-transactions',
                {
                    userid: user.userid,
                    frequency,
                    ...(frequency === 'custom' && { selectedRange }),
                    type
                }
            );
            console.log(response.data)
            setTransactionData(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            message.error('Something went wrong!')

        }
    }
    const deleteTransaction = async (record) => {
        try {
            setLoading(true)
            await axios.post('/api/transaction/delete-transaction',
                {
                    transactionId: record._id
                }
            );
            message.success('Transaction deleted successfully')
            getTransaction()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            message.error('Something went wrong!')

        }
    }
    useEffect(() => {
        getTransaction()
    }, [frequency, selectedRange, type])

    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: "Amount",
            dataIndex: "amount"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Type",
            dataIndex: "type"
        },
        {
            title: "Reference",
            dataIndex: "reference"
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
                return <div>
                    <EditOutlined onClick={() => {
                        setSelectedItemForEdit(record)
                        setShowAddEditTransactionModal(true)
                    }} />
                    <DeleteOutlined className='mx-3' onClick = {()=>deleteTransaction(record)}/>
                </div>
            }
        }

    ]


    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <div key ='1' className='filter d-flex justify-content-between align-items-center'>
                <div key ='2' className='d-flex'>

                    <div key ='3' className='d-flex flex-column'>
                        <h6>Search</h6>
                        <Select value={frequency} onChange={(value) => setFrequency(value)}>
                            <Select.Option value='7'>Last 1 Week</Select.Option>
                            <Select.Option value='30'>Last 1 Month</Select.Option>
                            <Select.Option value='365'>Last 1 Year</Select.Option>
                            <Select.Option value='custom'>Custom</Select.Option>
                        </Select>

                        {frequency === 'custom' && (
                            <div className='mt-2'>
                                <RangePicker value={selectedRange} onChange={(values) => setSelectedRange(values)} />
                            </div>
                        )
                        }
                    </div>
                    <div className='d-flex flex-column mx-5'>
                        <h6>Select Type</h6>
                        <Select value={type} onChange={(value) => setType(value)}>
                            <Select.Option value='all'>All</Select.Option>
                            <Select.Option value='income'>Income</Select.Option>
                            <Select.Option value='expense'>Expense</Select.Option>

                        </Select>



                    </div>


                </div>
                <div>
                    <button className='primary' onClick={() => setShowAddEditTransactionModal(true)}>ADD NEW</button>
                </div>
            </div>

            <div className='table-analtics'>
                <div className="table">
                    <Table columns={columns} dataSource={transactionData} />
                </div>

            </div>
            {showAddEditTransactionModal &&
                (<AddEditTransaction
                    showAddEditTransactionModal={showAddEditTransactionModal}
                    setShowAddEditTransactionModal={setShowAddEditTransactionModal}
                    selectedItemForEdit={selectedItemForEdit}
                    getTransaction={getTransaction}
                    setSelectedItemForEdit={setSelectedItemForEdit}
                />
                )}
        </DefaultLayout>
    )
}

export default Home
