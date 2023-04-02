import { BrowserRouter, Route, Routes } from 'react-router-dom'

// pages & components
import Home from './pages/home/Home'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home />} >
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App