import React from 'react';

class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            detail: props.detail
        };
    }

    render() {
        const detail = this.state.detail;

        if (detail) {
            return (
                <div className="detail" key={detail.id}>
                    <h1>{detail.name}</h1>
                    <div>Start Date: {detail.start_date}</div>
                    <div>End Date: {detail.end_date}</div>
                    <div>Location: {detail.location}</div>
                    <div>Description: {detail.description}</div>
                    <div>Skills:
                        <ul>
                            {detail.skills?.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </div>
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