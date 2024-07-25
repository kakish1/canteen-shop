var currentDate = new Date();

// Форматируем дату и время
var day = String(currentDate.getDate()).padStart(2, '0');
var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
var year = currentDate.getFullYear();
var hours = String(currentDate.getHours()).padStart(2, '0');
var minutes = String(currentDate.getMinutes()).padStart(2, '0');
var seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Создаем строку в нужном формате
var formattedDateTime = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + ':' + seconds;
