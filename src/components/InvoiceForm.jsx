import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

export const InvoiceForm = () => {
    const [items, setItems] = useState([{ id: 0, itemName: '', itemDescription: '', quantity: 1, price: 1 }]);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [invoiceNum, setInvoiceNum] = useState(1);

    const [billTo, setBillTo] = useState({
        toWhom: '',
        emailAddress: '',
        billingAddress: ''
    });
    const [billFrom, setBillFrom] = useState({
        fromWhom: '',
        emailAddress: '',
        billingAddress: ''
    });
    const [currency, setCurrency] = useState('₹');
    const [taxRate, setTaxRate] = useState(18);
    const [discount, setDiscount] = useState(0);
    const [notes, setNotes] = useState('');
    const [bill, setBill] = useState({
        subTotal: 1,
        discount: 0.0,
        tax: 0.18,
        total: 1
    });
    useEffect(() => {
        const subTotal = items.reduce((acc, item) => parseFloat(item.price) + acc, 0);
        if (isNaN(subTotal)) {
            setBill({ subTotal: 0, discount: 0, tax: 0, total: 0 });
        } else {
            const discountAmount = ((subTotal * discount) / 100).toFixed(2);
            const newTax = (((subTotal - discountAmount) * taxRate) / 100).toFixed(2);
            const total = (subTotal - discountAmount).toFixed(2);

            setBill({ subTotal: subTotal, discount: discountAmount, tax: newTax, total: total });
        }
    }, [items, taxRate, discount]);

    const itemChangeHandler = (e, index) => {
        const newItems = items.map((item) => {
            if (item.id === index) {
                return {
                    ...item,
                    [e.target.name]: e.target.value
                };
            } else {
                return item;
            }
        });

        setItems(newItems);
    };
    function deleteItems(e, id) {
        if (items.length === 1) {
            setItems([
                {
                    id: 0,
                    itemName: '',
                    itemDescription: '',
                    quantity: 1,
                    price: 1
                }
            ]);
        } else {
            const newItems = items.filter((elem, index) => {
                console.log(index, id);
                return index !== id;
            });
            setItems(newItems);
        }
    }
    return (
        <Form>
            <Row>
                <Col lg={9} md={8}>
                    <Card className='p-3 my-5 mx-2 p-xl-4 my-xl-2'>
                        <div className='d-flex align-items-start justify-content-between mb-3'>
                            <div className='d-flex flex-column '>
                                <div className='d-flex'>
                                    <div className='mb-2'>
                                        <span className='fw-bold'>Current Date: </span>
                                        <span>{new Date().toISOString().slice(0, 10)}</span>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div className='d-flex flex-row align-items-center'>
                                        <span className='fw-bold  d-block' style={{ minWidth: '70px' }}>
                                            Due Date:
                                        </span>
                                        <input
                                            type='date'
                                            className='form-control '
                                            name='dateofIssue'
                                            style={{ maxWidth: '150px' }}
                                            required
                                            min={date.dueDate}
                                            value={date.dueDate}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-row align-items-center'>
                                <span className='me-2 fw-bold'>Invoice Number: </span>
                                <input
                                    type='number'
                                    min='1'
                                    name='invoiceNumber'
                                    className='form-control'
                                    value={invoiceNum}
                                    onChange={(e) => setInvoiceNum(e.target.value)}
                                    style={{ maxWidth: '70px' }}
                                    required
                                />
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='row mb-4'>
                            <div className='col'>
                                <label className='fw-bold' htmlFor='toWhom'>
                                    Bill to:
                                </label>
                                <input
                                    type='text'
                                    placeholder='Who is this invoice to?'
                                    className='form-control my-2'
                                    name='toWhom'
                                    value={billTo.toWhom}
                                    onChange={(e) =>
                                        setBillTo((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    className='form-control my-2'
                                    name='emailAddress'
                                    value={billTo.emailAddress}
                                    onChange={(e) =>
                                        setBillTo((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Billing Address'
                                    className='form-control my-2'
                                    name='billingAddress'
                                    value={billTo.billingAddress}
                                    onChange={(e) =>
                                        setBillTo((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                    required
                                />
                            </div>
                            <div className='col'>
                                <label className='fw-bold' htmlFor='fromWhom'>
                                    Bill From:
                                </label>
                                <input
                                    type='text'
                                    placeholder='Who is this invoice from?'
                                    className='form-control my-2'
                                    name='fromWhom'
                                    value={billFrom.fromWhom}
                                    onChange={(e) =>
                                        setBillFrom((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    className='form-control my-2'
                                    name='emailAddress'
                                    value={billFrom.emailAddress}
                                    onChange={(e) =>
                                        setBillFrom((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                    required
                                />
                                <input
                                    type='text'
                                    placeholder='Billing Address'
                                    className='form-control my-2'
                                    name='billingAddress'
                                    value={billFrom.billingAddress}
                                    onChange={(e) =>
                                        setBillFrom((prev) => ({
                                            ...prev,
                                            [e.target.name]: e.target.value
                                        }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th className='text-start'>ITEM</th>
                                        <th className='text-start'>QTY</th>
                                        <th className='text-start'>PRICE/RATE</th>
                                        <th className='text-end'>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td style={{ width: '70%' }} className='pe-0 input-lg'>
                                                    <div className='my-1 flex-nowrap input-group'>
                                                        <input
                                                            className='form-control'
                                                            placeholder='Item Name'
                                                            name='itemName'
                                                            value={item.itemName}
                                                            onChange={(e) => itemChangeHandler(e, index)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='my-1 flex-nowrap input-group'>
                                                        <input
                                                            className='form-control'
                                                            placeholder='Item Description'
                                                            name='itemDescription'
                                                            value={item.itemDescription}
                                                            onChange={(e) => itemChangeHandler(e, index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td style={{ width: '100px' }} className='pe-0'>
                                                    <div className='my-1 flex-nowrap input-group'>
                                                        <input
                                                            type='number'
                                                            min='1'
                                                            name='quantity'
                                                            className='form-control'
                                                            style={{
                                                                maxWidth: '70px'
                                                            }}
                                                            value={item.quantity}
                                                            onChange={(e) => itemChangeHandler(e, index)}
                                                            required
                                                        />
                                                    </div>
                                                </td>
                                                <td className='pe-0' style={{ width: '150px' }}>
                                                    <div className='my-1 flex-nowrap input-group'>
                                                        <span className='bg-light fw-bold border-0 text-secondary px-2 input-group-text'>
                                                            <span
                                                                className='border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small'
                                                                style={{
                                                                    width: '20px',
                                                                    height: '20px'
                                                                }}
                                                            >
                                                                {currency}
                                                            </span>
                                                        </span>
                                                        <input
                                                            required
                                                            style={{
                                                                width: '40px'
                                                            }}
                                                            type='number'
                                                            min='1'
                                                            step='0.1'
                                                            className='form-control'
                                                            value={item.price}
                                                            name='price'
                                                            onChange={(e) => itemChangeHandler(e, index)}
                                                        />
                                                    </div>
                                                </td>
                                                <td className='text-center pe-0' style={{ width: '60px' }}>
                                                    <svg
                                                        key={index}
                                                        onClick={(e) => {
                                                            deleteItems(e, index);
                                                        }}
                                                        stroke='currentColor'
                                                        fill='currentColor'
                                                        strokeWidth='0'
                                                        viewBox='0 0 24 24'
                                                        className='text-white mt-1 btn btn-danger'
                                                        height='1em'
                                                        width='1em'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        style={{
                                                            height: '33px',
                                                            width: '33px',
                                                            padding: '7.5px'
                                                        }}
                                                    >
                                                        <path
                                                            fill='none'
                                                            d='M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z'
                                                        ></path>
                                                        <path d='M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z'></path>
                                                        <path d='M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z'></path>
                                                    </svg>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <Button
                                className='mt-2'
                                style={{ fontSize: '1em' }}
                                onClick={() =>
                                    setItems((prev) => {
                                        return [
                                            ...prev,
                                            {
                                                id: items[items.length - 1].id + 1,
                                                itemName: '',
                                                itemDescription: '',
                                                quantity: 1,
                                                price: 1
                                            }
                                        ];
                                    })
                                }
                            >
                                Add Item
                            </Button>
                        </div>

                        <div className='row mt-2 justify-content-end'>
                            <div className='col-lg-6'>
                                <div className='d-flex align-items-start justify-content-between mb-2'>
                                    <span className='fw-bold'>Subtotal:</span>
                                    <span>${bill.subTotal}</span>
                                </div>
                                <div className='d-flex align-items-start justify-content-between mb-2'>
                                    <span className='fw-bold'>Discount:</span>
                                    <span>
                                        ({discount}%) ${bill.discount}
                                    </span>
                                </div>
                                <div className='d-flex align-items-start justify-content-between mb-3'>
                                    <span className='fw-bold'>Tax:</span>
                                    <span>
                                        ({taxRate}%) ${bill.tax}
                                    </span>
                                </div>
                                <hr className='my-3' />
                                <div className='d-flex align-items-start justify-content-between my-3'>
                                    <span className='fw-bold'>Total:</span>
                                    <span className='fw-bold'>${bill.total}</span>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-4' />
                        <label className='fw-bold form-label'>Notes:</label>
                        <textarea
                            className='form-control'
                            name='notes'
                            id='notes'
                            cols='30'
                            rows='1'
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder='Thanks for your Business!!'
                        ></textarea>
                        <div></div>
                    </Card>
                </Col>
                <Col lg={3} md={4}>
                    <div className='sticky-top pt-xl-4 pt-md-3'>
                        <Button className='w-100'>Review Invoice</Button>
                        <div className='mb-3 mt-4'>
                            <hr />
                        </div>
                        <div className='mb-3'>
                            <label className='fw-bold form-label'>Currency:</label>
                            <select
                                className='btn btn-light form-select'
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                ₹<option value='₹'>INR (Indian Rupee)</option>
                                <option value='¥'>JPY (Japanese Yen)</option>
                                <option value='$'>USD (United States Dollar)</option>
                                <option value='£'>GBP (British Pound Sterling)</option>
                                <option value='¥'>JPY (Japanese Yen)</option>
                                <option value='$'>CAD (Canadian Dollar)</option>
                                <option value='$'>AUD (Australian Dollar)</option>
                                <option value='$'>SGD (Signapore Dollar)</option>
                                <option value='¥'>CNY (Chinese Renminbi)</option>
                                <option value='₿'>BTC (Bitcoin)</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label className='fw-bold form-label'>Tax rate:</label>
                        </div>
                        <div className='mb-2 flex-nowrap input-group'>
                            <input
                                name='taxRate'
                                placeholder='0.0'
                                min='0.00'
                                step='0.01'
                                max='100.00'
                                type='number'
                                className='bg-white border form-control'
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                            <span className='bg-light fw-bold text-secondary small input-group-text'>%</span>
                        </div>
                        <div>
                            <label className='fw-bold form-label'>Discount:</label>
                        </div>
                        <div className='mb-4 flex-nowrap input-group'>
                            <input
                                name='discountRate'
                                placeholder='0.0'
                                min='0.00'
                                step='0.01'
                                max='100.00'
                                type='number'
                                className='bg-white border form-control'
                                value={taxRate}
                                onChange={(e) => setTaxRate(e.target.value)}
                            />
                            <span className='bg-light fw-bold text-secondary small input-group-text'>%</span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Form>
    );
};
