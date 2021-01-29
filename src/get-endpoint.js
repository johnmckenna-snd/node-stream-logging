import axios from 'axios';

export const getEndpoint = async ({ipAddress, endpoint}) => {
	console.log(`GET request to ${ipAddress}, ${endpoint}`);

	try {
		const response = await axios.get(`${ipAddress}${endpoint}`);
		console.log(`Successful.`);
		return response.data;
	} catch (e) {
		const errorReturn = { 'error': e };
		return errorReturn;
	}
};
