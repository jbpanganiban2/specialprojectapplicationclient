import axios from 'axios';

export const viewWorkerProfile = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/workers/${worker_id}`);
};

export const editClientProfile = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/clients/edit', data);
};

export const editClientPicture = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/clientpicture', data);
};

export const addJobOffer = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/joboffers', data);
};

export const searchWorker = () => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/searchworkers`);
};

export const viewPostedJobs = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/viewpostedjobs/${client_id}`);
};

export const viewOfferedJobs = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/viewofferedjobs/${client_id}`);
};

export const onGoingClient = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/ongoingclient/${client_id}`);
};

export const doneClient = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/joboffers/doneclient/${client_id}`);
};

export const hireWorker = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/joboffers/', data);
};

export const searchBids = job_offer_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/bids/searchbids/${job_offer_id}`);
};

export const completeJob = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/completejob', data);
};

export const reportWorker = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/reportworker', data);
};

export const addWorkerRating = data => {
  return axios.post('https://specialprojectapplication.herokuapp.com/api/rateworker', data);
};

export const viewReview = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/reviewrating/${worker_id}`);
};

export const viewCategory = () => {
  return axios.get('https://specialprojectapplication.herokuapp.com/api/category');
};

export const getClientRating = client_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/getclientrating/${client_id}`);
};

export const getWorkerRating = worker_id => {
  return axios.get(`https://specialprojectapplication.herokuapp.com/api/getworkerrating/${worker_id}`);
};

export const clientRated = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/clientrated', data);
};

export const clientReported = data => {
  return axios.put('https://specialprojectapplication.herokuapp.com/api/clientreported', data);
};