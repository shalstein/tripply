import React from 'react';

const direction = props => {
   return <div dangerouslySetInnerHTML={props.html_instructions} />
}

export default direction