import React, { Component } from 'react';
import * as types from '../actions/types'
import Table from '../containers/Table'

export default class App extends Component {

    render() {

      return (
        <div>
            <Table />
        </div>
        
      );
  }
  
}
