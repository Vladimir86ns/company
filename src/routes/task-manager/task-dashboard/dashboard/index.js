import React, { Component } from 'react';
import {
    Card,
    CardText,
    CardTitle,
  } from 'reactstrap';
  import MatButton from '@material-ui/core/Button';

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
                                {[1,2,3,4,5,6,7].map((val , i) => {
                                    return (
                                        <div className="mb-10" ke={i}>
                                            <Card body outline color="c">
                                                <CardTitle className="font-weight-bold">Special Title Treatment dsad sadsa sdsa</CardTitle>
                                            </Card>
                                        </div>
                                    );
                                })}
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
