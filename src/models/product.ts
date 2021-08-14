'use strict';
import { Model, DataTypes } from 'sequelize';
import database from '../config/database.connection'
import ProductAttributesI from './interfaces/product.interface';

export class AccountModel extends Model implements ProductAttributesI {
  id?: number;
  name!: string;
  description?: string;
  active?: boolean;
}

AccountModel.init({
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  active: DataTypes.BOOLEAN
  }, {
    sequelize: database,
    tableName: 'accounts',
    modelName: 'Account',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });