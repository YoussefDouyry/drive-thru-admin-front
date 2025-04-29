import React from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Dropdown,
  ProgressBar,
  ListGroup,
  Badge,
  Nav,
  Tab
} from 'react-bootstrap';
import { Bar, Doughnut, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Import des icônes
import { 
  BsThreeDotsVertical,
  BsArrowUp,
  BsArrowDown,
  BsPhone,
  BsWallet2,
  BsCreditCard
} from 'react-icons/bs';
import manWithLaptop from '../assets/img/illustrations/man-with-laptop-light.png';
import chartSuccess from '../assets/img/icons/unicons/chart-success.png';
import walletInfo from '../assets/img/icons/unicons/wallet-info.png';
import paypalIcon from '../assets/img/icons/unicons/paypal.png';
import { growthChartConfig, orderStatsConfig, totalRevenueConfig } from '../utils/chartconfig';
Chart.register(...registerables);

const Dashboard = () => {
  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        {/* Top Row */}
        <Row>
          {/* Congratulations Card */}
          <Col lg={8} className="mb-4 order-0">
            <Card>
              <div className="d-flex align-items-end row">
                <Col sm={7}>
                  <Card.Body>
                    <h5 className="card-title text-primary">Congratulations John! 🎉</h5>
                    <p className="mb-4">
                      You have done <span className="fw-bold">72%</span> more sales today.
                    </p>
                    <Button variant="outline-primary" size="sm">View Badges</Button>
                  </Card.Body>
                </Col>
                <Col sm={5} className="text-center text-sm-left">
                  <Card.Body className="pb-0 px-0 px-md-4">
                    <img src={manWithLaptop} height="140" alt="User" />
                  </Card.Body>
                </Col>
              </div>
            </Card>
          </Col>

          {/* Stats Cards */}
          <Col lg={4} className="order-1">
            <Row>
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img src={chartSuccess} alt="chart" className="rounded" />
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle variant="link">
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>View More</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <span className="fw-semibold d-block mb-1">Profit</span>
                    <h3 className="card-title mb-2">$12,628</h3>
                    <small className="text-success fw-semibold">
                      <BsArrowUp /> +72.80%
                    </small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} className="mb-4">
                <Card>
                  <Card.Body>
                    <div className="card-title d-flex align-items-start justify-content-between">
                      <div className="avatar flex-shrink-0">
                        <img src={walletInfo} alt="wallet" className="rounded" />
                      </div>
                      <Dropdown>
                        <Dropdown.Toggle variant="link">
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>View More</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <span>Sales</span>
                    <h3 className="card-title text-nowrap mb-1">$4,679</h3>
                    <small className="text-success fw-semibold">
                      <BsArrowUp /> +28.42%
                    </small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Middle Row */}
        <Row className="mb-4">
          {/* Total Revenue */}
          <Col lg={8} className="mb-4">
            <Card>
              <Card.Header>Total Revenue</Card.Header>
              <Card.Body style={{ height: '300px' }}>
                <Bar {...totalRevenueConfig} />
              </Card.Body>
            </Card>
          </Col>

          {/* Company Growth */}
          <Col lg={4} className="mb-4">
            <Card>
              <Card.Header>Company Growth</Card.Header>
              <Card.Body style={{ height: '300px' }}>
                <div className="d-flex flex-column h-100">
                  <div style={{ height: '150px' }}>
                    <Doughnut {...growthChartConfig} />
                  </div>
                  <div className="text-center fw-semibold pt-3 mb-2">
                    62% Company Growth
                  </div>
                  <div className="d-flex justify-content-around mt-auto">
                    <div>
                      <small>2022</small>
                      <h6 className="mb-0">$32.5k</h6>
                    </div>
                    <div>
                      <small>2021</small>
                      <h6 className="mb-0">$41.2k</h6>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Bottom Row */}
        <Row>
          {/* Order Statistics */}
          <Col md={6} lg={4} className="mb-4">
            <Card className="h-100">
              <Card.Header>Order Statistics</Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h2 className="mb-1">8,258</h2>
                    <small>Total Orders</small>
                  </div>
                  <div style={{ width: '100px', height: '100px' }}>
                    <Pie {...orderStatsConfig} />
                  </div>
                </div>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-0">Electronic</h6>
                      <small>Mobile, Earbuds, TV</small>
                    </div>
                    <span className="fw-bold">82.5k</span>
                  </ListGroup.Item>
                  {/* Add other list items similarly */}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Transactions */}
          <Col md={6} lg={8} className="mb-4">
            <Card>
              <Card.Header>Recent Transactions</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <img src={paypalIcon} alt="Paypal" width="32" className="me-3" />
                      <div>
                        <h6 className="mb-0">Paypal</h6>
                        <small>Send money</small>
                      </div>
                    </div>
                    <div className="text-success">
                      <h6 className="mb-0">+82.6 USD</h6>
                    </div>
                  </ListGroup.Item>
                  {/* Add other transactions similarly */}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;