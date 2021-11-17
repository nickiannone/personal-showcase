import { getJWT } from '../services/useAuth';

export function authHeader() {
    const jwt = getJWT();
    if (jwt) {
        return { Authorization: `Bearer ${jwt}` };
    } else {
        return {};
    }
};