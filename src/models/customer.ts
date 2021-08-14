'use strict';
import { Model, DataTypes } from 'sequelize'
import database from '../config/database.connection';
import CustomerAttributesI from '../models/interfaces/customer.interface';
import AddressModel from '../models/interfaces/address.interface';
import { UserModel } from './user'
export class CustomerModel extends Model implements CustomerAttributesI {
  id?: Number | undefined;
  first_name!: string;
  primary_last_name!: string;
  second_last_name!: string;
  phone!: string;
  rfc!: string;
  address?: AddressModel;
}

CustomerModel.init( {
  first_name: DataTypes.STRING,
  primary_last_name: DataTypes.STRING,
  second_last_name: DataTypes.STRING,
  phone: DataTypes.STRING,
  rfc: DataTypes.STRING
}, {
  sequelize: database,
  modelName: 'Customer',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
} );
CustomerModel.hasOne( UserModel, {
  foreignKey: 'customer_id'
}  )
