import React from 'react';
import Detail from '../detail/Detail';

const details = [
    {
        type: 'workplace',
        name: 'EmOpti LLC',
        start_date: '06-2021',
        end_date: '09-2021',
        location: 'Brookfield, WI',
        description: "Test",
        skills: [
            'Spring Boot',
            'Angular',
            'Testing',
            'Healthcare'
        ]
    }
];

class DetailList extends React.Component {
    render() {
        return (
            <div className="ui unstackable items">
                {details.map((detail, index) => (
                    <Detail key={index} data={detail} />
                ))}
            </div>
        );
    }
}

export default DetailList;