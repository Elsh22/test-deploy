import { connect } from '@/dbConfig/dbConfig'; 
import User from '@/app/models/userModel';
import { NextResponse } from 'next/server';

connect();

export async function GET(){
    try {
        const user = await User.find().select('fullName email avatar major status username id');
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }

}
