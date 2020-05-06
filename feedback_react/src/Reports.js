import React, { Component } from 'react';
import axios from 'axios';
import './Reports.css';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Growl} from 'primereact/growl';
import Header from './Header';

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reportsList: [],
            loading: false
        };
        this.sendEmail = this.sendEmail.bind(this);
        this.downloadExcel = this.downloadExcel.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            axios.get("http://localhost:8080/getEvents").then((res) => {
                this.setState({
                    reportsList: res.data,
                    loading: false
                });
                this.growl.show({life: 5000, severity: 'success', summary: 'Get All Reports', detail: 'Event reports obtained successfully'});
            }).catch(() => {
                this.setState({loading: false});
                this.growl.show({closable:true, sticky: true, severity: 'error', summary: 'Get All Reports', detail: 'Get all reports failed'});
            });
        });
    }

    sendEmail() {
        const emailVal = document.getElementById("email").value;
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailVal.match(mailformat)) {
            this.setState({ loading: true }, () => {
                axios.get("http://localhost:8080/sendEmail?email=" + emailVal+ "&type=report").then((res) => {
                    this.setState({loading: false});
                    this.growl.show({life: 5000, severity: 'success', summary: 'Mail status', detail: 'Mail sent successfully'});
                }).catch((error) => {
                    this.setState({loading: false});
                    this.growl.show({closable:true, sticky: true, severity: 'error', summary: 'Mail status', detail: 'Mailing data failed'});
                });
            });
        } else {
            this.growl.show({closable:true, sticky: true, severity: 'error', summary: 'Invalid Mail', detail: 'Data cannot be sent'});
        }
    }

    downloadExcel(){
        window.open('http://localhost:8080/downloadExcel?type=report', 'res');
        this.growl.show({life: 5000, severity: 'success', summary: 'Download status', detail: 'Excel sheet downloaded successfully'});
    }

    render() {
        const { reportsList = [] } = this.state;
        return (
            <>
            {this.state.loading ? 
            <div className="spinner">
                <ProgressSpinner style={{width: '70px', height: '70px'}} strokeWidth="5" fill="#EEEEEE" animationDuration="1s"/>
            </div>
             : <React.Fragment>
                <Growl ref={(el) => this.growl = el} style={{'marginTop':'4%'}}/>
                <Header/>
                <main role="main" className="mainContent">
                    <div className="clear-10"></div>
                    <div className="card">
                        <div className="card-header card-header-custom-1">
                            <span className="card-title-1">ACTIONS </span>
                            <div className="div-card-icons">
                                <i className="fa fa-dot-circle-o card-icons icon-dots" aria-hidden="true"></i>
                                <i className="fa fa-refresh card-icons icon-refresh" aria-hidden="true"></i>
                                <i className="fa fa-minus-circle card-icons icon-minus" aria-hidden="true"></i>
                                <i className="fa fa-times-circle-o card-icons icon-times" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="card-body card-body-custom ">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="section-1">
                                        <div className="card">
                                            <div className="row no-gutters">
                                                <div className="section-header">
                                                    <i className="fa fa-file-excel-o icon icon-section" aria-hidden="true"></i>
                                                </div>
                                                <div className="col section-body">
                                                    <div className="card-block px-2">
                                                        <b className="card-title" style={{ 'fontSize': '1.3rem' }}>Email Report</b>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-3"><span className="card-text" style={{ 'marginLeft': '7px' }}>Employee ID</span></div>
                                                        <div className="col-md-4"><input id="email" type="text" name="EmailID" className="form-control" placeholder="Enter Email" /></div>
                                                        <div className="col-md-3"><input type="button" name="btnSendMail" className="btn btn-primary btn-color" value="Send Email" onClick={this.sendEmail} /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="section-2">
                                        <div className="card">
                                            <div className="row no-gutters">
                                                <div className="col section-body-2">
                                                    <div className="card-block px-2">
                                                        <b className="card-title" style={{ 'fontSize': '1.3rem', 'float': 'right' }}>Future Implementations</b>
                                                        <p className="card-text" style={{ 'float': 'right' }}>This placeholder is used for adding any other actions in future</p>
                                                    </div>
                                                </div>
                                                <div className="section-header-2">
                                                    <div>
                                                        <i className="fa fa-lightbulb-o icon-section-2" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clear-10"></div>
                    <div className="card">
                        <div className="card-header card-header-custom-1">
                            <span className="card-title-1">EVENTS REPORT</span>
                            <div className="div-card-icons">
                                <i className="fa fa-dot-circle-o card-icons icon-dots" aria-hidden="true"></i>
                                <i className="fa fa-refresh card-icons icon-refresh" aria-hidden="true"></i>
                                <i className="fa fa-minus-circle card-icons icon-minus" aria-hidden="true"></i>
                                <i className="fa fa-times-circle-o card-icons icon-times" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="card-body card-body-custom">
                            <div className="button-group" style={{ 'float': 'right' }}>
                                {/* <button className="btn btn-danger"><i className="fa fa-times"></i> CLEAR FILTERS</button> */}
                                <button className="btn btn-primary btn-color" onClick={this.downloadExcel}><i className="fa fa-file-excel-o"></i> DOWNLOAD EXCEL</button>
                            </div>
                            <br />
                            <br />
                            <br />
                            <div className="table-responsive" style={{ 'height':'350px'}}>

                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Event ID</th>
                                            <th scope="col">Base Location</th>
                                            <th scope="col">Beneficiary Name</th>
                                            <th scope="col">Council Name</th>

                                            <th scope="col">Event Name</th>
                                            <th scope="col">Event Description</th>
                                            <th scope="col">Event Date</th>
                                            <th scope="col">Employee ID</th>

                                            <th scope="col">Employee Name</th>
                                            <th scope="col">Volunteer Hours</th>
                                            <th scope="col">Travel Hours</th>
                                            <th scope="col">Lives Impacted</th>

                                            <th scope="col">Business Unit</th>
                                            <th scope="col">Event Status</th>
                                            <th scope="col">IIEP Category</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            reportsList.length ?
                                                reportsList.map(
                                                    eachObj => (
                                                        <tr key={eachObj.id}>
                                                            <td>{eachObj.event_id}</td>
                                                            <td>{eachObj.base_location}</td>
                                                            <td>{eachObj.beneficiary_name}</td>
                                                            <td>{eachObj.council_name}</td>
                                                            <td>{eachObj.event_name}</td>
                                                            <td>{eachObj.event_description}</td>
                                                            <td>{eachObj.event_date}</td>
                                                            <td>{eachObj.employee_id}</td>
                                                            <td>{eachObj.employee_name}</td>
                                                            <td>{eachObj.volunteer_hours}</td>
                                                            <td>{eachObj.travel_hours}</td>
                                                            <td>{eachObj.lives_impacted}</td>
                                                            <td>{eachObj.business_unit}</td>
                                                            <td>{eachObj.event_status}</td>
                                                            <td>{eachObj.iiep_category}</td>
                                                        </tr>)
                                                )
                                                : null
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </React.Fragment>
            
            } 
                
            </>
        );
    }
}
export default Reports;