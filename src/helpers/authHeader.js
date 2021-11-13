import { authService } from '../services/authService';

export function authHeader() {
    const currentUser = authService.currentUserValue;
    if (currentUser && currentUser.jwt) {
        return { Authorization: `Bearer ${currentUser.jwt}` };
    } else {
        return {};
    }
}