import React from 'react';
import './App.css';
import {RandomMeUsersHOC} from './RandomMeUsersHOC';
import {RandomMeUsersHooks} from './RandomMeUsersHooks';

function App() {
  return (
    <div className="App">
      <section>
        <h1>HOC</h1>
        <RandomMeUsersHOC />
        <h1>HOOKS</h1>
        <RandomMeUsersHooks />
      </section>
    </div>
  );
}

export default App;
