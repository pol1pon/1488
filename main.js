const CarSaver = require('./CarSaver');

//NOTE здесь рабочий код, менять не нужно

const filePath = './cars.txt';

async function main(filePath) {
  try {
    //* Метод для чтения файла
    const fileData = await CarSaver.loadDataFromFile(filePath);

    //* Метод преобразования данных из файла в массив объектов без лишних данных
    const formattedData = CarSaver.reorganizeData(fileData);

    //* Метод поиска авто со скоростью выше 250км/ч
    const existingCars = CarSaver.searchFastCars(formattedData);
console.log('`12', existingCars);
    //* Метод записи массива объектов авто в базу данных
    await CarSaver.writeDataToDB(existingCars);
    console.log(`Данные были успешно добавлены в базу данных`);

    //* Метод вывода новых данных из базы (УЖЕ РЕАЛИЗОВАН)
    await CarSaver.getCarsDataFromDB();
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

main(filePath);
