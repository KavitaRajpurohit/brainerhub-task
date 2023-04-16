import React from "react";
import { Card } from "antd";

const { Meta } = Card;

interface ProductProps {
  title: string;
  desc: string;
  image?: string;
}

const Product = ({ title, desc, image }: ProductProps) => (
  <Card
    hoverable
    style={{ width: 240, marginBottom: 30 }}
    cover={
      <img
        alt="example"
        src="https://www.freshproduce.com/siteassets/images/large-tile-images/cartonsoffruit.jpg"
      />
    }
  >
    <Meta title={title} description={desc} />
  </Card>
);

export default Product;
