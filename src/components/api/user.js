import axios from 'axios';

export const getUnapprovedUsers = () => {
	return axios.get(`https://specialprojectapplication.herokuapp.com/api/users/unapproved`);
}

export const getUsersInfo = () => {
	return axios.get(`https://specialprojectapplication.herokuapp.com/api/users-info`);
}

export const viewAllClientProfile = () => {
	return axios.get(`https://specialprojectapplication.herokuapp.com/api/clients`);
}

export const viewAllWorkerProfile = () => {
	return axios.get(`https://specialprojectapplication.herokuapp.com/api/workers`);
}

