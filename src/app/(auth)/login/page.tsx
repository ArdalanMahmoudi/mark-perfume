import { getCurrentUser } from '@/src/lib/dal';
import LoginTemplate from '@/src/templates/login/LoginTemplate';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage = async() => {
    const isLoggedIn = await getCurrentUser()
    if (isLoggedIn) {
        redirect('/dashboard')
    } 
    return (
        <LoginTemplate/>
    );
}

export default LoginPage;
