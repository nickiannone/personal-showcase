import React from 'react';
import { useAuth } from '../../services/useAuth';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginView from './LoginView';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router';

const mockAuth = {
    _user: null,
    _jwt: null,
    login: jest.fn(),
    logout: jest.fn(),
    register: jest.fn(),
    get user() { return this._user; },
    get jwt() { return this._jwt; }
};

function resetMocks() {
    mockAuth.login.mockReset();
    mockAuth.logout.mockReset();
    mockAuth.register.mockReset();
    mockAuth._user = null;
    mockAuth._jwt = null;
}

function mockLoginSuccess(user, jwt) {
    mockAuth.login.mockReset();
    mockAuth.login.mockImplementation(async (email, password) => {
        mockAuth._user = user;
        mockAuth._jwt = jwt;
        return Promise.resolve(user);
    });
}

function mockLoginFailure(error) {
    mockAuth.login.mockReset();
    mockAuth.login.mockImplementation(async (email, password) => {
        return Promise.reject(error);
    });
}

function mockRegisterSuccess(user, jwt) {
    mockAuth.register.mockReset();
    mockAuth.register.mockImplementation(async (username, email, password) => {
        mockAuth._user = user;
        mockAuth._jwt = jwt;
        return Promise.resolve(user);
    });
}

function mockRegisterFailure(error) {
    mockAuth.register.mockReset();
    mockAuth.register.mockImplementation(async (username, email, password) => {
        return Promise.reject(error);
    });
}

function mockLogoutSuccess() {
    mockAuth.logout.mockReset();
    mockAuth.logout.mockImplementation(async () => {
        mockAuth._user = null;
        mockAuth._jwt = null;
        return Promise.resolve(); 
    });
}

function mockLogoutFailure(error) {
    mockAuth.logout.mockReset();
    mockAuth.logout.mockImplementation(async () => {
        return Promise.reject(error);
    });
}

jest.mock('../../services/useAuth', () => ({
    useAuth: () => mockAuth
}));

const MockLandingComponent = () => {
    const auth = useAuth();
    const params = useParams();

    return (
        <div data-testid="wrapper">
            <span data-testid="profileId">{params?.profileId}</span>
            <span data-testid="user">{JSON.stringify(auth?.user)}</span>
            <span data-testid="jwt">{auth?.jwt}</span>
        </div>
    );
};

describe('LoginView component', () => {
    
    beforeEach(() => {
        resetMocks();
    });

    it('should log in when a correct username/password are specified', async () => {
        // given:
        // - a correct email and password
        const EMAIL = 'user@example.com';
        const PASS = 'pass';

        // - a working login
        const authed_user = {
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
        const jwt = "DUMMY";
        mockLoginSuccess(authed_user, jwt);

        // when:
        // - the LoginView is rendered
        const component = render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/profile/:profileId" element={<MockLandingComponent />} />
                    <Route path="*" element={() => (<div data-testid="error">ROUTE NOT FOUND!</div>)} />
                </Routes>
            </MemoryRouter>
        );

        // - the user logs in
        act(() => {
            // - The email is entered
            userEvent.type(component.getByLabelText(/email address/i), EMAIL);
        });
        act(() => {
            // - The password is entered
            userEvent.type(component.getByLabelText(/password/i), PASS);
        });
        act(() => {
            // - The submit button is clicked
            userEvent.click(component.getByText(/submit/i));
        });

        // then:
        // - the login method has been invoked
        expect(mockAuth.login).toHaveBeenCalledTimes(1);

        // - the navigation succeeds
        await screen.findByTestId("profileId");

        // - the user is logged in
        expect(screen.getByTestId('profileId')).toContainHTML("1");
        expect(screen.getByTestId('user')).toContainHTML(JSON.stringify(authed_user));
        expect(screen.getByTestId('jwt')).toContainHTML(jwt);
    });

    it('should display an error when invalid credentials are specified', async () => {
        // given:
        // - an incorrect username and password
        const EMAIL = "test_invalid@example.com";
        const PASS = "DUMMY"; 

        // - a failing login
        mockLoginFailure({
            "message":"Request failed with status code 400",
        });

        // when:
        // - the LoginView is rendered
        const component = render(
            <MemoryRouter initialEntries={["/"]}>
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/profile/:profileId" element={<MockLandingComponent />} />
                    <Route path="*" element={() => (<div data-testid="error">ROUTE NOT FOUND!</div>)} />
                </Routes>
            </MemoryRouter>
        );

        // - the user logs in
        act(() => {
            // - The email is entered
            userEvent.type(component.getByLabelText(/email address/i), EMAIL);
        });
        act(() => {
            // - The password is entered
            userEvent.type(component.getByLabelText(/password/i), PASS);
        });
        act(() => {
            // - The submit button is clicked
            userEvent.click(component.getByText(/submit/i));
        });

        // then:
        // - the login method has been invoked
        expect(mockAuth.login).toHaveBeenCalledTimes(1);

        // - the navigation fails, and the error component is displayed
        await screen.findByTestId('error');

        // - the error is displayed on the screen
        expect(screen.getByTestId('error')).toContainHTML("Request failed with status code 400");
    });

    it('should display an error when credentials of a blocked user are specified', () => {

    });
});