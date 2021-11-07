import { shallow, render } from 'enzyme';
import React from 'react';
import DetailList from './DetailList';

it('renders without crashing', () => {
    shallow(<DetailList />);
});

it('should display a list of details', () => {
    const details = [
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
        },
        {
            type: 'workplace',
            name: 'Northwestern Mutual',
            start_date: '04-2019',
            end_date: '06-2021',
            location: 'Milwaukee, WI',
            description: 'Test 2',
            skills: [
                'Spring Boot',
                'Angular',
                'Java',
                'Microservices',
                'Python',
                'AWS',
                'Terraform',
                'Insurance'
            ]
        }
    ];

    const wrapper = render(<DetailList details={details} />);

    console.log("Rendered DetailList: " + wrapper.html());


    // Wrapper should have one and only one element
});
