import { useReducer } from 'react';

function useForceUpdate() {
  const [, dispatch] = useReducer(() => Object.create(null), {});
  return dispatch;
}

export default useForceUpdate;
