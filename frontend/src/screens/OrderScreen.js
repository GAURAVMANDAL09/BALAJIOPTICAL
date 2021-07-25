import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import { Link } from "react-router-dom";
import Loader from "../components/Loader.js";
import { deliverOrder, getOrderDetails } from "../actions/orderActions.js";
import { ORDER_DELIVER_RESET } from "../constants/orderConstants.js";

export const OrderScreen = ({ match }) => {

  const orderId = match.params.id;

  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  // order pay


  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {

    //calculating prices
    order.itemsPrice = addDecimals(order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty, 0)
    )
  }



  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);


  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }



  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order<div style={{ wordBreak: "break-word" }}>{order._id}</div></h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <div> <strong>Name: </strong>{order.user.name} </div>
              <div><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a> </div>
              <div>
                <strong>Address:</strong> {order.shippingAddress.address}{" "}
                {order.shippingAddress.city}, {order.shippingAddress.pincode}
              </div>
              <p>
                <strong>Mobile No:</strong> {order.shippingAddress.mobile}{" "}
              </p>

              {order.isDelivered ? <Message variant="success">Delivered On {order.deliveredAt}</Message> :
                <Message variant='danger'>Not Shipped</Message>}

            </ListGroup.Item>



            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? <Message variant="success">Paid On {order.paidAt}</Message> :
                <Message variant='danger'>Payment Pending</Message>}
              <p>Note: Invoice will be recieved via Email with in next 5 working days of successful payment date</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ₹{item.price} = ₹{addDecimals(item.qty * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>₹ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>GST (18%)</Col>
                  <Col>₹ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    Shipping
                    <div style={{ marginBottom: ".0rem", fontSize: ".6rem" }}>
                      (Above ₹1000 Free Delivery)
                    </div>
                  </Col>
                  <Col>₹ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>₹{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {loadingDeliver && <Loader></Loader>}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  <Button type='button' className='btn btn-block' onClick={deliverHandler}>
                    Mark as Deliver
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
