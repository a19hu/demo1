import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Search from './pages/Search';
import React from 'react';
import Searchbutton from './component/Searchbutton';
import MinLoader from './component/MinLoader';
import { DataProvider } from './context/DataContext';
import Searchsuggestion from './component/Searchsuggestion';

function App() {
  return (
    <BrowserRouter>
    <DataProvider>
    <Navbar />
   <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/minLoader" element={<MinLoader/>} />
     <Route path="/search" element={<Search />} />
     <Route path="/searchbutton" element={<Searchbutton />} />
     <Route path="/searchsugg" element={<Searchsuggestion />} />

    
   </Routes>
     </DataProvider>
 </BrowserRouter>
  );
}

export default App;