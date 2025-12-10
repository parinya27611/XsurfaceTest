import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { createGlobalStyle } from "styled-components";
import { Toaster } from "react-hot-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import UploadProduct from "./pages/UploadProduct";
import NotFound from "./pages/NotFound";

const GlobalStyle = createGlobalStyle`
  input, button, textarea, select {
    font-family: inherit;
  }
`;
const App = () => {
  return (
    <>
      <Toaster />
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<Index />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-list/:id" element={<ProductDetail />} />
          <Route path="/product-list/upload" element={<UploadProduct />} />
          <Route path="/product-list/upload/:id" element={<UploadProduct />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
