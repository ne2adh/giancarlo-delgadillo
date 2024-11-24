import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define los atributos de Task
interface TaskAttributes {
  id: number;
  name: string;
  done: boolean;
  userId: number;
}

// Define las opciones para crear una tarea (todos menos `id` son opcionales)
interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

// Define el modelo de Task
export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: number; // Sequelize asignará el valor
  public name!: string;
  public done!: boolean;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa el modelo
Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
  }
);

