import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js'

// @description Auth User and get a token 
// @routes      POST /api/users/login
// @access      Public

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // res.send({email,password}); just checking that we can have acces to email and password from req.body
    const user = await User.findOne({ email: email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid Email/Password')
    }
})


// @description Register a new User
// @routes      POST /api/users
// @access      Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // res.send({email,password}); just checking that we can have acces to email and password from req.body
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

// @description Get User Profile
// @routes      POST /api/users/profile
// @access      Private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


// @description UPDATE User Profile
// @routes      PUT /api/users/profile
// @access      Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User Not Found')
    }
})


// @description Get All User 
// @routes      GET /api/users
// @access      Private/ADMIN

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.findById({})
    res.json(users)
})


export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers }