export default (reducers) => {

  if (reducers === null || typeof reducers !== 'object') {
    return {};
  }

  let keys = Object.keys(reducers);

  return (state = null, action) => {
    let nextState = {};

    for(let i = 0; i < keys.length; i++){
      let key = keys[i];
      let s = state && state.hasOwnProperty(key) ? state[key] : undefined;
      let val = reducers[key](s, action);
      if(key === 'form' || (val !== null && Object.keys(val).length > 0) || Array.isArray(val)) {
        nextState[key] = val;
      }
    }

    return nextState;
  };
}
