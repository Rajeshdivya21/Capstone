import React, { Component } from 'react';
import axios from 'axios';
import './Reports.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import {InputText} from 'primereact/inputtext';
import { Growl } from 'primereact/growl';
import Header from './Header';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsList: [],
            loading: false
        };
        this.downloadExcel = this.downloadExcel.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            axios.get("http://localhost:8080/getEventsList").then((res) => {
                this.setState({
                    eventsList: res.data,
                    loading: false
                });
                this.growl.show({ life: 5000, severity: 'success', summary: 'Get All Events', detail: 'Events obtained successfully' });
            }).catch(() => {
                this.setState({ loading: false });
                this.growl.show({ closable: true, sticky: true, severity: 'error', summary: 'Get All Events', detail: 'Get all events failed' });
            });
        });
    }

    sendEmail(event){
        if(event.key === 'Enter'){
            const emailVal = document.getElementById("email").value;
            const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailVal.match(mailformat)) {
                this.setState({ loading: true }, () => {
                    axios.get("http://localhost:8080/sendEmail?email=" + emailVal + "&type=event").then((res) => {
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
    }

    downloadExcel(){
        window.open('http://localhost:8080/downloadExcel?type=event', 'res');
        this.growl.show({life: 5000, severity: 'success', summary: 'Download status', detail: 'Excel sheet downloaded successfully'});
    }

    render() {
        const { eventsList = [] } = this.state;
        return (
            <>
                {this.state.loading ?
                    <div className="spinner">
                        <ProgressSpinner style={{ width: '70px', height: '70px' }} strokeWidth="5" fill="#EEEEEE" animationDuration="1s" />
                    </div>
                    :
                    <React.Fragment>
                        <Growl ref={(el) => this.growl = el} style={{ 'marginTop': '4%' }} />
                        <Header />
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
                                                            <i className="fa fa-envelope icon icon-section" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="col section-body">
                                                            <div className="card-block px-2">
                                                                <b className="card-title" style={{ 'fontSize': '1.3rem' }}>Email Reminder!</b>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-7" style={{ 'marginLeft': '7px' }}><span className="card-text">Sit back and relax while the app send emailList!</span></div>
                                                                <div className="col-md-4"><InputText id="email" placeholder="Send Email" tooltip="Type Email Id and press ENTER" tooltipOptions={{event: 'focus',position:'top'}} onKeyUp={this.sendEmail}/></div>
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
                                    <span className="card-title-1">EVENTS</span>
                                    <div className="div-card-icons">

                                        <i className="fa fa-dot-circle-o card-icons icon-dots" aria-hidden="true"></i>
                                        <i className="fa fa-refresh card-icons icon-refresh" aria-hidden="true"></i>
                                        <i className="fa fa-minus-circle card-icons icon-minus" aria-hidden="true"></i>
                                        <i className="fa fa-times-circle-o card-icons icon-times" aria-hidden="true"></i>

                                    </div>
                                </div>
                                <div className="card-body card-body-custom ">
                                    <div className="button-group" style={{ 'float': 'right' }}>
                                        {/* <button className="btn btn-danger"><i className="fa fa-times"></i> CLEAR FILTERS</button> */}
                                        <button className="btn btn-primary btn-color" onClick={this.downloadExcel}><i className="fa fa-file-excel-o"></i> DOWNLOAD EXCEL</button>
                                    </div>
                                    <br />
                                    <br />
                                    <br />
                                    <div className="table-responsive" style={{ 'height': '350px' }}>

                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Event ID</th>
                                                    <th scope="col">Month</th>
                                                    <th scope="col">Base Location</th>
                                                    <th scope="col">Council Name</th>
                                                    <th scope="col">Beneficiary Name</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {eventsList.length ?
                                                    eventsList.map(eachObj => (
                                                        <React.Fragment key={'f' + eachObj.id}>
                                                            <tr key={eachObj.id}>
                                                                <td><button className="btn btn-primary btn-color"><i className="fa fa-eye"></i> VIEW</button></td>
                                                                <td>{eachObj.event_id}</td>
                                                                <td>{eachObj.month}</td>
                                                                <td>{eachObj.base_location}</td>
                                                                <td>{eachObj.council_name}</td>
                                                                <td>{eachObj.beneficiary_name}</td>
                                                            </tr>
                                                            <tr key={'t' + eachObj.id}>
                                                                <td></td>
                                                                <td colSpan="5">
                                                                    <table className="table table-bordered">
                                                                        <tbody>
                                                                            <tr>
                                                                                <th scope="col">Event Name</th>
                                                                                <td>{eachObj.event_name}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Event Date</th>
                                                                                <td>{eachObj.event_date}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Business Unit</th>
                                                                                <td>{eachObj.business_unit}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Event Status</th>
                                                                                <td>{eachObj.event_status}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Venue Address</th>
                                                                                <td>{eachObj.venue_address}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Total Volunteers</th>
                                                                                <td>{eachObj.total_volunteers}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Total Volunteer Hours</th>
                                                                                <td>{eachObj.total_volunteer_hours}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">Total Travel Hours</th>
                                                                                <td>{eachObj.travel_hours}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    )
                                                    )
                                                    : null}



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

export default Events;