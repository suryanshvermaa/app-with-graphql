import User from "../../models/user.model"
const userResolver={
    Query:{
        users:async()=>await User.find().limit(10)
    }
}
export default userResolver;