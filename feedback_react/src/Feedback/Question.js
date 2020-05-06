import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from '../Header';
import {Growl} from 'primereact/growl';

class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionList: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8081/question").then((res) => {
            this.setState({
                questionList: res.data
            });
        }).catch((error) => {
            this.growl.show({closable:true, sticky: true, severity: 'error', summary: 'Question status', detail: 'Questions fetching failed'});
        });

    }
    render() {
        const { questionList = [] } = this.state;
        return (
            <>
                <Growl ref={(el) => this.growl = el} style={{'marginTop':'4%'}}/>
                <Header />
                <br></br>
               
                <div className="container">
                <div className="clear-10"></div>
                    <div className="card">
                        <div className="card-header card-header-custom-1">
                            <span className="card-title-1">FEEDBACK QUESTIONS </span>
                            <div className="div-card-icons">
                                <i className="fa fa-dot-circle-o card-icons icon-dots" aria-hidden="true"></i>
                                <i className="fa fa-refresh card-icons icon-refresh" aria-hidden="true"></i>
                                <i className="fa fa-minus-circle card-icons icon-minus" aria-hidden="true"></i>
                                <i className="fa fa-times-circle-o card-icons icon-times" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="card-body card-body-custom ">
                        <div className="w-30"><Link to={"/addquestion"} className="btn btn-primary btn-color float-right">+ Add Question</Link></div>
                        <br></br>
                        <div className="card-body">
                            <table className="table table-bordered" >
                                <thead>
                                    <tr className="row">
                                        <th className="col">Questions</th>
                                        <th className="col">Answers</th>
                                        <th className="col">FeedbackType</th>
                                        <th className="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questionList.length ?
                                        questionList.map(questionList => (
                                            <tr className="row" key={questionList.questionId}>
                                                <td className="col">{questionList.questionName}</td>
                                                <td className="col">{questionList.answers.length}</td>
                                                <td className="col">{questionList.feedbackType.feedbackType}</td>
                                                <td className="col">
                                                
                                                    <Link className="btn btn-primary btn-color"
                                                    to={{
                                                        pathname: "/editquestion",
                                                        questionId: questionList.questionId
                                                    }} ><i className="fa fa-pencil-square-o"></i>&nbsp;EDIT</Link></td>

                                            </tr>)) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Question;
