const userSchema=`#graphql

type User{
    _id: String!
    name: String
    email: String
    createdAt: String
}

type Query{
    users: [User]
}
type Mutation{
    updatePassword(password: String!,prevPassword:String): User
}
`
export default userSchema;