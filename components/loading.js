import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = () => (
   <div style={{height: 200}}>
      <ReactLoading type='bars' color='#ECEFF1' height={200} width={'100%'} />
   </div>
);
 
export default Loading;