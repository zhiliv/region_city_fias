'use strict';

const Sequelize = require('sequelize'),
	fs = require('fs'),
	config = JSON.parse(fs.readFileSync('./config/mysql.json').toString());

//инициализация ORM
const sequelize = new Sequelize(config.database, config.user, config.password, {
	dialect: config.dialect,
	host: config.host,
	define: {
		//отключение дополнительных параметров времени
		timestamps: false,
	},
	logging: false,
	pool: {
		max: 100,
		min: 0,
		idle: 2000000,
		// @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
		acquire: 10000000,
	},
});

/**
 ** Структура таблицы SOCRBASE
 ** Типы адресных объектов
 * @constant SOCRBASE
 */
const SOCRBASE = (module.exports.SOCRBASE = sequelize.define(
	'SOCRBASE',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			comment: 'Идентифитор типа адресного объекта',
		},
		LEVEL: {
			type: Sequelize.STRING(5),
			allowNull: false,
			comment: 'Уровень адресного объекта',
		},
		SCNAME: {
			type: Sequelize.STRING(10),
			allowNull: false,
			comment: 'Краткое наименование типа объекта',
		},
		SOCRNAME: {
			type: Sequelize.STRING(50),
			allowNull: false,
			comment: 'Полное наименоание типа объекта',
		},
		KOD_T_ST: {
			type: Sequelize.STRING(4),
			allowNull: false,
			comment: 'Ключевое поле',
		},
	},
	{ tableName: 'SOCRBASE', comment: 'Типы адресных объектов' },
));

/**
 ** Структура таблицы ADDROBJ
 ** Реестр образующих элеметтов
 * @constant ADDROBJ
 */
const ADDROBJ = (module.exports.ADDROBJ = sequelize.define(
	'ADDROBJ',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
			comment: 'Идентифитор записи реестра образующих элементов',
    },
    AOGUID: {
      type: Sequelize.STRING(36),
      allowNull: false,
      comment: 'Глобальный уникальный идентификатор адресного объекта '
    },
    FORMALNAME: {
      type: Sequelize.STRING(120),
      allowNull: false,
      comment: 'Формализованное наименование'
    },
		REGIONCODE: {
			type: Sequelize.STRING(2),
			allowNull: false,
			comment: 'Код региона',
		},
		AUTOCODE: {
			type: Sequelize.STRING(1),
			allowNull: false,
			comment: 'Код автономии',
		},
		AREACODE: {
			type: Sequelize.STRING(3),
			allowNull: false,
			comment: 'Код района',
		},
		CITYCODE: {
			type: Sequelize.STRING(3),
			allowNull: false,
			comment: 'Код города',
		},
		CTARCODE: {
			type: Sequelize.STRING(3),
			allowNull: false,
			comment: 'Код внутригородского района',
		},
		PLACECODE: {
			type: Sequelize.STRING(3),
			allowNull: false,
			comment: 'Код населенного пункта',
		},
		OFFNAME: {
			type: Sequelize.STRING(120),
			allowNull: false,
			comment: 'Официальное наименование',
		},
		POSTALCODE: {
			type: Sequelize.STRING(6),
			allowNull: true,
			comment: 'Почтовый индекс',
		},
		SHORTNAME: {
			type: Sequelize.STRING(10),
			allowNull: false,
			comment: 'Краткое наименование типа объекта',
		},
		AOLEVEL: {
			type: Sequelize.INTEGER(10),
			allowNull: false,
			comment: 'Уровень адресного объекта',
		},
		PARENTGUID: {
			type: Sequelize.STRING(36),
			allowNull: true,
			comment: 'Идентификатор объекта родительского объекта',
		},
		AOID: {
			type: Sequelize.STRING(36),
			allowNull: false,
			comment: 'Уникальный идентификатор записи. Ключевое поле.',
		}
	},
	{ tableName: 'ADDROBJ', comment: 'Реестр образующих элементов' },
));


sequelize.sync({ force: false });
