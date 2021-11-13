import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authService = {
    login,
    logout,
    register,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return JSON.parse(currentUserSubject.value);
    },
    get currentUserId() {
        return JSON.parse(currentUserSubject.value)?.user?.id;
    }
};

async function login(email, password) {
    const response = await axios.post(`${API_BASE_URL}/auth/local`, {
        identifier: email,
        password: password
    });
    if (response.data.jwt) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        currentUserSubject.next(response.data);
    }
    return response.data;
}

async function register(username, email, password) {
    const response = await axios.post(`${API_BASE_URL}/auth/local/signup`, {
        username: username,
        email: email,
        password: password
    });
    if (response.data.jwt) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        currentUserSubject.next(response.data);
    }
    return response.data;
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}