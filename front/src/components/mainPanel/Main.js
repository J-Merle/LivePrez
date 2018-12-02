import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import globalReducer from '../../reducer/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { updateContentMap, updatePresentation } from '../../actions/index';
import './main.css';
import '../../lib/bootstrap-3.3.7-dist/css/bootstrap.min.css';
import BrowseContentPanel from '../browseContentPanel/containers/BrowseContentPanel';
import BrowsePresentationPanel from '../browsePresentationPanel/containers/BrowsePresentationPanel';
import EditSlidPanel from '../editSlidPanel/containers/EditSlidPanel';
import * as contentMapTmp from '../../source/contentMap.json';
import * as presTmp from '../../source/pres.json';
import Comm from '../../services/Comm';

//var Comm = require('../../services/Comm');

const store = createStore(globalReducer);

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.comm = new Comm();
        
        this.loadContentUpdate = this.loadContentUpdate.bind(this);
        this.loadPresUpdate = this.loadPresUpdate.bind(this);
        this.callbackError = this.callbackError.bind(this);

        this.state = {
            contentMap: contentMapTmp.default,
            presMap: presTmp.default
        };
        store.dispatch(updatePresentation(presTmp), updateContentMap(contentMapTmp));
        /*store.subscribe(() => {
            console.log('store state');
            console.log(store.getState());
            this.setState({
                presentation: store.getState().updateModelReducer.presentation
            });
            this.setState({
                contentMap: store.getState().updateModelReducer.content_map
            });
        });*/

        // FIRST ACTIONS
        this.comm.loadContent(this.loadContentUpdate, this.callbackError);
        this.comm.loadPres(0, this.loadPresUpdate, this.callbackError);
        this.comm.socketConnection(this.state.uuid);
    }

    loadContentUpdate(data) {
        //store.dispatch(updateContentMap(data));
        return data;
    }

    loadPresUpdate(data) {
        //store.dispatch(updatePresentation(data));
        return data;
    }

    callbackError(err) {
        console.log(err.message);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <div className='container-fluid height-100'>
                        <div className="row height-100">
                            <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                                <BrowsePresentationPanel
                                    presMap={this.state.presMap}
                                    contentMap={this.state.contentMap} />
                            </div>
                            <div className='col-md-6 col-lg-6 height-100 vertical-scroll'>
                                <EditSlidPanel selected_slid={this.state.presMap.slidArray['2']} contentMap={this.state.contentMap} />
                            </div>
                            <div className='col-md-3 col-lg-3 height-100 vertical-scroll'>
                                <BrowseContentPanel contentMap={this.state.contentMap} />
                            </div>
                        </div>
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}