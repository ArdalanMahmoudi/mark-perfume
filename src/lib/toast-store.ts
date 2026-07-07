// 'use client'
// import { useState } from "react";

// function toastStore() {
//   const [toasts, setToasts] = useState([]) // toast ->  {id:1, message:'', status:"success"|"error"|"info"|"warning"}

//   const addToast = (toast) => {
//     setToasts(prevToast => ({...prevToast, toast}))
//     setTimeout(() => {
//         removeToast(toast.id)
//     }, 3000);
    
//   };
//   const removeToast = (toastId) => {
//     let filteredToast = toasts.filter((toast) => toast.id !== toastId);
//     setToasts(filteredToast)
// console.log(toasts);
//   };

//   const updateToast = () => {

//   }



//   const publicAPI = { addToast, removeToast };
//   return publicAPI;
// }
// export const toastOne = toastStore();
