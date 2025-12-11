import './App.css';
import Loader from './Loader/loader.jsx';
import './Loader/loader.css';
import './Glass/glass.css';
import Glass from './Glass/glass.jsx';
import { useRef } from "react";

function App() {
  const containerRef = useRef(null);

  return (
    <>
      <Loader />
      <Glass containerRef={containerRef} />
    </>
  )
}

export default App