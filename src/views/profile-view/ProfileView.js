import { Container, Toolbar, Typography } from '@mui/material';
import React from 'react';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileId: props.profileId,
            profile: fetchProfile(props.profileId),
            currentTab: 'Overview'
        };
    }

    fetchProfile(profileId) {
        // TODO API layer!
        return {
            id: 1,
            display_name: "Nicholas Iannone",
            subtitle: "Software Engineer in Glendale, WI",
            overview: "Hello! My name is Nick Iannone! I'm a software engineer living in Glendale, WI, and I specialize in full-stack web application development.\n\n" +
                "This is my personal showcase, which I've designed completely from scratch using React as a frontend and Strapi as a backend.\n\n" + 
                "You can view the source code for this site at <a>https://github.com/nickiannone/personal-showcase</a>! Have fun!",
            email_address: "nickiannone@gmail.com",
            phone: "414-628-2734",
            address: {
                first_line: "6117 N Milwaukee River Pkwy",
                second_line: "",
                city: "Glendale",
                state: "WI",
                zip_code: "53209",
                country: "United States"
            },
            // Subcomponents:
            workplaces: [],
            projects: [],
            hobbies: [],
            educations: [],
            skills: [],
            contact_info: [],
            // ...
        };
    }

    render() {
        return (
            <div className="profileView">
                <Container>
                    <Toolbar>
                        <EditButton />
                        <Typography>
                            <h1>{this.state.profile.display_name}</h1>
                            <p>{this.state.profile.subtitle}</p>
                        </Typography>
                        <SearchBar />
                    </Toolbar>
                    <Toolbar>
                        <Typography><a onClick={() => this.openPage('Overview')}>Overview</a></Typography>
                        <Typography>Education</Typography>
                        <Typography>Hobbies</Typography>
                        <Typography>Projects</Typography>
                        <Typography>Skills</Typography>
                        <Typography>Contact Info</Typography>
                    </Toolbar>
                    <Container>
                        
                    </Container>
                </Container>
                <footer>
                    <h1>(C) Nick Iannone, 2021. All rights reserved.</h1>
                </footer>
            </div>
        );
    }
}

export default ProfileView;