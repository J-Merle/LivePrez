import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import globalReducer from '../../reducer/index';
import { updateContentMap, updatePresentation } from '../../actions/index';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import BrowsePresentationPanel from '../browsePresentationPanel/containers/BrowsePresentationPanel';
import EditSlidPanel from '../editSlidPanel/containers/EditSlidPanel';
import * as contentMapTmp from '../../source/contentMap.json';
import * as presTmp from '../../source/pres.json';

const store = createStore(globalReducer);

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMap: contentMapTmp.default,
            presMap: presTmp.default
        };
        store.dispatch(updatePresentation(presTmp), updateContentMap(contentMapTmp));
    }

    render() {
        return (
            <Provider store={store}>
                <div className='container-fluid height-100'>
                    <div className="row height-100">
                        <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                            <BrowsePresentationPanel
                                presMap={this.state.presMap}
                                contentMap={this.state.contentMap}/>
                        </div>
                        <div className='col-md-6 col-lg-6 height-100 vertical-scroll'>
                            <EditSlidPanel selected_slid={this.state.presMap.slidArray['1']} contentMap={this.state.contentMap} />
                        </div>
                        <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                            <BrowseContentPanel contentMap={this.state.contentMap} />
                        </div>
                    </div>
                </div>
            </Provider>
        );
    }
}