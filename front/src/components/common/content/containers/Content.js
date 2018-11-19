import React from 'react';
import './content.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.formatContent = this.formatContent.bind(this);
    }

    formatContent() {
        switch (this.props.type) {
            case 'img':
            case 'img_url':
                return <img src={this.props.src} alt={this.props.title} />;
            case 'video':
                return <iframe width="100%" src={this.props.src}></iframe>;
            case 'web':
                return <iframe width="100%" src={this.props.src}></iframe>;
            default:
                break
        }
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