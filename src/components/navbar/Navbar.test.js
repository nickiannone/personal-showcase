import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

it('should render without crashing', () => {
    render(<Navbar />, {wrapper: BrowserRouter});
});
