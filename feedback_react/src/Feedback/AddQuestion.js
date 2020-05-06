import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { Growl } from 'primereact/growl';
import Header from '../Header';

class AddQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackTypeList: [],
            selectedType: 0,
            questionName: "",
            pageRedirect: false
        };
        this.questionRef = React.createRef();
        this.onSubmit = this.onSubmit.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    }

    componentDidMount() {
        this.getFeedbackTypes();
    }

    getFeedbackTypes() {
        axios.get("http://localhost:8081/feedbackType").then((res) => {
            this.setState({
                feedbackTypeList: res.data
            });
        }).catch((error) => {
            this.growl.show({ closable: true, sticky: true, severity: 'error', summary: 'Feedback status', detail: 'Feedback types fetching failed' });
        });
    }

    handleRadioButtonChange = (e) => {
        console.log(e.target.value)
        this.setState({
            selectedType: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const question = {
            questionName: this.questionRef.current.value,
            feedbackId: this.state.selectedType
        }
        console.log(this.questionRef.current.value);
        axios.post("http://localhost:8081/question", question).then((res) => {
            this.setState({
                pageRedirect: true
            })
        });
    }

    render() {
        const { feedbackTypeList = [] } = this.state;
        if (this.state.pageRedirect) {
            return <Redirect to="/questioninfo" />
        }
        return (
            <>
                <Growl ref={(el) => this.growl = el} style={{ 'marginTop': '4%' }} />
                <Header />
                <br></br>
                <div className="container">
                    <div className="card">
                        <div className="card-header card-header-custom-1">
                            <span className="card-title-1">ADD QUESTIONS </span>
                        </div>
                        <div className="card-body card-body-custom ">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col">Feedback Type</div>
                                    {feedbackTypeList ? feedbackTypeList.map(feedbackTypeList => (
                                        <div className="col" key={feedbackTypeList.feedbackId}>
                                            <label>
                                                <input type="radio" value={feedbackTypeList.feedbackId}
                                                    checked={this.state.selectedType == feedbackTypeList.feedbackId}
                                                    onChange={this.handleRadioButtonChange} />
                                                {feedbackTypeList.feedbackType}

                                            </label>
                                        </div>
                                    ))
                                        : null
                                    }
                                </div>
                                <div className="clear-10"></div>
                                <div className="row">
                                    <div className="col-3">
                                    </div>
                                    <div className="col-3">
                                    </div>
                                    <div className="col-3">
                                    </div>
                                </div>
                                <div className="clear-10"></div>
                                <div className="row">
                                    <div className="col-3"> Question</div>
                                    <div>
                                        <input type="textarea" class="form-control" row="10" col="10" placeholder="Description(required)" ref={this.questionRef} style={{ width: "500px", height: "120px" }} />
                                    </div>
                                </div>
                                <div className="clear-10"></div>
                                <div className="row">
                                    <div className="col-3"></div>
                                    <div className="col-6" style={{ marginLeft: "-29px" }}>
                                        <input type="submit" value="SAVE" className="btn btn-primary w-5" style={{margin:"10px"}} />
                                        <Link to={"/questioninfo"} className="btn btn-secondary w-5" style={{ margin: "10px" }} >CANCEL</Link>
                                        <input type="submit" value="DELETE" className="btn btn-danger w-5" style={{ margin: "10px" }} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>)
    }
}

export default AddQuestion;