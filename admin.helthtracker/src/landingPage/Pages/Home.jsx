import React from "react";
import Navbar from "../layout/Navbar";
import Services from "../Pages/Services";
import AboutUs from "../layout/AboutUs";
import ContactUs from "../layout/ContactUs";
import Footer from "../layout/Footer";
import PageLayout from "examples/LayoutContainers/PageLayout";

const Home = () => {
  return (
    <div>
      <PageLayout>
        <Navbar />
        <Services />
        <AboutUs />
        <ContactUs />
        <Footer />
      </PageLayout>
    </div>
  );
};

export default Home;
