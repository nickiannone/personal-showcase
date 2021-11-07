import { shallow, render } from 'enzyme';
import React from 'react';
import DetailList from './DetailList';

it('renders without crashing', () => {
    shallow(<DetailList />);
});

it('should display a list of details', () => {
    const items = [
        {
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
        }
    ];

    const wrapper = render(<DetailList items={items} />);

    // Wrapper should have one and only one element
});
