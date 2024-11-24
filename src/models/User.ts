import { DataTypes, Model, Optional, Association, HasManyGetAssociationsMixin } from 'sequelize';
import { sequelize } from '../config/database';
import { Task } from './Task';

// Define los atributos de User
interface UserAttributes {
  id: number;
  username: string;
  password: string;
  status: 'active' | 'inactive';
}

// Define las opciones para crear un usuario (todos menos `id` son opcionales)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define el modelo de User
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public status!: 'active' | 'inactive';

  // Sequelize agrega estas propiedades en tiempo de ejecución
  public readonly tasks?: Task[]; // Relación definida manualmente

  // Métodos de Sequelize para relaciones
  public getTasks!: HasManyGetAssociationsMixin<Task>; // Ejemplo: user.getTasks()

  public static associations: {
    tasks: Association<User, Task>;
  };

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Inicializa el modelo
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

