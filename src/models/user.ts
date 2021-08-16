'use strict';
import { Model, DataTypes, Optional } from 'sequelize';
import database from '../config/database.connection'
import UserAttributesI from './interfaces/user.interface';

export class UserModel extends Model implements UserAttributesI{
  id?: Number | undefined;
  username!: string;
  password!: string;
  active_session!: boolean;
  token!: string;
  status!: string;
  customer_id!: Number;
}
UserModel.init( {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
  active_session: DataTypes.BOOLEAN,
  token: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  customer_id: DataTypes.INTEGER
}, {
  sequelize: database,
  modelName: 'User',
  tableName: 'users',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});