import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [
                {
                    id: 1,
                    label: "Overview",
                    path: "/profile/overview"
                },
                {
                    id: 2,
                    label: "Workplaces",
                    path: "/profile/workplaces"
                },
                {
                    id: 3,
                    label: "Education",
                    path: "/profile/education"
                },
                {
                    id: 4,
                    label: "Skills",
                    path: "/profile/skills"
                },
                {
                    id: 5,
                    label: "Projects",
                    path: "/profile/projects"
                },
                {
                    id: 6,
                    label: "Hobbies",
                    path: "/profile/hobbies"
                },
                {
                    id: 7,
                    label: "Contact",
                    path: "/profile/contact"
                },
                {
                    id: 8,
                    label: "Logout",
                    path: "/logout"
                }
            ]
        };
    }

    render() {
        return (
            <nav className="navbar-wrapper">
                {
                    this.state.links.map((link) => (
                        <div className="nav-link" key={link.id}>
                            <Link to={link.path}>{link.label}</Link>
                        </div>
                    ))
                }
            </nav>
        );
    }
}

export default Navbar;