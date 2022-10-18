
function CheckPositiveNumber({ number }) {
    if (number > 0) {
        return (
            <div className=" text-sm" style={{ color: 'green' }}>
              <i class="fa fa-caret-up" aria-hidden="true"></i> <br />
               {parseFloat(number).toFixed(2)}%
            </div>
        )
    } else {
        return (
            <div style={{ color: 'red' }}>
           
                {parseFloat(number).toFixed(2)}% <br />
                <i class="fa fa-caret-down" aria-hidden="true"></i> 
            </div>
        )
    }
}

export default CheckPositiveNumber