import { CascaderProps, Upload } from "antd";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from "./ProductListing";
import { toast } from "react-toastify";

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,
    },
  },
};

const SingleProduct: React.FC = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();

  const getProductDetail = async () => {
    await axios
      .get(`http://localhost:8003/products/${id}`)
      .then((res) => {
        if (res) {
          setProduct(res.data.payload);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        title: product?.sProductName,
        description: product.sDescription,
      });
    }
  }, [product]);

  useEffect(() => {
    if (id) {
      getProductDetail();
    }
  }, []);

  const onFinish = async (values: any) => {
    if (id) {
      await axios
        .put(`http://localhost:8003/products/updateProduct?id=${id}`, {
          sProductName: values.title,
          sProductImage: "demo.png",
          sPrice: 200,
          sDescription: values.description,
          sQuantity: 2,
        })
        .then((res) => {
          if (res.data.status == 200) {
            toast.success("Product Updated Successfully!");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      await axios
        .post(`http://localhost:8003/products/createProduct`, {
          sProductName: values.title,
          sProductImage: "demo.png",
          sPrice: 200,
          sDescription: values.description,
          sQuantity: 2,
        })
        .then((res) => {
          if (res) {
            toast.success("Product Added Successfully!");
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}>
        <Form
          {...formItemLayout}
          form={form}
          name="submit"
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "auto" }}
          scrollToFirstError
        >
          <Form.Item
            name="title"
            label="Product Title"
            rules={[
              {
                required: true,
                message: "Please input your product title!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Product Description"
            rules={[
              {
                required: true,
                message: "Please input your product description!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra=""
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item {...tailFormItemLayout} className="form_action">
            <Button type="primary" htmlType="submit">
              {id ? "Update Product" : "Add Product"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={4}></Col>
    </Row>
  );
};

export default SingleProduct;
