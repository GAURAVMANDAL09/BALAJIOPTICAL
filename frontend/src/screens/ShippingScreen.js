import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer.js'
import CheckOutSteps from '../components/CheckOutSteps.js'
import { saveShippingAddress } from '../actions/cartActions.js'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [pincode, setPincode] = useState(shippingAddress.pincode);
    const [mobile, setMobile] = useState(shippingAddress.mobile);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, pincode, mobile }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1> Shipping Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>
                        Address
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Address' value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label style={{ marginTop: '.4rem' }}>
                        City
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter City' value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='pincode'>
                    <Form.Label style={{ marginTop: '.4rem' }}>
                        Pincode
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Pincode' value={pincode}
                        required
                        onChange={(e) => setPincode(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='mobile'>
                    <Form.Label style={{ marginTop: '.4rem' }}>
                        Phone Number
                    </Form.Label>
                    <Form.Control type='text' placeholder='Mobile No.' value={mobile}
                        required
                        onChange={(e) => setMobile(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' style={{ marginTop: '.5rem' }}>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
