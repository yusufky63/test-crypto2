function GetRealTimePriceData({ currPrice, updatedIds, updatedPrices, coinId }) {
    const index = updatedIds?.indexOf(coinId)
    const numberFormatter = Intl.NumberFormat('en-US');

    

    // const side = numberFormatter.format(updatedPrices[index] > 0 ? 'up' : 'down';
    // const output = `<span class="dollar">$</span>${price} <span class="direction">${side === 'up' ? '▲' : '▼'}</span>`;
    
    // document.querySelector('.price').innerHTML = output;
    // if(side === 'up') {
    //     card.classList.remove('down');
    //     card.classList.add('up');
    // } else if(side === 'down') {
    //     card.classList.remove('up');
    //     card.classList.add('down');
    // }

    

    if (index != null && index >= 0) {
       
        return  numberFormatter.format(updatedPrices[index])
    }
    //DÜZENLENECEK
    return(
      
       {...((currPrice).slice(0, 8))} >  ((currPrice).slice(0, 8))  ? <span style={{color:"green"}}>${ ((currPrice).slice(0, 8))+" ▲"}</span> :  <span style={{color:"red"}}>${ ((currPrice).slice(0, 8))+" ▼"}</span>
    ) 


  
}

export default GetRealTimePriceData