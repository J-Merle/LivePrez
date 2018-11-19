import React from 'react';
import './presentation.css';
import '../../../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Slid from './../../slid/containers/Slid';

export default class Presentation extends React.Component {
    constructor(props) {
        super(props);

        console.log(this.props.slidArray);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);
        this.displaySlids = this.displaySlids.bind(this);
    }

    handleChangeTitle(e) {
        this.props.title = e.target.value;
    }

    handleChangeDesc(e) {
        this.props.description = e.target.value;
    }

    displaySlids() {
        let slidMap = this.props.slidArray.map(
            (slid) =>
                <Slid id={slid.id} title={slid.title} txt={slid.txt}
                    content_id={slid.content_id} contentMap={this.props.contentMap} displayMode="FULL_MNG" />
        );
        console.log(slidMap);
        return slidMap;
    }

    render() {
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="currentSlideTitle">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="currentSlideTitle"
                        onChange={this.handleChangeTitle}
                        value={this.props.title}
                    />
                    <label htmlFor="currentSlideText">Description</label>
                    <textarea
                        rows="5"
                        type="text"
                        className="form-control"
                        id="currentSlideText"
                        onChange={this.handleChangeDesc}
                        value={this.props.description}>
                    </textarea>
                </div>
                <div>
                    {this.displaySlids()}
                </div>
            </React.Fragment>
        );
    }
}