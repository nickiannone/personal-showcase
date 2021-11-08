import React from 'react';
import Detail from '../detail/Detail';

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

    handleRemoveDetail(detailToRemove) {
        this.setState((currentState) => {
            return {
                details: currentState.details.filter((detail) => {
                    return detailToRemove !== detail;
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