function priceOrder(product, quantity, shippingMethod){
    const priceData = calculatePricingData(product, quantity);
    return applyShipping(priceData,shippingMethod);;
}
function applyShipping(priceData, shippingMethod){
    const shippingPerCase=(priceData.basePrice>shippingMethod.discountThreshold)?
        shippingMethod.discountFee: shippingMethod.discountFee;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - priceData.discount + shippingCost;
    return price;
}
function calculatePricingData(product,quantity){
    const basePrice= product.basePrice * quantity;
    const discount = Math.max(quantity-product.discountThreshold,0);
    return {basePrice:basePrice,discount:discount,quantity:quantity};
}
const product =   {
    "name": "apple",
    "status": "ready",
    "basePrice": 3000,
    "discountThreshold": 0.1,
    "discountRate": 0.1
}
const quantity = 10;
const shippingMethod = {
    discountFee: 0.1,
    feePerCase: 0.03,
    discountThreshold: 0.12,
}
console.log(priceOrder(product, quantity, shippingMethod));