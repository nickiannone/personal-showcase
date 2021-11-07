import React from 'react';

// const detail = {
//     type: 'workplace',
//     name: 'EmOpti LLC',
//     start_date: '06-2021',
//     end_date: '09-2021',
//     location: 'Brookfield, WI',
//     description: "Developed and tested Spring Boot/Angular applications for in-hospital clinical workflow and telehealth solution",
//     skills: [
//         'Spring Boot',
//         'Angular',
//         'Testing',
//         'Healthcare'
//     ]
// };

class Detail extends React.Component {
    render() {
        // Defensive coding - a smell?
        if (!this.props.item) {
            return (
                <div className="detail">
                    <i>Loading...</i>
                </div>
            );
        }

        const item = this.props.item;

        const skillsEntries = item.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
        ));

        return (
            <div className="detail">
                <h1>{item.name}</h1>
                <p>Start Date: {item.start_date}</p>
                <p>End Date: {item.end_date}</p>
                <p>Location: {item.location}</p>
                <p>Description: {item.description}</p>
                <p>Skills:
                    <ul>
                        {skillsEntries}
                    </ul>
                </p>
            </div>
        );
    }
}

export default Detail;