import React from 'react';

function Status(props) {

  function returnAll() {
    return props.display == 'all';
  }

  function returnActive() {
    return props.display == 'active';
  }

  function returnCompleted() {
    return props.display == 'completed';
  }

  return (
    <div className={`status-div status-div__${props.class} ${props.lightTheme ? '' : 'dark'}`}>
      <button className={`status-div__button ${returnAll() ? 'active' : ''}`} onClick={props.allClick}>All</button>
      <button className={`status-div__button ${returnActive() ? 'active' : ''}`} onClick={props.activeClick}>Active</button>
      <button className={`status-div__button ${returnCompleted() ? 'active' : ''}`} onClick={props.completedClick}>Completed</button>
    </div>
  )
}

export default Status;