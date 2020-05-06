import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Header from '../Header';
import { Growl } from 'primereact/growl';

class EditQuestion extends Component {
    answerinput = React.createRef;
    constructor(props) {
        super(props);

        this.state = {
            feedbackTypeList: [],
            values: [{ value: null }],
            question: {},
            questionId: props.location.questionId,
            isAddAnswer: false,
            values: [],
            pageRedirect: false,
            answerCount: 0,
            feedbackId: 0
        };

        this.answerRef = React.createRef();

        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        this.onDeleteAnswer = this.onDeleteAnswer.bind(this);
        this.onDeleteQuestion = this.onDeleteQuestion.bind(this);
        this.onSubmitAnswers = this.onSubmitAnswers.bind(this);
    }

    componentDidMount() {
        this.getQuestionByQuestionId();
        this.getFeedbackTypes();
    }

    getQuestionByQuestionId() {
        axios.get("http://localhost:8081/question/" + this.state.questionId).then((res) => {
            this.setState({
                question: res.data,
                answerCount: res.data.answers.length,
                feedbackId: res.data.feedbackType.feedbackId,
            })
        }).catch((error) => {
            this.setState({
                pageRedirect: true
            })
        });
    }

    getFeedbackTypes() {
        axios.get("http://localhost:8081/feedbackType").then((res) => {
            this.setState({
                feedbackTypeList: res.data
            });
        }).catch((error) => {
            this.growl.show({ closable: true, sticky: true, severity: 'error', summary: 'Feedback status', detail: 'feedback types fetching failed' });
        });
    }

    handleRadioButtonChange = (e) => {
        console.log(e.target.value)
        this.setState({
            feedbackId: e.target.value
        })
    }

    onDeleteAnswer(e) {
        e.preventDefault();
        console.log(e.target.value);
        const answerId = e.target.value;
        this.setState({
            question: this.state.question.answers.filter(answer =>
                answer.answerId != answerId
            ),
            answerCount: this.state.question.answers.length - 1
        });
        axios.delete("http://localhost:8081/answer/" + answerId);
        this.getQuestionByQuestionId();
    }

    onDeleteQuestion(e) {
        axios.delete("http://localhost:8081/question/" + this.state.questionId).then(() => {
            this.setState({
                pageRedirect: true
            })
        });
    }

    handleChange(i, event) {
        let values = [...this.state.values];
        values[i].value = event.target.value;
        this.setState({ values });
    }

    onSubmitAnswers(e) {
        e.preventDefault();
        const answerlist = {
            answerList: this.state.values.map((answer) => ({
                answerName: answer.value,
                questionId: this.state.questionId
            })),
            feedbackId: this.state.feedbackId
        };
        console.log(answerlist);
        axios.patch("http://localhost:8081/answer/saveall/" + this.state.questionId, answerlist).then((res) => {
            this.setState({
                pageRedirect: true
            })
        });
    }

    addClick(e) {
        e.preventDefault();
        this.setState({
            isAddAnswer: true
        })
        this.setState(prevState => ({
            values: [...prevState.values, { value: null }]
        }));
    }

    render() {
        const { feedbackTypeList = [] } = this.state;
        const { question = {} } = this.state;
        const { isAddAnswer = false } = this.state;
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
                            <span className="card-title-1">EDIT QUESTIONS: &nbsp;{question.questionName} </span>
                        </div>
                        <div className="card-body card-body-custom ">
                            <form onSubmit={(e) => this.onSubmitAnswers(e)}>
                                <div className="row">
                                    <div className="col">Feedback Type</div>
                                    {feedbackTypeList ? feedbackTypeList.map(feedbackTypeList => (
                                        <div className="col" key={feedbackTypeList.feedbackId}>
                                            <label>
                                                <input type="radio" value={feedbackTypeList.feedbackId}
                                                    checked={feedbackTypeList.feedbackId == this.state.feedbackId}
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
                                        <input type="textarea" className="form-control" value={question.questionName || ''} style={{ width: "500px", height: "50px" }} readOnly />
                                    </div>

                                </div>
                                {
                                    question.answers ? question.answers.map((answer, i) =>

                                        <div className="row" key={answer.answerId} style={{ marginTop: "5px", marginBottom: "5px" }} >
                                            <div className="col-3"> Answer {i + 1}</div>
                                            <div>
                                                <input type="text" className="form-control" value={answer.answerName || ''} style={{ width: "500px", display: "inline" }} readOnly />
                                            </div>
                                            &nbsp;<button style={{ display: "inline", color: "white" }} className="btn btn-warning" value={answer.answerId} onClick={this.onDeleteAnswer}>DELETE ANSWER</button>

                                        </div>
                                    ) : null
                                }

                                {isAddAnswer ? this.state.values.map((el, i) => (
                                    <div className="row" key={this.state.answerCount + (i + 1)} style={{ marginTop: "5px", marginBottom: "5px" }}>
                                        <div className="col-3"> Answer {this.state.answerCount + (i + 1)}</div>
                                        <div>
                                            <input type="text" placeholder="Description (Required)" className="form-control" value={el.value || ""}
                                                onChange={e => this.handleChange(i, e)} style={{ width: "500px", display: "inline" }} />
                                               &nbsp; <input type="button" style={{ display: "inline", color: "white" }} className="btn btn-warning" value="DELETE ANSWER"></input>
                                        </div>
                                    </div>
                                )) : null}

                                <button className="btn btn-success" onClick={e => this.addClick(e)}>Add Answer</button>
                                <div className="row">
                                    <div className="col-3"></div>
                                    <div className="col-6" style={{ marginLeft: "-29px" }}>
                                        <input type="submit" value="SAVE" className="btn btn-primary w-5" style={{margin:"10px"}} />
                                        <Link to={"/questioninfo"} className="btn btn-secondary w-5" style={{ margin: "10px" }} >CANCEL</Link>
                                        <input type="submit" value="DELETE" className="btn btn-danger w-5" onClick={this.onDeleteQuestion} style={{ margin: "10px" }} />
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </>)
    }
}

export default EditQuestion;