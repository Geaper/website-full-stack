import React from 'react';

const Navigation = () => {

    return (
        <div className="App">
           <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: "#1e1e2d"}}>
                <a className="navbar-brand" href="#">JIBS HELPDESK REPORTING</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    <li className={"nav-item " + (window.location.pathname == '/' ? 'active' : '')}>
                        <a className="nav-link" href="/">Global <span className="sr-only">(current)</span></a>
                    </li>
                    <li className={"nav-item " + (window.location.pathname == '/workers' ? 'active' : '')}>
                        <a className="nav-link" href="/workers">Workers</a>
                    </li>
                    <li className={"nav-item " + (window.location.pathname == '/projects' ? 'active' : '')}>
                        <a className="nav-link" href="/projects">Projects</a>
                    </li>
                    <li className={"nav-item " + (window.location.pathname == '/time' ? 'active' : '')}>
                        <a className="nav-link" href="/time">Time</a>
                    </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Navigation;