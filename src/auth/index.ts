import UserAuth from "jwt-auth-pack";
import "dotenv/config";

const userAuth=new UserAuth(process.env.JWT_SECRET!);
export default userAuth;