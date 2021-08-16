'use strict';
import { Model, DataTypes } from 'sequelize';
import database from '../config/database.connection';
import AddressAttributesI from '../models/interfaces/address.interface';

export class AddressModel extends Model implements AddressAttributesI{
  id?: Number | undefined;
  street!: string;
  number!: string;
  neighborhood!: string;
  municipality!: string;
  state!: string;
  country!: string;
  customer_id!: string;
}

AddressModel.init( {
  street: DataTypes.STRING,
  number: DataTypes.STRING,
  neighborhood: DataTypes.STRING,
  municipality: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING,
  customer_id: DataTypes.INTEGER
}, {
  sequelize: database,
  modelName: 'Address',
  tableName: 'addresses',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
} );
