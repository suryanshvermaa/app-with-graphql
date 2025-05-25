import { Request, Response } from 'express';
import userAuth from '../../auth';
const graphqlContext=async({ req, res }: { req: Request; res: Response; }) => {
    try {
        const authToken=req.headers['authtoken'] as string;
        if (!authToken) {
            throw new Error('Unauthorized');
        }
        const user=await userAuth.verifyToken(authToken);
        if (!user) {
            throw new Error('Unauthorized');
        }
        return {userId:user.data.userId};
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'An error occurred while processing the request');
    }
}
export default graphqlContext;