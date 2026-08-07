export const calculatedDiscountedPrice = ({price, discount}:{price:number, discount?:number}) => {
  let totalPrice = 0
  if (discount && discount > 0) {
    const discountedPrice = price * (discount / 100);
    totalPrice = Math.round((price - discountedPrice) / 1000) * 1000;
    return totalPrice;
  }else{
    return totalPrice = price
  }
};



