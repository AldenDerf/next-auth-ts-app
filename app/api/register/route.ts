import { PrismaClient } from "@/app/generated/prisma";
import {hash} from 'bcrypt';
import {NextResponse} from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const {name, email, password } = await req.json();
    const userExists = await prisma.user.findUnique({where: {email} });

    if(userExists) {
        return NextResponse.json({error: "User already exists"}, {status: 400});
    }

    const hashed = await hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashed}
    });

    return NextResponse.json(user);
}