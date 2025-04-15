import { getServerSession } from "next-auth";
import {authOptions} from '../api/auth/[...nextauth]/route';

export default async function DashboardPage(){
    const session = await getServerSession(authOptions);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        </div>
    )
}