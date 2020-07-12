'use strict';

const bigXml = require('big-xml'),
	tables = require('./tables');


/**
 ** Вызов функции для заполнения  Типы адресных объектов
 */
(async () => {
	//проверка наличия записей в таблице
	if ((await tables.SOCRBASE.count()) == 0) {
		//считвание файла
		const readerSOCRBASE = await bigXml.createReader('data/SOCRBASE.XML');
		//получение данных в потоке
		readerSOCRBASE.on('record', async (record) => {
      if(record.LIVESTATUS == 1 && Number(record.AOLEVEL) <= 6 )
			//добавление записис в таблицу
			await tables.SOCRBASE.create(record.attrs);
		});
	}
})();

/**
 ** Вызов функции для заполнения  Классификатор адресообразующих элементов
 */
(async () => {
	//проверка наличия записей в таблице
	if ((await tables.ADDROBJ.count()) == 0) {
		//считвание файла
    const readerADDROBJ = await bigXml.createReader('data/ADDROBJ.XML');
		//получение данных в потоке
		readerADDROBJ.on('record', async (record) => {
      //добавление записис в таблицу
      if(record.attrs.LIVESTATUS == 1 && Number(record.attrs.AOLEVEL) <= 6 )
			await tables.ADDROBJ.create(record.attrs);
		});
	}
})();

