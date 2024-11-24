import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('proyecto', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});