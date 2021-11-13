import React from 'react';

import { render, fireEvent, screen } from '@testing-library/react';
import LoginView from './LoginView';

describe('LoginView component', () => {

    it('should log in when a correct username/password are specified', async () => {
        /*
        const EMAIL = 'user@example.com';
        const PASS = 'pass';

        render(<LoginView />);
    
        const emailInput = screen.getByLabelText(/email address/i);
        user.type(emailInput, EMAIL);
    
        const passwordInput = screen.getByLabelText(/password/i);
        user.type(passwordInput, PASS);
    
        const submitButton = screen.getByText(/submit/i);
    
        fireEvent.click(submitButton);
        */

    });

    it('should display an error when invalid credentials are specified', () => {

    });
});