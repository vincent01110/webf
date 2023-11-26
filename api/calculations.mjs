import bcrypt from "bcrypt"


export function calculateDiscount(product, discount){
    if(product.discount_id){
        const discountedPrice =  Math.floor((product.price * (1 - (discount[0].percentage /100))))
        return discountedPrice
    } else {
        return ''
    }
}


export async function hashPassword(password){
    return await bcrypt.hash(password, 13)
}


export async function isPwCorrect(password, hash){
    return await bcrypt.compare(password, hash)
}