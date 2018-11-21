import React from 'react';
import './editMetaSlid.css'
export default class EditMetaSlid extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            title: this.props.title,
            txt: this.props.txt
        }
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeTxt = this.handleChangeTxt.bind(this);
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleChangeTxt(e) {
        this.setState({
            txt: e.target.value
        });
    }
    
    render() {
        return (
            <div className="form-group">
                <label htmlFor="currentSlideTitle">Title </label>
                <input
                    type="text"
                    className="form-control"
                    id="currentSlideTitle"
                    onChange={this.handleChangeTitle}
                    value={this.state.title}
                />
                <label htmlFor="currentSlideText">Text</label>
                <textarea
                    rows="5"
                    type="text"
                    className="form-control"
                    id="currentSlideText"
                    onChange={this.handleChangeTxt}
                    value={this.state.txt}>
                </textarea>
            </div>
        );
    }
}