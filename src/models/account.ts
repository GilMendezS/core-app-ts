'use strict';
import { Model, DataTypes } from 'sequelize';
import AccountAttributesI from '../models/interfaces/account.interface'
import database from '../config/database.connection'

export class AccountModel extends Model implements AccountAttributesI {
  id?: number | undefined;
  account_number!: string;
  product_id!: number;
  balance!: number;
  status!: string;
  nip!: string;
  customer_id!: number;
  external!: boolean
  hasEnoughBalance( amount: number ) {
    return this.balance >= amount;
  }
  restBalance( amount: number ) {
    return this.balance - amount;
    
  }
  sumBalance( amount: number ) {
    return this.balance + amount;
  }
}

AccountModel.init({
    account_number: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    balance: DataTypes.DOUBLE,
    status: DataTypes.STRING,
    nip: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    external: DataTypes.BOOLEAN
  }, {
    sequelize: database,
    tableName: 'accounts',
    modelName: 'Account',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });