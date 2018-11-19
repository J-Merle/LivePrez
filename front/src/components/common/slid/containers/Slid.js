import React from 'react';
import './slid.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Content from '../../content/containers/Content';
import EditMetaSlid from '../components/EditMetaSlid';

export default class Slid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            thumbnail: this.props.contentMap[this.props.content_id]
        }
    }

    render() {
        let editForm;
        if (this.props.displayMode === 'FULL_MNG') {
            editForm = <EditMetaSlid title={this.props.title} txt={this.props.txt} />
        }
        return (
            <div className="slid">
                <div>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.txt}</p>
                    <Content id={this.state.thumbnail.id} src={this.state.thumbnail.src} title={this.state.thumbnail.title}
                        type={this.state.thumbnail.type} onlyContent={true} />
                </div>
                {editForm}
            </div>
        );
    }
}