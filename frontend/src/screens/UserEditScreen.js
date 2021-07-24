import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from '../components/FormContainer.js'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {

    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    // const [confirmPassword, setConfi rmPassword] = useState('')
    // const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails


    useEffect(() => {
        if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }

    }, [dispatch, userId, user])

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/userlist">
                <i class="fas fa-long-arrow-alt-left"></i> Go Back
            </Link>
            {/* <Link to='/admin/userlist' className='btn-light' my-3>Go Back</Link> */}
            <FormContainer>
                <h1>Edit</h1>
                {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="name" placeholder='Enter Your Name' value={name}
                                onChange={(e) => setName(e.target.value)}>

                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='Enter Email Address' value={email}
                                onChange={(e) => setEmail(e.target.value)}>

                            </Form.Control>
                        </Form.Group>



                        <Form.Group controlId="isadmin" style={{ marginTop: "1rem" }}>
                            <Form.Check type="checkbox" label='Is Admin' checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}>
                            </Form.Check>
                        </Form.Group>


                        <Button className="my-4" type="submit" variant="primary">
                            Update
                        </Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default UserEditScreen
