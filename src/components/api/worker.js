import axios from 'axios';

export const viewClientProfile = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/clients/${client_id}`);
};

export const editWorkerProfile = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/workers/edit', data);
};

export const editWorkerPicture = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/workerpicture', data);
};

export const searchAllJobOffer = () => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/searchjoboffer`);
};

export const searchAllJobOffers = bidder_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/searchalljoboffers/${bidder_id}`);
};

export const searchJobOffer = category => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/searchjoboffer/${category}`);
};

export const onGoingWorker = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/ongoingworker/${worker_id}`);
};

export const doneWorker = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/doneworker/${worker_id}`);
};

export const viewJobOffer = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/viewjoboffer/${worker_id}`);
};

export const addBid = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/bid', data);
};

export const acceptOffer = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/joboffers/acceptoffer', data);
};

export const rejectOffer = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/joboffers/rejectoffer', data);
};

export const addClientRating = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/rateclient', data);
};

export const reportClient = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/reportclient', data);
};

export const viewReasons = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/reason');
};

export const viewSkills = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/skills');
};

export const viewRating = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/ratingreview/${client_id}`);
};

export const workerRated = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/workerrated', data);
};

export const workerReported = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/workerreported', data);
};

export const viewBid = (job_id, bidder_id) => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/viewbid/${job_id}/${bidder_id}`);
};

export const viewBead = (bidder_id) => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/viewbead/${bidder_id}`);
};