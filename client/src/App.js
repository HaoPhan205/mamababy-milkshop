import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/homepage";
import SignInSide from "./pages/SignInPage/signin";
import Header from "./components/Layouts/Header/Header";
import Footer from "./components/Layouts/Footer/Footer";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />;
        <Route path="/login" element={<SignInSide />} />;
      </Routes>
      <Footer />
    </>
  );
}

export default App;
