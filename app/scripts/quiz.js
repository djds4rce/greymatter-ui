var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Quiz = React.createClass({
    mixins: [ReactRouter.Navigation],
    render: function() {
        return (
            <div className='ten columns'>
                <div>
                    {this.maybeRenderQuestion()}
                    {this.maybeRenderImage()}
                </div>
                <div className='meta'>
                    <p className='source'>
												<label>Source:</label>
												<a href='#'>Grey Matter Facebook</a>
									  </p>
                  </div>
            </div>

        );
    },
    maybeRenderQuestion: function() {
        if (this.props.quiz.description) {
            return (
                <h5>{this.props.quiz.description}</h5>
            );
        }
    },
    maybeRenderImage: function() {
        if (this.props.quiz.picture) {
            return (
                <div className="row">
                    <div className="twelve columns"><img className="u-max-full-width" src={this.props.quiz.picture}/></div>
                </div>
            );
        }
    },
    tags: function() {
        var that = this;
        if (this.props.quiz.tags && this.props.quiz.tags.length > 0 && this.props.quiz.showAnswer) {
            return this.props.quiz.tags.map(function(tag) {
                return (
                    <button key={tag} onClick={that.transition.bind(that, tag)}>{tag}</button>
                );
            });
        }
    },
    transition: function(tag) {
        this.transitionTo('tag', {}, {
            id: encodeURIComponent(tag)
        });
    }
});

module.exports = Quiz;
