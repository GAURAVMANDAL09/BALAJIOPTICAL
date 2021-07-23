import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import axios from 'axios'
// import products from '../products'
const ProductScreen = ({ history, match }) => {
  //Adding Cart Product
  const [qty, setQty] = useState(1);

  //    const [product,setProduct]=useState({});
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  //    useEffect(() => {
  //        const fetchProduct= async () => {
  //            const res=await axios.get(`/api/products/${match.params.id}`)
  //            setProduct(res.data);
  //        }
  //        fetchProduct();
  //    }, [match])
  // const product=products.find(p=> p._id === match.params.id)

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        <i class="fas fa-long-arrow-alt-left"></i> Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color="gold"
                ></Rating>
              </ListGroup.Item>
              <ListGroup.Item>
                <h1>₹{product.price}</h1>
              </ListGroup.Item>
              <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>

            <Card
              style={{
                backgroundColor: product.countInStock > 0 ? "green" : "red",
              }}
            >
              <ListGroup.Item>
                <Row>
                  <Col md={4}>
                    Status:{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <Col
                    md={{ span: 4, offset: 4 }}
                    style={{ paddingTop: ".5rem" }}
                  >
                    <Row md={1}>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        // size='sm'
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      )}
      {/* <Row>
               <Col md={5}>
                <Image src={product.image} alt={product.name} fluid/> 
               </Col>
               <Col md={7}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color='gold'></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h1>₹{product.price}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item style={{fontSize:"1.1rem"}}>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>

                        <Card style={{backgroundColor: product.countInStock>0?'green':"red"}}>
                            <ListGroup.Item>
                                <Row>
                                    <Col md={4}>
                                        Status: {product.countInStock>0?'In Stock':'Out of Stock'}
                                    </Col>
                                    <Col md={6}>
                                        <Row>
                                    <Button className="btn-block" type='button' disabled={product.countInStock===0}>
                                        Add to Cart
                                    </Button>
                                            </Row>        
                                    </Col>
                                </Row>
                                
                            </ListGroup.Item>
                        </Card>
                   
                    
               </Col>
           </Row> */}
    </>
  );
};

export default ProductScreen;
