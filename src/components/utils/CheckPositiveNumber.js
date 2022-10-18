
function CheckPositiveNumber({ number }) {
    if (number > 0) {
        return (
            <div className=" text-sm" style={{ color: 'green' }}>
              <i className="fa fa-caret-up" aria-hidden="true"></i> <br />
               {parseFloat(number).toFixed(2)}%
            </div>
        )
    } else {
        return (
            <div style={{ color: 'red' }}>
           
                {parseFloat(number).toFixed(2)}% <br />
                <i className="fa fa-caret-down" aria-hidden="true"></i> 
            </div>
        )
    }
}

export default CheckPositiveNumber