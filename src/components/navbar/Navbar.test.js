import React from 'react';
import { render, shallow } from 'enzyme';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

it('should render without crashing', () => {
    shallow(<Navbar />);
});

it('should display a Navbar component with multiple items', () => {
    const items = [
        {
            id: 1,
            label: 'Link A',
            path: "/path-a"
        },
        {
            id: 2,
            label: 'Link B',
            path: "/path-b"
        }
    ];

    const wrapper = render(<BrowserRouter><Navbar items={items} /></BrowserRouter>);

    console.log("Rendered Navbar: " + wrapper.html());

    expect(wrapper.html().includes("Link A"));
    expect(wrapper.html().includes("Link B"));
});

it('should dispatch a navigation event to the parent when a nav item is clicked', () => {

});