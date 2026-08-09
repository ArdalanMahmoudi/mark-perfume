
import { getCurrentUser } from '@/src/lib/queries/user.queries';
import LoginTemplate from '@/src/templates/login/LoginTemplate';
import { redirect } from 'next/navigation';
import React from 'react';

const LoginPage = async() => {
    
    const user = await getCurrentUser()

    if (user) {
        redirect('/dashboard')
    } 
    return (
        <LoginTemplate/>
    );
}

export default LoginPage;
