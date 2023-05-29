import {render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(
      // eslint-disable-next-line react/react-in-jsx-scope
      <Router>
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <App />
      </Router>,
  );
});
