"use client"
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import Toast from './Toast';

const ToastContainer = () => {

    return (
        <>
        {  createPortal(
            <Toast/>,
            document.body
        )}
        </>
    );
}

export default ToastContainer;
