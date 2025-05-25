import User from "../../models/user.model"
interface IContext{
    userId?: string;
}
const userResolver={
    Query:{
        users:async()=>await User.find().limit(10)
    },
    Mutation:{
        updatePassword:async(_:unknown, {password ,prevPassword }: { password: string,prevPassword:string },context:IContext)=>{
            const { userId } = context;
            if (!userId) {
                throw new Error("Unauthorized");
            }
            const user = await User.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            if(user.password !== prevPassword){
                throw new Error("Previous password is incorrect");
            }
            user.password = password;
            await user.save();
            return user;
        }
    }
}
export default userResolver;