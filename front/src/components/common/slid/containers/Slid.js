import React from 'react';
import { connect } from 'react-redux';
import { setSelectedSlid } from '../../../../actions/index';
import Content from '../../content/containers/Content';
import EditMetaSlid from '../components/EditMetaSlid';
import './slid.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';

class Slid extends React.Component {
    constructor(props) {
        super(props);

        this.updateSelectedSlid = this.updateSelectedSlid.bind(this);
    }

    updateSelectedSlid() {
        if (this.props.displayMode === 'SHORT') {
            const tmpSlid = {
                id: this.props.id,
                title: this.props.title,
                txt: this.props.txt,
                content_id: this.props.content_id
            };
            this.props.dispatch(setSelectedSlid(tmpSlid));
        }
    }

    render() {
        let editForm;
        let content = this.props.contentMap[this.props.content_id];
        if (content === undefined) {
            content = this.props.contentMap['1'];
        }
        if (this.props.displayMode === 'FULL_MNG') {
            editForm = <EditMetaSlid title={this.props.title} txt={this.props.txt} />
        }
        return (
            <div className="slid" onClick={()=>{this.updateSelectedSlid()}}>
                <div>
                    <h1>{this.props.title}</h1>
                    <p>{this.props.txt}</p>
                    <Content id={content.id} src={content.src} title={content.title}
                        type={content.type} onlyContent={true} />
                </div>
                {editForm}
            </div>
        );
    }
}

export default connect()(Slid);