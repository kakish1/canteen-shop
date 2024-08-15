function formatNumber(number) {
  // Преобразуем число в строку с двумя знаками после запятой
  let [integerPart, decimalPart] = number
    .toFixed(2) // Преобразуем к строке с двумя знаками после точки
    .split('.'); // Разделяем на целую и дробную часть
  
  // Добавляем тысячные разделители к целой части
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Объединяем целую и дробную части обратно
  return integerPart + '.' + decimalPart;
}
