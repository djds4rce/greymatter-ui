var React = require('react');
var Quiz = require('./quiz.js');
var Router = require('react-router');
var isMobile = require('ismobilejs');
var questionModel = require('./questionmodel');
var Home = React.createClass({
    mixins: [Router.Navigation],
    render: function() {
        return (
            <div>
                {this.showMobileControl()}
                <div className='row content'>
                    {this.showPrev()}
                    {this.state.loading
                        ? this.getLoading()
                        : <Quiz id={this.state.quiz.id} quiz={this.state.quiz}/>}
                    {this.showNext()}
                </div>
                <div className='row show-answer'>
                    <div className="twelve columns">
                        <b>{this.answer()}</b>
                    </div>
                </div>
                <div className='row show-answer'>
                    <div className="twelve columns">
                      { this.state.quiz && !this.state.quiz.showAnswer ? <button className="button-primary" onClick={this.showAnswer}>Show Answer</button>: <span></span>}
                    </div>
                </div>
            </div>
        );
    },
    getInitialState: function() {
        return {quiz: {}, questions: [], current: 0, loading: true};
    },
    nextQue: function() {
      this.loadData();
    },
    prev: function() {
        var that = this;
        this.setState({
            current: this.state.current - 1
        }, function() {
          current =   this.state.questions[this.state.current];
            that.setState({
                quiz: current
            });
            setTimeout(function () {
              window.location.hash = "#/question/"+current.id;
            }, 10);
        });
    },
    showPrev: function() {
        if (this.state.questions && this.state.questions.length > 0 && this.state.current > 0 && !isMobile.any) {
            return (
                <div className="one columns next-question" onClick={this.prev}>
                    <a href='#'><img alt='&lt;' className="u-max-full-width rotate180" src='images/arrow.png'/></a>
                </div>
            );
        }
    },
    showNext: function() {
        if (!isMobile.any) {
            return (
                <div className="one columns prev-question" onClick={this.nextQue}>
                    <a href='#'><img alt='&gt;' className="u-max-full-width" src='images/arrow.png'/></a>
                </div>
            );
        }
    },
    showMobileControl: function() {
        if (isMobile.any) {
            return (
                <div className="u-cf controls">
                    {this.showMobileLeft()}
                    <a className="u-pull-right arrowright" href='#' onClick={this.nextQue}><img alt='&gt;' className="arrow" src='images/arrow.png'/></a>
                </div>
            );
        }
    },
    showMobileLeft: function() {
        if (this.state.questions && this.state.questions.length > 0 && this.state.current > 0) {
            return (
                <a className="u-pull-left arrowleft hidden" href='#' onClick={this.prev}><img alt='&gt;' className='rotate180 arrow' src='images/arrow.png'/></a>
            );
        } else {
            return (
                <a style={{
                    'visibility': 'hidden'
                }} className="u-pull-left arrowleft hidden" href='#' onClick={this.prev}><img alt='&gt;' className='rotate180 arrow' src='images/arrow.png'/></a>
            );
        }
    },
    componentDidMount: function() {
        this.loadData();
    },
    loadData: function() {
        var defferedQuestion,
            that = this;
        this.setState({loading: true});
        if ((this.props.params && this.props.params.id )&& (this.state.quiz.id !== parseInt(this.props.params.id))) {
            defferedQuestion = questionModel.getQuestion(this.props.params.id);
        } else {
            defferedQuestion = questionModel.randomQuestion();
        }
        defferedQuestion.done(function(result) {
            var oldResults = that.state.questions;
            that.setState({
                questions: oldResults.concat([result])
            });
            that.setState({quiz: result});
            that.setState({
                current: that.state.questions.length - 1
            });
            that.setState({loading: false});
            window.location.hash = "#/question/"+result.id;
        });
    },
    getLoading: function() {
        return (
            <div className='ten columns'><img className='spinner' src='images/gears.svg'/></div>
        )
    },
    showAnswer: function() {
        var quiz = this.state.quiz;
        quiz.showAnswer = true;
        this.setState({quiz: quiz});
    },
    answer: function() {
        if (this.state.quiz && this.state.quiz.showAnswer) {
            return (
                <div className="twelve columns">{this.state.quiz.answer}</div>
            );
        }
    }
});

module.exports = Home;
