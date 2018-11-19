import React from 'react';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import Slid from '../common/slid/containers/Slid';
import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import Presentation from '../common/presentation/containers/Presentation';
import * as contentMapTmp from '../../source/contentMap.json';
import * as presTmp from '../../source/pres.json';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMap: contentMapTmp.default,
            presMap: presTmp.default
        }
    }

    render() {
        return (

            <div className='container-fluid height-100'>
                <div className="row height-100">
                    <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                        <Presentation id={1} title={this.state.presMap.title} description={this.state.presMap.description}
                            slidArray={this.state.presMap.slidArray} contentMap={this.state.contentMap}/>
                    </div>
                    <div className='col-md-6 col-lg-6 height-100 vertical-scroll'>
                        <Slid id={0} title="This is my first slid" txt="This really need more content like, fr i mean, well, you know."
                            content_id={1} contentMap={this.state.contentMap} displayMode="FULL_MNG"/>
                        <Slid id={2} title="This is my second slid" txt="This was is even shorter, because its displayMode is SHORT"
                            content_id={3} contentMap={this.state.contentMap} displayMode="SHORT"/>
                    </div>
                    <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                        <BrowseContentPanel contentMap={this.state.contentMap}/>
                    </div>
                </div>
            </div>
        );
    }
}