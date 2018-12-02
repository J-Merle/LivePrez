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
            txt: this.props.txt,
            content_id: this.props.content_id
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTxt = this.handleChangeTxt.bind(this);

        this.updateSelectedSlid = this.updateSelectedSlid.bind(this);
        this.updateSlid = this.updateSlid.bind(this);

        this.drop = this.drop.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
            txt: nextProps.txt,
            content_id: nextProps.content_id
        });
    }

    handleChangeTitle(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        }, this.updateSlid);
    }

    handleChangeTxt(e) {
        e.preventDefault();
        this.setState({
            txt: e.target.value
        }, this.updateSlid);
    }

    updateSelectedSlid() {
        if (this.props.displayMode === 'SHORT') {
            const tmpSlid = {
                id: this.props.id,
                title: this.props.title,
                txt: this.props.txt,
                content_id: this.state.content_id
            };
            this.props.dispatch(setSelectedSlid(tmpSlid));
        }
    }

    updateSlid() {
        const newSlid = {
            id: this.props.id,
            title: this.state.title,
            txt: this.state.txt,
            content_id: this.state.content_id
        };
        this.props.dispatch(updateSlid(newSlid));
    }

    allowDrop(e) {
        e.preventDefault();
    }

    drop(e) {
        e.preventDefault();
        console.log(this.props.draggedElement);
        this.setState({
            content_id: this.props.draggedElement
        }, this.updateSlid());
    }

    render() {
        let content = this.props.contentMap[this.state.content_id];
        if (content === undefined) {
            content = this.props.contentMap['1'];
        }

        let fullMng = this.props.displayMode === 'FULL_MNG';
        return (
            <div className="slid" onClick={() => this.updateSelectedSlid()} onDrop={this.drop} onDragOver={this.allowDrop}>
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

const mapStateToProps = (state, ownProps) => {
    return {
        draggedElement: state.selectedReducer.draggedElt
    };
};

export default connect(mapStateToProps)(Slid);