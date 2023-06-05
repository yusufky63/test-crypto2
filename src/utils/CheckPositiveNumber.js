function CheckPositiveNumber({ number}) {
  if (number > 0) {
    return (
      <div className="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>

        {/* <span className={`text-[${textSize}]`}>
           
          {parseFloat(number).toFixed(2)}% 
        </span> */}
          <span className="text-xs">
          {parseFloat(number).toFixed(2)}%
        </span>
      </div>
    );
  } else {
    return (
      <div className="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          />
        </svg>

        {/* <span className={`text-[${textSize}]`}>
          {parseFloat(number).toFixed(2)}%
        </span> */}
        <span className="text-xs">
          {parseFloat(number).toFixed(2)}%
        </span>
      </div>
    );
  }
}

export default CheckPositiveNumber;
