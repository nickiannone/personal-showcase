import React, { useEffect } from 'react';
import { profileService } from '../../services/profileService';
import { useParams } from 'react-router';
import { useState } from 'react';
import { useAuth } from '../../services/useAuth';
import { Link } from 'react-router-dom';
import { Tab, Typography, Container, Toolbar, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

function OverviewTab(props) {
    const profile = props.profile;

    return (
        <div className="overview-wrapper">
            <p data-testid="overview">{profile?.overview}</p>
        </div>
    );
}

function EmploymentTab(props) {
    const profile = props.profile;

    return (
        <div className="employments-wrapper">
            {
                profile?.employments?.map((job) => (
                    <div key={job?.id} className="employment">
                        TODO - A Job!
                    </div>
                ))
            }
        </div>
    );
}

function EducationTab(props) {
    const profile = props.profile;

    return (
        <div className="educations-wrapper">
            {
                profile?.educations?.map((education) => (
                    <div key={education?.id} className="education">
                        TODO - An Education!
                    </div>
                ))
            }
        </div>
    );
}

function ProjectsTab(props) {
    const profile = props.profile;

    return (
        <div className="projects-wrapper">
            {
                profile?.projects?.map((project) => (
                    <div key={project?.id} className="project">
                        TODO - A Project!
                    </div>
                ))
            }
        </div>
    );
}

function CertsTab(props) {
    const profile = props.profile;

    return (
        <div className="certifications-wrapper">
            {
                profile?.certifications?.map((cert) => (
                    <div key={cert?.id} className="certification">
                        TODO - A Certification!
                    </div>
                ))
            }
        </div>
    );
}

function HobbiesTab(props) {
    const profile = props.profile;

    return (
        <div className="hobbies-wrapper">
            {
                profile?.hobbies?.map((cert) => (
                    <div key={cert?.id} className="certification">
                        TODO - A Certification!
                    </div>
                ))
            }
        </div>
    );
}

function LinksTab(props) {
    const profile = props.profile;

    return (
        <div className="links-wrapper">
            {
                profile?.links?.map((link) => (
                    <div key={link?.id} className="link">
                        TODO - A Link!
                    </div>
                ))
            }
        </div>
    );
}

function ContactsTab(props) {
    const profile = props.profile;

    return (
        <div className="contacts-wrapper">
            {
                profile?.contacts?.map((contact) => (
                    <div key={contact?.id} className="contact">
                        TODO - A Contact!
                    </div>
                ))
            }
        </div>
    );
}

function ProfileView(props) {
	const { profileId } = useParams();
    const auth = useAuth();

    const [profile, setProfile] = useState(null);
    const [selectedTab, setSelectedTab] = useState("overview");

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    useEffect(() => {
        let mounted = true;
        if (props.profile) {
            // TODO Get rid of this or fix tests to pass in via mocking the profileService?
            if (mounted) {
                console.log("Passed in profile: " + JSON.stringify(props.profile));
                setProfile(props.profile);
            }
        } else {
            profileService.getProfile(profileId).then(loadedProfile => {
                if (mounted) {
                    console.log("Loaded profile: " + JSON.stringify(loadedProfile));
                    setProfile(loadedProfile);
                }
            });
        }
        return () => mounted = false;
    }, []);


    if (!profile) {
        return <div className="profile-view-wrapper">
            Profile not found!
        </div>;
    }
    
    const profileLinks = profile.links?.map((link) => (
        <Link key={link.id} to={link.path}>{link.display_name}</Link>
    ));

	return (
        <div className="profile-view-wrapper">
            <Container className="profile-header">
                <Toolbar position="fixed">
                    <Typography>
                        <h1 data-testid="display-name">{profile?.display_name}</h1>
                        <h3 data-testid="subtitle">{profile?.subtitle}</h3>
                    </Typography>
                    <Toolbar>
                        <div data-testid="email-address">{profile?.email_address}</div>
                        <div data-testid="phone">{profile?.phone}</div>
                        <div data-testid="links">{profileLinks}</div>
                    </Toolbar>
                </Toolbar>
            </Container>
            <Container>
                <Box>
                    <TabContext value={selectedTab}>
                        <Box>
                            <TabList onChange={handleTabChange}>
                                <Tab label="Overview" value="overview" />
                                <Tab label="Employment" value="employment" />
                                <Tab label="Education" value="education" />
                                <Tab label="Projects" value="projects" />
                                <Tab label="Certifications" value="certifications" />
                                <Tab label="Hobbies" value="hobbies" />
                                <Tab label="Links" value="links" />
                                <Tab label="Contact" value="contact" />
                            </TabList>
                        </Box>
                        <TabPanel value="overview">
                            <OverviewTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="employment">
                            <EmploymentTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="education">
                            <EducationTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="projects">
                            <ProjectsTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="certifications">
                            <CertsTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="hobbies">
                            <HobbiesTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="links">
                            <LinksTab profile={profile} />
                        </TabPanel>
                        <TabPanel value="contact">
                            <ContactsTab profile={profile} />
                        </TabPanel>
                    </TabContext>
                </Box>
            </Container>
        </div>
    );
};

export default ProfileView;