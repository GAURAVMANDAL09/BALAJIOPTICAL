import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Mallick',
        email: 'mallick@example.com',
        password: bcrypt.hashSync('123456',10)

    },
    {
        name: 'Prashant',
        email: 'prashant@example.com',
        password: bcrypt.hashSync('123456',10)
    },

]

export default users