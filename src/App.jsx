import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddQuestion from "./components/AddQuestion";
import ViewQuestion from "./components/ViewQuestion";
import AllPolls from "./components/AllPolls";
import AddName from "./components/AddName";
import Answer from "./components/Answer";

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/add-question" element = {<AddQuestion/>}/>
        <Route path="/add-name" element = {<AddName/>}/>
        <Route path="/all-polls" element = {<AllPolls/>}/>
        <Route path="/answer" element = {<Answer/>}/>
        <Route path="/view-question" element = {<ViewQuestion/>}/>
      </Routes>
    </Router>
  )
}

export default App;