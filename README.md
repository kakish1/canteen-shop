function formatNumberManual(number) {
  const parts = number.toFixed(2).split('.');  // Округление до 2 знаков после запятой
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');  // Добавление тысячных разделителей
  return parts.join('.');
}
