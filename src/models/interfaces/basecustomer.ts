import CustomerAttributesI from './customer.interface';
import AddressAttributes from './address.interface';
export default interface CompleteCustomer extends CustomerAttributesI{
    address?: AddressAttributes;
}