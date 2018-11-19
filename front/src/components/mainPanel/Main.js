import React from 'react';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Content from '../common/content/containers/Content';
import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import * as contentMapTmp from '../../source/contentMap.json';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMap: contentMapTmp.default,
        }
    }

    render() {
        return (

            <div className='container-fluid height-100'>
                <div className="row height-100">
                    <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                        Left
                    </div>
                    <div className='col-md-6 col-lg-6 height-100 vertical-scroll'>
                        Middle
                    </div>
                    <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                        <BrowseContentPanel contentMap={this.state.contentMap}/>
                    </div>
                </div>
            </div>
        );
    }
}