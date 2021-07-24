import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from '../components/FormContainer.js'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

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

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userList')
        }
        else {

            if (!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [dispatch, userId, user, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/userlist">
                <i class="fas fa-long-arrow-alt-left"></i> Go Back
            </Link>
            {/* <Link to='/admin/userlist' className='btn-light' my-3>Go Back</Link> */}
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
