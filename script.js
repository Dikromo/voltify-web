// Voltify Landing Page Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // 1. FAQ Accordion Handler
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 2. Interactive Live Electricity Cost Calculator Demo
  const wattInput = document.getElementById('demoWatt');
  const hoursInput = document.getElementById('demoHours');
  const hoursVal = document.getElementById('hoursVal');
  const tariffInput = document.getElementById('demoTariff');
  
  const dailyCostEl = document.getElementById('demoDailyCost');
  const monthlyCostEl = document.getElementById('demoMonthlyCost');
  const yearlyCostEl = document.getElementById('demoYearlyCost');

  function calculateDemo() {
    const watt = parseFloat(wattInput.value) || 0;
    const hours = parseFloat(hoursInput.value) || 0;
    const tariff = parseFloat(tariffInput.value) || 1444.7;

    hoursVal.textContent = hours + ' Jam/Hari';

    const dailyKwh = (watt * hours) / 1000.0;
    const dailyCost = dailyKwh * tariff;
    const monthlyCost = dailyCost * 30.0;
    const yearlyCost = dailyCost * 365.0;

    dailyCostEl.textContent = formatRupiah(dailyCost);
    monthlyCostEl.textContent = formatRupiah(monthlyCost);
    yearlyCostEl.textContent = formatRupiah(yearlyCost);
  }

  function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  }

  if (wattInput && hoursInput && tariffInput) {
    wattInput.addEventListener('input', calculateDemo);
    hoursInput.addEventListener('input', calculateDemo);
    tariffInput.addEventListener('change', calculateDemo);
    calculateDemo();
  }

  // Preset Buttons for Live Demo
  const presetBtns = document.querySelectorAll('.demo-preset-btn');
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const watt = btn.getAttribute('data-watt');
      const hours = btn.getAttribute('data-hours');
      if (wattInput && hoursInput) {
        wattInput.value = watt;
        hoursInput.value = hours;
        calculateDemo();
      }
    });
  });
});
