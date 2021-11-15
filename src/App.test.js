import { render } from '@testing-library/react';
import { BehaviorSubject } from 'rxjs';
import { authService } from './services/authService';
import App from './App';

jest.mock('./services/authService');

describe('App unit tests', () => {

    // Reinitializes the authService mock with the given principal.
    // Principal can be null or { jwt: string, user: {} }
    // TODO Make into a test helper? This is pretty common stuff for our tests!
    const reinitAuthMock = (userPrincipal) => {
        const currentUserSubject = new BehaviorSubject(JSON.stringify(userPrincipal));
        return {
            authService: {
                login: jest.fn(),
                logout: jest.fn(),
                register: jest.fn(),
                currentUser: currentUserSubject.asObservable(),
                get currentUserValue() {
                    return JSON.parse(currentUserSubject.value);
                },
                get currentUserId() {
                    return JSON.parse(currentUserSubject.value)?.user?.id;
                }
            }
        }
    };

    beforeEach(() => {
        // TODO Swap this out if the model changes - how to avoid brittleness?
        jest.setMock('./services/authService', reinitAuthMock({
            jwt: "test",
            user: {
                id: 1,
                username: "test",
                email: "test@example.com",
                profile: {
                    id: 1,
                    display_name: "Nicholas Iannone",
                    subtitle: "Software Engineer",
                    overview: "Test Overview",
                    email_address: "test@example.com",
                    phone: "123-456-7890",
                    user: 1
                }
            }
        }));
    });

    it('should default to the login page if not authenticated', () => {
        // given
        // - the user is not logged in
        //      > initialize authService to default values
        jest.setMock('./services/authService', reinitAuthMock(null));

        // - the main page of the app is requested (/)

        
        // when
        // - the App component is initialized
        render(<App />);

        // then
        // - we should arrive at the /login page
        // - we should see the login prompt
    });

    it('should route to the current user\'s profile page if authenticated', () => {

    });

    it('should route to the edit page if authenticated and specified', () => {

    });

    it('should route to the signup page if specified', () => {

    });

    it('should route to the forgot password page if specified', () => {

    });

    it('should route to the 404 page if an unknown route is specified', () => {

    });
});