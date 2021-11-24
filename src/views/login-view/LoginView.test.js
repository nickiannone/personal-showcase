import React from 'react';
import { useAuth } from '../../services/useAuth';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginView from './LoginView';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router';
import { findByTestId, waitFor } from '@testing-library/dom';

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

const MockComponent = (props) => {
    return (
        <div data-testid="wrapper">
            <span data-testid={props?.testId}>{props?.pageText}</span>
        </div>
    );
};

const renderLoginViewComponentWithContext = () => {
    return render(
        <MemoryRouter initialEntries={["/"]}>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/profile/:profileId" element={<MockLandingComponent />} />
                <Route path="/register" element={<MockComponent testId='register-page' pageText='Register Page' />} />
                <Route path="/forgot-password" element={<MockComponent testId='forgot-password-page' pageText='Forgot Password Page' />} />
                <Route path="*" element={<MockComponent testId='error' pageText='Route not found!' />} />
            </Routes>
        </MemoryRouter>
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
        const component = renderLoginViewComponentWithContext();

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
        const component = renderLoginViewComponentWithContext();

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

    it('should display an error when credentials of a blocked user are specified', async () => {
        // given:
        // - a username and password
        const EMAIL = "blocked@example.com";
        const PASS = "DUMMY";

        // - logging in as the given user and password results in a blocked message
        mockLoginFailure({
            message: "This user is blocked!"
        });

        // when:
        // - the LoginView is rendered
        const component = renderLoginViewComponentWithContext();

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
        expect(screen.getByTestId('error')).toContainHTML("This user is blocked!");
    });

    it('should clear the form when the Reset button is clicked', async () => {
        // given:
        // - the form is rendered
        const EMAIL = "test@example.com";
        const PASS = "DUMMY";

        const component = renderLoginViewComponentWithContext();

        // - the form is filled
        act(() => {
            // - The email is entered
            userEvent.type(component.getByLabelText(/email address/i), EMAIL);
        });
        act(() => {
            // - The password is entered
            userEvent.type(component.getByLabelText(/password/i), PASS);
        });

        // when:
        // - the reset button is clicked
        act(() => {
            userEvent.click(component.getByText(/reset/i));
        });

        // then:
        // - the form values are empty
        expect(component.getByLabelText(/email address/i)).toHaveValue("");
        expect(component.getByLabelText(/password/i)).toHaveValue("");
    });

    it('should navigate to the Register page when Register is clicked', async () => {
        // given:
        // - the form is rendered
        const component = renderLoginViewComponentWithContext();

        // when:
        // - the register button is clicked
        act(() => {
            userEvent.click(component.getByText(/register/i));
        });

        // then:
        // - the user is navigated to the Register page
        await screen.findByTestId('register-page');
        await waitFor(() => expect(component.getByTestId('register-page')).toContainHTML("Register Page"));
    });

    it('should navigate to the Forgot Password page when Forgot Password is clicked', async () => {
        // given:
        // - the form is rendered
        const component = renderLoginViewComponentWithContext();

        // when:
        // - the register button is clicked
        act(() => {
            userEvent.click(component.getByText(/forgot password/i));
        });

        // then:
        // - the user is navigated to the Register page
        await screen.findByTestId('forgot-password-page');
        await waitFor(() => expect(component.getByTestId('forgot-password-page')).toContainHTML("Forgot Password Page"));
    });
});