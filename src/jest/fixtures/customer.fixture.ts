import Customer from '../../models/interfaces/basecustomer';

const customerFixture: Customer = {
    first_name: 'Gil',
    primary_last_name: 'mendez',
    second_last_name: 'santiz',
    phone: '3321111111',
    rfc: 'MESG950515123',
    address: {
		street: "some street",
		number: "1993",
		neighborhood: "la estancia",
		state: "Jalisco",
		municipality: "Zapopan",
		country: "Mexico",
        customer_id: "101"
	},
};

export default customerFixture;