import React from 'react';
import { connect } from 'react-redux';
import './presentation.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Slid from './../../slid/containers/Slid';

class Presentation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description
        }

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.displaySlids = this.displaySlids.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleChangeDesc(e) {
        this.setState({
            description: e.target.value
        });
    }

    displaySlids() {
        console.log('displaySlids');
        let slidMap = this.props.slidArray.map(
            (slid) =>
                <Slid id={slid.id} title={slid.title} txt={slid.txt}
                    content_id={slid.content_id} contentMap={this.props.contentMap} displayMode="SHORT" />
        );
        return slidMap;
    }

    render() {
        console.log('render');
        const slidMap = this.props.slidArray.map(
            (slid) =>
                <Slid id={slid.id} title={slid.title} txt={slid.txt}
                    content_id={slid.content_id} contentMap={this.props.contentMap} displayMode="SHORT" />
        );
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="currentSlideTitle">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="currentSlideTitle"
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                    />
                    <label htmlFor="currentSlideText">Description</label>
                    <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        id="currentSlideText"
                        onChange={this.handleChangeDesc}
                        value={this.state.description}>
                    </textarea>
                </div>
                <div>
                    {slidMap}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let newSlidArray = ownProps.slidArray;
    newSlidArray[state.updateModelReducer.presentation.id] = state.updateModelReducer.presentation;
    return {
        slidArray: newSlidArray,
    }
};

export default connect(mapStateToProps)(Presentation);