import Footer from '@/src/components/layout/Footer';
import Header from '@/src/components/layout/Header';
import { getCurrentUser } from '@/src/lib/dal';
import React from 'react';

async function MainLayout  ({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await getCurrentUser()
    return (
        <>
        <Header isLoggedIn={session}/>
        {children}
        <Footer/>
        </>

    );
}

export default MainLayout;
