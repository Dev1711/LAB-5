document.addEventListener('DOMContentLoaded', function () {
    const billInput = document.getElementById('totbill');
    const slider = document.getElementById('slider');
    const percent = document.getElementById('percent');
    const amt = document.getElementById('amt');
    const tottaxt = document.getElementById('tottaxt');
    const tipValue = document.getElementById('tipValue');
    const errorDiv = document.getElementById('error');
    const currencySelect = document.getElementById('currency');
    const convertedTip = document.getElementById('convertedTip');
    const convertedTotal = document.getElementById('convertedTotal');
  
    function update() {
      const bill = parseFloat(billInput.value);
      const tip = parseInt(slider.value);
      const currency = currencySelect.value;
  
      // Validation
      if (isNaN(bill) || bill < 0) {
        errorDiv.textContent = "Please enter a valid positive bill amount";
        percent.value = amt.value = tottaxt.value = "";
        convertedTip.value = convertedTotal.value = "";
        return;
      }
  
      errorDiv.textContent = "";
      tipValue.textContent = `${tip}%`;
      percent.value = `${tip}%`;
  
      // Tip and Tax Calculation
      const tipAmt = (bill * (tip / 100)).toFixed(2);
      const billWithTip = bill + parseFloat(tipAmt);
      const billWithTipAndTax = (billWithTip * 1.11).toFixed(2);
  
      amt.value = `$${tipAmt}`;
      tottaxt.value = `$${billWithTipAndTax}`;
  
      // Currency Conversion
      let symbol = "";
      let rate = 1;
  
      if (currency === "USD") {
        symbol = "$";
        rate = 1;
      } else if (currency === "EUR") {
        symbol = "€";
        rate = 0.95;
      } else if (currency === "INR") {
        symbol = "₹";
        rate = 85;
      } else {
        convertedTip.value = "";
        convertedTotal.value = "";
        return;
      }
  
      const convertedTipValue = (parseFloat(tipAmt) * rate).toFixed(2);
      const convertedTotalValue = (billWithTip * 1.11 * rate).toFixed(2);
  
      convertedTip.value = `${symbol}${convertedTipValue}`;
      convertedTotal.value = `${symbol}${convertedTotalValue}`;
    }
  
    billInput.addEventListener('input', update);
    slider.addEventListener('input', update);
    currencySelect.addEventListener('change', update);
  });
  