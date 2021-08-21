import React from 'react';
import {Test} from "../components/Test";
import {apiPing} from '../api/api';


export const App = () => {

    apiPing.pingGet();

  return (
    <div>
      <Test/>
    </div>
  )
};

