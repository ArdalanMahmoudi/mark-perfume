import { prisma } from '@/src/lib/prisma';
import { getCurrentUser } from '@/src/lib/queries/user.queries';
import DashboardUserInfoTemplate from '@/src/templates/dashboard/userInfo/DashboardUserInfoTemplate';
import React from 'react';

const Page = async() => {
    const user = await getCurrentUser()
  
    return (
        <DashboardUserInfoTemplate user={user}/>
    );
}

export default Page;
