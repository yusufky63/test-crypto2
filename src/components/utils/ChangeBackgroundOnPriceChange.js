
function ChangeBackgroundOnPriceChange({ currPrice, updatedIds, updatedPrices, coinId }) {
    const index = updatedIds?.indexOf(coinId)
    const numberFormatter = Intl.NumberFormat('en-US');
    // const formatted = numberFormatter.format(n);
    if (index != null && index >= 0) {
        return numberFormatter.format(updatedPrices[index])
    }
    return numberFormatter.format(currPrice)
}

export default ChangeBackgroundOnPriceChange