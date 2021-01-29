import axios from 'axios';

export const getServerStatus = async ({ipAddress}) => {
	console.log(`getServerStatus @ ${new Date()}`);

	try {
		const newData = await axios.get(`${ipAddress}/api/server`);
		console.log(`get request to ${ipAddress} successful!`);
		return newData.data;
	} catch (e) {
		console.log(e);
	};
};
