import { render, screen } from '@testing-library/react';
import React from 'react';

import Detail from './Detail.js';

it('renders without crashing', () => {
    render(<Detail />);
});

it('renders a Workplace Detail component', () => {
    const detail = {
        type: 'workplace',
        id: 1,
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

    render(<Detail detail={detail}/>);

    expect(screen.findByText("EmOpti LLC")).toBeTruthy();
    expect(screen.findByText("06-2021")).toBeTruthy();
    expect(screen.findByText("09-2021")).toBeTruthy();
    expect(screen.findByText("Brookfield, WI")).toBeTruthy();
    expect(screen.findByText("Test")).toBeTruthy();
    expect(screen.findByText("Spring Boot")).toBeTruthy();
    expect(screen.findByText("Angular")).toBeTruthy();
    expect(screen.findByText("Testing")).toBeTruthy();
    expect(screen.findByText("Healthcare")).toBeTruthy();
});

