import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from 'react';
import HomePage from "./pages/HomePage"
import ShowLyrics from "./pages/ShowLyrics"
import CategoryList from "./pages/CategoryList"
import ZemariList from "./pages/ZemariList"
import ZemariMezmurs from "./pages/ZemariMezmurs"
import CategoryMezmurs from "./pages/CategoryMezmurs"
import Form from "./pages/Form"
import { Provider } from "react-redux"
import { persistor, store } from './api/store';
import { Toaster } from "react-hot-toast"
import { HelmetProvider } from "react-helmet-async"
import { PersistGate } from "redux-persist/integration/react"

function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <HelmetProvider>
       <Toaster/>
  <BrowserRouter>
  
  <Routes>
   
    <Route  path="/" element={<HomePage />} />
    <Route path="/lyrics/:id" element={<ShowLyrics/>}/>
    <Route path="/categorylist" element={<CategoryList/>}/>
    <Route path="/zemarilist" element={<ZemariList/>}/>
    <Route path="/zemarimezmur/:id" element={<ZemariMezmurs/>}/>
    <Route path="/categorymezmur/:id" element={<CategoryMezmurs/>}/>
    <Route path="/form" element={<Form/>}/>
    
  </Routes>
  </BrowserRouter>
  </HelmetProvider>
  </PersistGate>
  </Provider>
  )
}

export default App
