import React from 'react';
import { connect } from 'react-redux';
import {addContent} from '../../../actions/index';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddContentPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            contentType: 'video',
            title: '',
            url: ''
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeUrl = this.handleChangeUrl.bind(this);
    }

    handleOpen() {
        this.setState({ open: true });
    };

    handleClose() {
        this.setState({ open: false });
    };

    handleChange(event, index, value) {
        this.setState({ contentType: value })
    }

    handleChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleChangeUrl(e) {
        this.setState({
            url: e.target.value
        });
    }

    handleSubmit() {
        let contentMap = this.props.contentMap;
        const newContent = {
            id: '',
            title: this.state.title,
            type: this.state.contentType,
            src: this.state.url
        }
        this.props.dispatch(addContent(newContent));
        this.setState({ open: false });
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />,
        ];

        return (
            <div>
                <RaisedButton label="Ajouter" onClick={this.handleOpen} />
                <Dialog
                    title="Add a new content"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <div className='col-lg-12'>
                        <label htmlFor="contentTitle">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contentTitle"
                            onChange={this.handleChangeTitle}
                            value={this.state.title}
                        />
                    </div>

                    <div className='col-lg-12'>
                        <SelectField
                            floatingLabelText="Content type"
                            value={this.state.contentType}
                            onChange={this.handleChange}
                            autoWidth={true}>
                            <MenuItem value={'video'} primaryText="Video" />
                            <MenuItem value={'img_url'} primaryText="Image URL" />
                            <MenuItem value={'web'} primaryText="Website" />
                        </SelectField>
                    </div>

                    <div className='col-lg-12'>
                        <label htmlFor="contentURL">URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="contentURL"
                            onChange={this.handleChangeUrl}
                            value={this.state.url}
                        />
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default connect()(AddContentPanel);