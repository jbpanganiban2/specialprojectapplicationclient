import axios from 'axios';
axios.defaults.withCredentials = true;

// const api = axios.create({baseURL: 'https://specialprojectapplication.herokuapp.com' });
// if (process.env.REACT_APP_BACKEND_URL) {
// Axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
// }

export const getSession = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/session');
};

export const login = credentials => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/login', credentials);
};

// export const logout = empno => {
//   axios.put('/api/firstTime', empno);
//   return axios.post('/api/logout');
// };

export const logout = () => {
  // axios.put('/api/firstTime', empno);
  return axios.post('https://specialprojectapplication.herokuapp.com/api/logout');
};

// export const signUp = data => {
//   return axios.post('/api/clients', data);
// }

export const signUpClient = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/clients', data);
}

export const signUpWorker = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/workers', data);
}

// export const editUser = data => {
// 	return axios.put('/api/users', data)
// }

// export const changePassword = data => {
// 	return axios.put('/api/users/editPassword', data)
// }

// export const approveUser = empNo => {
// 	return axios.put(`/api/approve/${empNo}`)
// }

// export const deleteUser = empNo => {
// 	return axios.delete(`/api/users/${empNo}`)
// }

// export const approveWorker = worker_id => {
// 	return axios.put(`/api/approve/${worker_id}`)
// }

export const deleteClient = client_id => {
	return axios.delete(`https://specialprojectapplication.herokuapp.com/api/users/${client_id}`)
}

export const deleteWorker = worker_id => {
	return axios.delete(`https://specialprojectapplication.herokuapp.com/api/users/${worker_id}`)
}

export const editClient = data => {
	return axios.put('https://specialprojectapplication.herokuapp.com/api/clients/edit', data)
}

export const editWorker = data => {
	return axios.put('https://specialprojectapplication.herokuapp.com/api/workers/edit', data)
}

export const viewSkills = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/skills');
};

export const topJobOffer = () => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/topjoboffers`);
};

export const topWorker = () => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/topworker`);
};

export const topClient = () => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/topclient`);
};
