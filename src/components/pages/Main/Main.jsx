// src/components/pages/Main/Main.jsx
import React from 'react';
import Header from './Header/Header';
import MiniCartDrawer from './cart/MiniCartDrawer';
import ProductCards from '../Main/ProductCards/ProductCards';
import Footer from './Footer/Footer';

const Main = () => {
  return (
    <>
      <Header />
      <MiniCartDrawer />
      <main className="page-main">
        <ProductCards />
      </main>
      <Footer />
    </>
  );
};

export default Main;
