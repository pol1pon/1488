const fs = require('fs').promises;
const { Car } = require('./db/models');
const {EOL} = require('os')

class CarSaver {
  //* Метод для чтения файла
  static async loadDataFromFile(filePath) {
   const data = await fs.readFile(filePath, 'utf8');
   console.log("дата", data);
   return data;
  }

  //* Метод преобразования данных из файла в массив объектов без лишних данных
  static reorganizeData(data) {
    const arrCars = data.split(EOL);
    console.log('ARR of CARS', arrCars);
    const arrWithArr = arrCars.map((el) => (el.split(', ')))
   
    
    const objFromArr = arrWithArr.map(car => ({
      model: car[0],
      max_speed: parseInt(car[1]),
      owner: car[3]
      }));
      // console.log('что получилось?', objFromArr);

      return objFromArr;



  }

  //* Метод поиска авто со скоростью выше 250км/ч
  static searchFastCars(reorganizedData) {
    const cars = reorganizedData.filter((el) => el.max_speed > 250);
    // console.log('покажи быструю тачку', cars);
    return cars;


  }

  //* Метод записи массива объектов авто в базу данных
  static async writeDataToDB(cars) {
    try {
      const result = await Car.bulkCreate(cars);
      // console.log('what is it', result);
    } catch (error) {
      console.log(error);
    }
   

  }

  //* Метод вывода новых данных из базы (УЖЕ РЕАЛИЗОВАН)
  static async getCarsDataFromDB() {
    try {
      const allCars = await Car.findAll({ raw: true });
      console.log(allCars);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CarSaver;
