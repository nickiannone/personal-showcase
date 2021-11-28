import axios from 'axios';
import { API_BASE_URL } from '../config';
import { authHeader } from '../helpers/authHeader';

export const profileService = {
    getProfile,
    updateProfile,
    getUserId
};

// Helper to get us the user ID of a profile
function getUserId(profile) {
    return Number.isInteger(profile.user) ? profile.user : profile.user.id;
}

async function getProfile(profileId) {
    const response = await axios.get(`${API_BASE_URL}/profiles/${profileId}`, {
        headers: authHeader()
    });
    if (response?.data?.id) {
        return response.data;
    } else {
        return null;
    }
}

// TODO Add backend granular permissions so users can only update their own profile!
async function updateProfile(profile) {
    const response = await axios.put(`${API_BASE_URL}/profiles/${profile.id}`,
        profile,
        { headers: authHeader() });
    
    if (response?.data?.id) {
        return response.data;
    } else {
        return null;
    }
}
