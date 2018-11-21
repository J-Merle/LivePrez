import React from 'react';
import Presentation from "../../common/presentation/containers/Presentation";

export default class BrowsePresentationPanel extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Presentation
                id={this.props.presMap.id}
                title={this.props.presMap.title}
                description={this.props.presMap.description}
                slidArray={this.props.presMap.slidArray}
                contentMap={this.props.contentMap}
            ></Presentation>
        )
    }

}