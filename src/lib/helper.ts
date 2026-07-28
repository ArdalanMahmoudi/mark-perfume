const discountCalculator = (price, discount) => {
    const  discountedPrice = price * (discount / 100)
    const totalPrice = price - discountedPrice
    return totalPrice
} 

export {discountCalculator}