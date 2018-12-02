import React from 'react';
import Content from '../../common/content/containers/Content';
import AddContentPanel from '../../addContentPanel/containers/AddContentPanel';

export default class BrowseContentPanel extends React.Component {
    constructor(props) {
        super(props);
        this.displayContentList = this.displayContentList.bind(this);
    }

    displayContentList() {
        let contentArray = [];
        for(var content in this.props.contentMap) {
            contentArray.push(this.props.contentMap[content]);
        }
        
        let contentList = contentArray.map(
            (content, index) => 
                <Content id={content.id} src={content.src} title={content.title} 
                    type={content.type} onlyContent={false}/>
        )
        return contentList;
    }

    render() {
        return(
            <React.Fragment>
                <AddContentPanel/>
                {this.displayContentList()}
            </React.Fragment>
        );
    }
}