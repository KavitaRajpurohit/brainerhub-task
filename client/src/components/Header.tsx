import { Col, Divider, Row } from "antd";
import Title from "antd/es/typography/Title";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <div className="site_header-wrapper">
            <Title>My Product Store</Title>
            <div>
              <Link to="/">Home</Link>
              {token && (
                <>
                  <Link className="ml-4" to="/add-update-product">
                    Add Product
                  </Link>

                  <Link
                    className="ml-4"
                    to=""
                    onClick={() => {
                      localStorage.setItem("token", "");
                      navigate("/");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
          <Divider />
        </Col>
        <Col span={4}></Col>
      </Row>
    </>
  );
};

export default Header;
