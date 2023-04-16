import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import Product from "./Product";
import Title from "antd/es/typography/Title";
import axios from "axios";
import { Link } from "react-router-dom";

export interface Product {
  sProductName: string;
  sProductImage: string;
  sPrice: number;
  sDescription: string;
  sQuantity: number;
  _id: string;
}

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  const BASE_URL = "http://localhost:8003";

  const getProducts = async () => {
    await axios
      .get(`${BASE_URL}/products/allProducts?limit=0&page=1`)
      .then((res) => {
        if (res) {
          setProducts(res.data.payload.product);
        }
      })
      .catch((err) => {
        console.error(err.response);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Title>All Products</Title>
        <Row>
          {products?.length > 0 && (
            <>
              {products.map((product: Product) => {
                return (
                  <Col span={6}>
                    <Link to={`/add-update-product/${product._id}`}>
                      <Product
                        title={product.sProductName}
                        desc={product.sDescription}
                      />
                    </Link>
                  </Col>
                );
              })}
            </>
          )}
        </Row>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default ProductListing;
