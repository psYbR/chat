import { createStore } from 'redux';

const store = createStore((state = {
  userName: '',
  messages: []
}) => {
  return state;
});

console.log(store.getState());