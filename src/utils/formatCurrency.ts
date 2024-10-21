const formatCurrency = (value: number, currency: string = "USD") => {
  if (!value) {
    value = 0;
  }

  return value.toLocaleString("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  });
};

export default formatCurrency;
