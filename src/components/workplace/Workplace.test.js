import { render } from '@testing-library/react';
import React from 'react';
import Workplace from './Workplace';

it('should render without crashing', () => {
    render(<Workplace />);
});

it('should be initialized as view-only', () => {

});

it('should not show the edit icon if the workplace doesn\'t belong to the current user', () => {

});

it('should be editable if logged in as the current user', () => {

});

it('should be initialized as editable if able and specified', () => {

});

it('should be able to change the name of the workplace', () => {

});

it('should be able to change the start and end date of the workplace', () => {

});

it('should be able to delete the workplace', () => {

});


it('should save and switch to display view with valid values', () => {

});

it('should not save, show error message with invalid values', () => {

});



