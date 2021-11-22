import { useAuth } from './useAuth';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';

let mockUser = null;
let mockJWT = null;

let mockLogin = jest.fn();
let mockLogout = jest.fn();
let mockRegister = jest.fn();

jest.mock('./useAuth', () => ({
    useAuth: () => ({
        login: mockLogin,
        logout: mockLogout,
        register: mockRegister,
        get user() { return mockUser; },
        get jwt() { return mockJWT; }
    })
}));

const DummyComponent = () => {
    const auth = useAuth();

    return (
        <div data-testid='wrapper'>
            <span data-testid='user'>{JSON.stringify(auth?.user)}</span>
            <span data-testid='jwt'>{auth?.jwt}</span>
        </div>
    );
};

const DummyLoginComponent = (props) => {
    const auth = useAuth();
    auth.login(props.email, props.password).then(() => {
        console.log("Logged in");
    });

    return (
        <div data-testid='credentials'>
            <span data-testid='user'>{JSON.stringify(auth?.user)}</span>
            <span data-testid='jwt'>{auth?.jwt}</span>
        </div>
    );
};

describe('useAuth hook unit tests', () => {

    it('initializes during first-time load (no token, not logged in)', async () => {
        // given:
        // - useAuth() gives us non-logged-in values
        mockUser = null;
        mockJWT = null;

        // when:
        // - component initializes, reading from hook
        const { getByTestId } = render(<DummyComponent />);

        screen.debug(getByTestId('wrapper'));

        // then:
        // - component provided with empty user and jwt
        expect(getByTestId('user')).toContainHTML("null");
        expect(getByTestId('jwt')).toBeEmptyDOMElement();
    });

    it('initializes from prior load (token exists & is valid)', () => {
        // given:

        // - the user is logged in with a valid user and jwt
        mockUser = {
            id: 1,
            username: "test_user",
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
        mockJWT = "DUMMY";

        // when:
        // - component initializes, reading from hook
        const { getByTestId } = render(<DummyComponent />);

        screen.debug(getByTestId('wrapper'));

        // then:
        // - component provided with non-empty user and jwt
        expect(getByTestId('user')).toContainHTML(JSON.stringify(mockUser));
        expect(getByTestId('jwt')).toContainHTML(mockJWT);
    });

    it('logs in when valid credentials are supplied', async () => {
        // given:
        // - the user is not currently logged in
        mockUser = null;
        mockJWT = null;

        // - we want a new user/JWT in place when we log in (successful login)
        const newUser = {
            id: 2,
            username: "test_user_2",
            email: "test_2@example.com",
            provider: "local",
            confirmed: true,
            blocked: false,
            profile: {
                id: 2,
                display_name: "Test 2",
                subtitle: "",
                overview: "",
                email_address: "test_2@example.com",
                phone: "",
                user: 2
            }
        };
        const newJWT = "DUMMY2";
        mockLogin = mockLogin.mockImplementation(async (email, password) => {
            // Log in as the new user
            mockUser = newUser;
            mockJWT = newJWT;
            return newUser;
        });

        // - we have an email and password
        const mockEmail = "test_2@example.com";
        const mockPassword = "DUMMY2";

        // when:
        // - component logs in using email and password
        const { getByTestId } = render(<DummyLoginComponent email={mockEmail} password={mockPassword} />);

        // then:
        // - component provided with correct new user and jwt
        expect(getByTestId('user')).toContainHTML(JSON.stringify(newUser));
        expect(getByTestId('jwt')).toContainHTML(newJWT);
    });

    it('fails to login when invalid credentials are supplied', () => {
        // given:
        // - the user is not currently logged in
        mockUser = null;
        mockJWT = null;

        // - we want a new user/JWT in place when we log in (successful login)
        const newUser = {
            id: 2,
            username: "test_user_2",
            email: "test_2@example.com",
            provider: "local",
            confirmed: true,
            blocked: false,
            profile: {
                id: 2,
                display_name: "Test 2",
                subtitle: "",
                overview: "",
                email_address: "test_2@example.com",
                phone: "",
                user: 2
            }
        };
        const newJWT = "DUMMY2";
        mockLogin = mockLogin.mockImplementation(async (email, password) => {
            // Don't log in as the new user!
            return Promise.reject("Login failed");
        });

        // - we have an email and password
        const mockEmail = "test_2@example.com";
        const mockPassword = "DUMMY2";

        // when:
        // - component logs in using email and password
        const { getByTestId } = render(<DummyLoginComponent email={mockEmail} password={mockPassword} />);

        // then:
        // - component not provided with user or jwt!
        expect(getByTestId('user')).toContainHTML("null");
        expect(getByTestId('jwt')).toBeEmptyDOMElement();
    });

    it('registers when valid credentials are supplied', () => {
        // TODO Finish me!
    });

    it('fails to register when invalid credentials are supplied', () => {

    });

    it('fails to register with a duplicate username', () => {

    });

    it('clears existing credentials when logging out', () => {

    });

    it('rejects invalid user object from token', () => {

    });

    it('rejects invalid JWT from token', () => {

    });

    it('rejects missing user object from local storage', () => {

    });

    it('rejects missing JWT from local storage', () => {

    });


});