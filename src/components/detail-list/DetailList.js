import React from 'react';
import Detail from '../detail/Detail';

// const details = [
//     {
//         type: 'workplace',
//         name: 'EmOpti LLC',
//         start_date: '06-2021',
//         end_date: '09-2021',
//         location: 'Brookfield, WI',
//         description: "Test",
//         skills: [
//             'Spring Boot',
//             'Angular',
//             'Testing',
//             'Healthcare'
//         ]
//     }
// ];

class DetailList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props?.details || []
        };
    }

    handleAddDetail(detail) {
        this.setState((currentState) => {
            return {
                details: [...currentState.details, detail]
            };
        });
    }

    handleRemoveDetail(index) {
        this.setState((currentState) => {
            return {
                details: currentState.details.filter((detail, detailIndex) => {
                    return detailIndex !== index;
                })
            };
        });
    }

    render() {

        return (
            <div className="ui unstackable items">
                {this.state.details.map((detail, index) => (
                    <Detail key={index} detail={detail} />
                ))}
            </div>
        );
    }
}

export default DetailList;