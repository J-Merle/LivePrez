import React from 'react';
import { connect } from 'react-redux';
import { updateDraggedElt } from '../../../../actions/index';
import './content.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.formatContent = this.formatContent.bind(this);
        this.drag = this.drag.bind(this);
    }

    formatContent() {
        switch (this.props.type) {
            case 'img':
            case 'img_url':
                return <img id={this.props.id} src={this.props.src} alt={this.props.title} draggable="true" onDragStart={this.drag}/>;
            case 'video':
                return <iframe id={this.props.id} width="100%" src={this.props.src} draggable="true" onDragStart={this.drag}></iframe>;
            case 'web':
                return <iframe id={this.props.id} width="100%" src={this.props.src} draggable="true" onDragStart={this.drag}></iframe>;
            default:
                break
        }
    }

    drag(e) {
        e.preventDefault();
        this.props.dispatch(updateDraggedElt(e.target.id));
    }

    render() {
        if (this.props.onlyContent) {
            return (
                <div className="content">
                    {this.formatContent()}
                </div>
            );
        } else {
            return (
                <div className="content">
                    <div>
                        {this.formatContent()}
                    </div>
                    <div>
                        <p>ID : {this.props.id} Title : {this.props.title}</p>
                    </div>
                </div>
            );
        }
    }
}

export default connect()(Content);