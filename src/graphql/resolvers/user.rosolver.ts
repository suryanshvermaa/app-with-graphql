import User from "../../models/user.model"
const userResolver={
    Query:{
        users:async()=>await User.find().limit(10)
    },
    Mutation:{
        updatePassword:async(_:unknown, { _id, password ,prevPassword }: { _id: string, password: string,prevPassword:string })=>{
            const user = await User.findById(_id);
            if (!user) {
                return "User not found";
            }
            user.password = password;
            await user.save();
            return user;
        }
    }
}
export default userResolver;