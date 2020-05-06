import React, { Component } from 'react';
import './Reports.css';
import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top nav-bar-custom">
                    <a className="navbar-brand"><i className="fa fa-cubes nav-logo" aria-hidden="true"></i><b>Outreach </b><span className="label-FMS">FMS</span></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto navbar-custom">
                            <li className="nav-item active">
                                <div className="newS"> <i className="fa fa-th-large icon-nav" aria-hidden="true"></i> <a className="nav-link nav-link-custom" href="#">Dashboard</a></div>
                            </li>
                            <li className="nav-item active">
                                <div className="newS"> <i className="fa fa-rocket icon-nav" aria-hidden="true"></i><Link to={"/events"} className="nav-link nav-link-custom">Events</Link></div>
                            </li>
                            <li className="nav-item active">
                                <div className="newS"> <i className="fa fa-tachometer icon-nav" aria-hidden="true"></i><Link to={"/reports"} className="nav-link nav-link-custom">Reports</Link></div>
                            </li>
                             <li className="nav-item active">
                                <div className="newS"> <i className="fa fa-cog icon-nav" aria-hidden="true"></i><Link to={"/questioninfo"} className="nav-link nav-link-custom">Configuration</Link></div>
                            </li>
                        </ul>
                        <form className="form-inline mt-4 mt-md-2">
                            <i className="fa fa-user-circle-o icon-nav-user" aria-hidden="true"></i> <span className="label-user">Murthy K</span>
                        </form>
                    </div>
                </nav>
        );
    }
}
export default Header;