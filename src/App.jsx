import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import MyPage from "./pages/MyPage";
import MyProfile from "./pages/MyProfile";
import EditMyProfile from "./pages/EditMyProfile";
import Entrance from "./pages/Entrance";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/editprofile" element={<EditMyProfile />} />
          <Route path="/entrance" element={<Entrance />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
