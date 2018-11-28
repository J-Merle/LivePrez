import React from 'react';
import { connect } from 'react-redux';
import { setSelectedSlid, updateSlid } from '../../../../actions/index';
import Content from '../../content/containers/Content';
import EditMetaSlid from '../components/EditMetaSlid';
import './slid.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';

class Slid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            txt: this.props.txt
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTxt = this.handleChangeTxt.bind(this);

        this.updateSelectedSlid = this.updateSelectedSlid.bind(this);
        this.updateSlid = this.updateSlid.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            txt: nextProps.txt
        });
    }

    handleChangeTitle(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        });
        this.updateSlid(this.props.id, this.state.title, this.state.txt, this.props.content_id);
    }

    handleChangeTxt(e) {
        e.preventDefault();
        this.setState({
            txt: e.target.value
        });
        this.updateSlid(this.props.id, this.state.title, this.state.txt, this.props.content_id);
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

    updateSlid(id, title, txt, content_id) {
        const newSlid = {
            id: id,
            title: title,
            txt: txt,
            content_id: content_id
        };
        this.props.dispatch(updateSlid(newSlid));
    }

    render() {
        let content = this.props.contentMap[this.props.content_id];
        if (content === undefined) {
            content = this.props.contentMap['1'];
        }

        let fullMng = this.props.displayMode === 'FULL_MNG';
        return (
            <div className="slid" onClick={() => { this.updateSelectedSlid() }}>
                <div>
                    <h1>{this.state.title}</h1>
                    <p>{this.state.txt}</p>
                    <Content id={content.id} src={content.src} title={content.title}
                        type={content.type} onlyContent={true} />
                </div>
                {fullMng ? (<EditMetaSlid title={this.state.title}
                                handleChangeTitle={this.handleChangeTitle}
                                txt={this.state.txt}
                                handleChangeTxt={this.handleChangeTxt} />) : ''}
            </div>
        );
    }
}

export default connect()(Slid);