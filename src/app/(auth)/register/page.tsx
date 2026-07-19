import { getCurrentUser } from '@/src/lib/dal';
import RegisterTemplate from '@/src/templates/register/RegisterTemplate';
import { redirect } from 'next/navigation';
import React from 'react';

const RegisterPage = async() => {
    const isLoggedIn = await getCurrentUser()
        if (isLoggedIn) {
            redirect('/dashboard')
        } 
    return (
        <RegisterTemplate/>
    );
}

export default RegisterPage;
