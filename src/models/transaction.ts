import { Model, DataTypes } from 'sequelize';
import database from '../config/database.connection'
import { TransactionAttibutes } from './interfaces/transaction.interface'
export class TransactionModel extends Model implements TransactionAttibutes {
  id?: number | undefined;
  customer_id!: number;
  amount!: number;
  origin_account!: number;
  destination_account!: number;
  type!: string;
  concept!: string;
  reference!: string;
  operation!: string;
  status!: string;
  details!: string;
  static PAYMENT_TYPE = 'abono';
  static TRANSFER_TYPE = 'cargo';
};
TransactionModel.init({
  customer_id: DataTypes.INTEGER,
  amount: DataTypes.DOUBLE,
  origin_account: DataTypes.INTEGER,
  type: DataTypes.STRING,
  concept: DataTypes.STRING,
  reference: DataTypes.STRING,
  operation: DataTypes.STRING,
  status: DataTypes.STRING,
  destination_account: DataTypes.INTEGER,
  details: DataTypes.STRING,
}, {
  sequelize: database,
  modelName: 'Transaction',
  tableName: 'transactions',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});