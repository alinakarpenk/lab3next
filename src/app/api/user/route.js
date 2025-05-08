'use server'

import { NextResponse } from "next/server";
import User from "../../../models/User"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function POST(request) {
    try{
        const body = await request.json();
        const { login, password } = body;
        const user = await User.findOne({ where: { login } });
        if(!user || !(await bcrypt.compare(password, user.password))){
            console.log('Неправильна пошта або пароль')
            return NextResponse.json(
                {message : 'Неправильна пошта або пароль'},
                {status : 400}
            ) 
        }
        const token = jwt.sign(
            { 
                id: user.id 
            }, 
            process.env.JWT_SECRET_KEY, 
            {
                expiresIn: '1h',
            }
        );
          const res =  NextResponse.json({ success: true });
          res.cookies.set('authToken', token, { httpOnly: true, maxAge: 3600, path: '/',});
          console.log(token)
          return res;
    } catch(error) {
        console.log(error)
        return NextResponse.json(
            {message: 'Помилка сервера'},
            {status: 500}
        )
    }
}
