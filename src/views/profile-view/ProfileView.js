import React from 'react';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: props.profile || {},
            currentTab: props.currentTab || 'Overview'
        };
    }

    render() {
        return (
            <div className="profile-view">
                <div className="profile-toolbar">
                    <div className="profile-display-header">
                        <h1 data-testid="display-name">{this.state.profile.display_name}</h1>
                        <p data-testid="subtitle">{this.state.profile.subtitle}</p>
                    </div>
                    <div className="profile-tab-wrapper">
                        {/* TODO Tabs? */}
                        <p data-testid="overview">{this.state.profile.overview}</p>
                    </div>
                </div>
                <footer>
                    <h1>(C) Nick Iannone, 2021. All rights reserved.</h1>
                </footer>
            </div>
        );
    }
}

export default ProfileView;