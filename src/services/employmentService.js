import axios from 'axios';
import { API_BASE_URL } from '../config';
import { authHeader } from '../helpers/authHeader';

export const employmentService = {
    getEmployment,
    getEmploymentsByProfileId,
    updateEmployment,
    createEmployment
};

async function getEmployment(employmentId) {
    const response = await axios.get(`${API_BASE_URL}/employments/${employmentId}`, {
        headers: authHeader()
    });
    if (response?.data?.id) {
        return response.data;
    } else {
        return null;
    }
}

async function getEmploymentsByProfileId(profileId) {
    const response = await axios.get(`${API_BASE_URL}/employments`, {
        headers: authHeader(),
        params: {
            profile: profileId
        }
    });

    return response?.data;
}

async function updateEmployment(employment) {
    const response = await axios.put(`${API_BASE_URL}/employments/${employment.id}`,
        employment,
        { headers: authHeader() });
    
    if (response?.data?.id) {
        return response.data;
    } else {
        return null;
    }
}

async function createEmployment(employment) {
    const response = await axios.post(`${API_BASE_URL}/employments`,
        employment,
        { headers: authHeader() });
    
    if (response?.data?.id) {
        return response.data;
    } else {
        return null;
    }
}
