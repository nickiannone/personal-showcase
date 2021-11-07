import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import Detail from './Detail.js';

it('renders without crashing', () => {
    shallow(<Detail />);
});

it('renders a Workplace', () => {
    const item = {
        type: 'workplace',
        name: 'EmOpti LLC',
        start_date: '06-2021',
        end_date: '09-2021',
        location: 'Brookfield, WI',
        description: 'Test',
        skills: [
            'Spring Boot',
            'Angular',
            'Testing',
            'Healthcare'
        ]
    };

    const wrapper = shallow(<Detail item={item}/>);

    expect(wrapper.contains("EmOpti LLC")).toBeTruthy();
    expect(wrapper.contains("06-2021")).toBeTruthy();
    expect(wrapper.contains("09-2021")).toBeTruthy();
    expect(wrapper.contains("Brookfield, WI")).toBeTruthy();
    expect(wrapper.contains("Test")).toBeTruthy();
    expect(wrapper.contains("Spring Boot")).toBeTruthy();
    expect(wrapper.contains("Angular")).toBeTruthy();
    expect(wrapper.contains("Testing")).toBeTruthy();
    expect(wrapper.contains("Healthcare")).toBeTruthy();
});

