const userSchema=`#graphql

type User{
    _id: String!
    name: String
    email: String
}

type Query{
    users: [User]
}
`
export default userSchema;