import React, { Component } from 'react';
import {
    Card,
    CardText,
    CardTitle,
  } from 'reactstrap';
  import MatButton from '@material-ui/core/Button';
  import { Scrollbars } from 'react-custom-scrollbars';

class DashBoard extends Component {
    render() {
        return (
        <div className="grid-list-wrapper">
            <div className="row">
                {['one', 'two', 'three'].map((val, i) => {
                    return (
                        <Card 
                            className="col-sm-3 mr-3" 
                            style={{backgroundColor: '#F4F7FA'}} 
                            body 
                            outline 
                            color="secondary" 
                            key={i}>
                            <CardTitle className="font-weight-bold text-dark text-center">{val}</CardTitle>
                            <Scrollbars 
                                autoHeight 
                                autoHide 
                                autoHeightMin={100} 
                                autoHeightMax={550}>
                                {new Array(20).fill(1).map((val , i) => {
                                    return (
                                        <div className="mb-10" key={i}>
                                            <Card body outline color="c">
                                                <CardTitle className="font-weight-bold">{`#${i + 1}`} Special Title Treatment dsad sadsa sdsa</CardTitle>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </Scrollbars>
                        </Card>
                    );
                })}
                <MatButton variant="fab" color="primary" className="text-white mr-15 mb-10" aria-label="add">
                    <i className="zmdi zmdi-plus"></i>
                </MatButton>
            </div>
        </div>
        );
    }
}

export default DashBoard;
