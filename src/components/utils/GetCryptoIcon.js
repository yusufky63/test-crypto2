function GetCryptoIcon({ coinSymbol }) {
    const icon = typeof coinSymbol === 'string' ? coinSymbol.toLowerCase() : '';
    let cryptoIcon = `https://assets.coincap.io/assets/icons/${icon}@2x.png`
    if (icon === 'ustc') {
        let icon = 'ust'
        let cryptoIcon = `https://assets.coincap.io/assets/icons/${icon}@2x.png`
        return (
            <img className="h-10 w-10 rounded-full"
                src={cryptoIcon}
                alt=""
            />
        )
    } else {
        return (
            <img className="h-10 w-10 rounded-full"
                src={cryptoIcon}
                alt=""
            />
        )
    }
}

export default GetCryptoIcon