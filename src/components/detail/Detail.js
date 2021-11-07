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
    constructor(props) {
        super(props);

        //console.log(JSON.stringify(props));

        this.state = {
            detail: props.detail
        };
    }

    render() {
        const detail = this.state.detail;

        if (detail) {
            return (
                <div className="detail">
                    <h1>{detail.name}</h1>
                    <p>Start Date: {detail.start_date}</p>
                    <p>End Date: {detail.end_date}</p>
                    <p>Location: {detail.location}</p>
                    <p>Description: {detail.description}</p>
                    <p>Skills:
                        <ul>
                            {detail.skills?.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </p>
                </div>
            );
        } else {
            return (
                <div className="detail">
                    <i>Loading...</i>
                </div>
            );
        }
    }
}

export default Detail;