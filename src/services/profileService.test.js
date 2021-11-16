import { API_BASE_URL } from '../config';
import { profileService } from '../services/profileService';
import { authHeader } from '../helpers/authHeader';

import axios from 'axios';

import { waitFor } from '@testing-library/react';

jest.mock('axios');

describe('profileService unit tests', () => {

    const profile = {
        id: 1,
        display_name: "Test",
        subtitle: "",
        overview: "",
        email_address: "test@example.com",
        phone: "",
        user: 1
    };

    const jwt = "test-jwt";

    const user = {
        id: 1,
        username: "app_user",
        email: "test@example.com",
        provider: "local",
        confirmed: true,
        blocked: false,
        profile: {
            id: 1,
            display_name: "Test",
            subtitle: "",
            overview: "",
            email_address: "test@example.com",
            phone: "",
            user: 1
        }
    };

    beforeEach(() => {
        // Set up the auth stuff so we're already logged in
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', jwt);
    });

    it('should get a profile correctly', async () => {
        // given
        axios.get.mockResolvedValue({
            data: profile
        });

        // when
        const resolvedProfile = await profileService.getProfile(1);

        // then
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/profiles/1`, {
            headers: authHeader()
        }));

        expect(resolvedProfile).toStrictEqual(profile);
    });

    it('should fail to get a non-existent profile', async () => {
        // given
        axios.get.mockResolvedValue('Not Found');

        // when
        const resolvedProfile = await profileService.getProfile(2);

        // then
        await waitFor(() => expect(axios.get).toHaveBeenCalledWith(`${API_BASE_URL}/profiles/2`, {
            headers: authHeader()
        }));

        expect(resolvedProfile).toBeNull();
    });

    it('should update a profile which matches the current user profile', async () => {
        // given
        axios.put.mockResolvedValue({
            data: profile
        });

        // when
        const resolvedProfile = await profileService.updateProfile(profile);

        // then
        expect(axios.put).toHaveBeenCalledWith(`${API_BASE_URL}/profiles/1`, profile, {
            headers: authHeader()
        });

        expect(resolvedProfile).toStrictEqual(profile);
    });
});