import axios from 'axios';

export const viewClientProfile = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/clients/${client_id}`);
};

export const viewAllClientProfile = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/clients');
};

export const viewWorkerProfile = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/workers/${worker_id}`);
};

export const viewAllWorkerProfile = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/workers');
};

// export const removeClient = username => {
// 	console.dir();
// 	console.log(typeof(username.username));
// 	console.log(`/api/clients/${username.username}`);
//   return axios.delete(`/api/clients/${username.username}`);
// };

export const removeClient = client_id => {
	return axios.delete(`https://specialprojectapplication.herokuapp.com/api/clients/${client_id.client_id}`);
};

export const removeWorker = worker_id => {
  return axios.delete(`https://specialprojectapplication.herokuapp.com/api/workers/${worker_id.worker_id}`);
};

export const viewReported = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/viewreported');
};

export const viewClientReporter = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/viewclientreporter/${client_id}`);
};

export const viewWorkerReporter = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/viewworkerreporter/${worker_id}`);
};

export const viewDistinctReported = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/viewdistinctreported');
};

export const approveWorker = worker_id => {
  return axios.put(`https://specialprojectapplication.herokuapp.com/api/approve/${worker_id.worker_id}`);
};

export const viewUnapproved = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/unapproved');
};

export const suspendWorker = worker_id => {
  return axios.put(`https://specialprojectapplication.herokuapp.com/api/suspendworker/${worker_id.worker_id}`);
};

export const unsuspendWorker = worker_id => {
  return axios.put(`https://specialprojectapplication.herokuapp.com/api/unsuspendworker/${worker_id.worker_id}`);
};

export const suspendClient = client_id => {
  return axios.put(`https://specialprojectapplication.herokuapp.com/api/suspendclient/${client_id.client_id}`);
};

export const unsuspendClient = client_id => {
  return axios.put(`https://specialprojectapplication.herokuapp.com/api/unsuspendclient/${client_id.client_id}`);
};

export const addBan = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/ban', data);
};