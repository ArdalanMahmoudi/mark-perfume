const discountCalculator = (price, discount) => {
    const  discountedPrice = price * (discount / 100)
    const totalPrice = Math.round((price - discountedPrice)/1000)*1000
    return totalPrice
} 



export {discountCalculator}