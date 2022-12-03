function CheckPositiveNumber({ number }) {
  if (number > 0) {
    return (
      <div class="inline-flex gap-2 rounded bg-green-100 p-1 text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>

        <span class="text-xs font-medium">
          {" "}
          {parseFloat(number).toFixed(2)}%{" "}
        </span>
      </div>
    );
  } else {
    return (
      <div class="inline-flex gap-2 rounded bg-red-100 p-1 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          />
        </svg>

        <span class="text-xs font-medium">
          {parseFloat(number).toFixed(2)}%
        </span>
      </div>
    );
  }
}

export default CheckPositiveNumber;
