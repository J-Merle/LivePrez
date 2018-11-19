import React from 'react';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Content from '../common/content/containers/Content';
import * as contentMapTmp from '../../source/contentMap.json';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMap: contentMapTmp.default,
        }
        this.displayContentList = this.displayContentList.bind(this);
    }

    displayContentList() {
        let contentArray = [];
        for(var content in this.state.contentMap) {
            contentArray.push(this.state.contentMap[content]);
        }
        
        let contentList = contentArray.map(
            (content, index) => 
                <Content id={index} src={content.src} title={content.title} 
                    type={content.type} onlyContent={false}/>
        )
        return contentList;
    }

    render() {
        return (

            <div className='container-fluid height-100'>
                <div className="row height-100">
                    <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                        1
                    </div>
                    <div className='col-md-6 col-lg-6 height-100 vertical-scroll'>
                        {this.displayContentList()}
                    </div>
                    <div className='col-md-3 col-lg-3 height-100'>
                        3
                    </div>
                </div>
            </div>
        );
    }
}