import React from 'react';
import Slid from '../../common/slid/containers/Slid';
import { connect } from 'react-redux';

class EditSlidPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Slid id={this.props.selected_slid.id} title={this.props.selected_slid.title} txt={this.props.selected_slid.txt}
                content_id={this.props.selected_slid.content_id} contentMap={this.props.contentMap} displayMode="FULL_MNG" />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selected_slid: state.selectedReducer.slid,
    }
};

export default connect(mapStateToProps)(EditSlidPanel);