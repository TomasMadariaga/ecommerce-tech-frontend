export function formatPrice(price:number) {
    const priceFormated = new Intl.NumberFormat('en-US', {
        style: "currency",
        currency: "USD"
    })

    const finalPrice = priceFormated.format(price)

    return finalPrice;
}