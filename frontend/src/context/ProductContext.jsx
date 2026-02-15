import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
export const ProductContextProvider = ({ children }) => {
  const [products, setproducts] = useState([]);
  const [product, setproduct] = useState([]);
  const [myproduct, setMyProduct] = useState([]);

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${server}/api/Product/all`);

      setproducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProduct(id) {
    try {
      const { data } = await axios.get(`${server}/api/Product/${id}`);
      setproduct(data.product);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMyproducts() {
    try {
      const { data } = await axios.get(`${server}/api/myProduct`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setMyProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchMyproducts();
  }, []);
  return (
   <ProductContext.Provider value={{
    products,
    fetchProducts,
    fetchProduct,
    product,
    myproduct,
    fetchMyproducts,
  }}
>{children}</ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
