import { Route, Routes, Navigate } from 'react-router-dom';

import Issues from '../pages/Issues';
import Books from '../pages/Books';
import Interviews from '../pages/Interviews';
import AddIssue from '../pages/AddIssue';
import IssueDetail from '../pages/IssueDetail';
import SearchPage from '../pages/SearchPage';
import Personal from '../pages/Personal';
import NotFound from '../pages/NotFound';
import BookDetail from '../pages/BookDetail';

function RouteConfig() {
  return (
    <Routes>
      <Route
        path="/issues"
        element={<Issues />}
      />
      <Route
        path="/addIssue"
        element={<AddIssue />}
      />
      <Route
        path="/books"
        element={<Books />}
      />
      <Route
        path="/interviews"
        element={<Interviews />}
      />
      <Route
        path="/"
        element={
          <Navigate
            replace
            to="/issues"
          />
        }
      />
      <Route
        path="/issues/:issueId"
        element={<IssueDetail />}
      />
      <Route
        path="/books/:bookId"
        element={<BookDetail />}
      />
      <Route
        path="/searchPage"
        element={<SearchPage />}
      />
      <Route
        path="/personal"
        element={<Personal />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default RouteConfig;
