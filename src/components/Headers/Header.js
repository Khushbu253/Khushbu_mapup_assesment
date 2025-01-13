/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import useGetVehicleData from "hooks/useGetVehicleData";
import { useEffect, useState } from "react";
import csvtojson from 'csvtojson';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import data from '../../assets/csvjson.json'

const Header = () => {

  const jsonData=useGetVehicleData()
  const totalUsers=data.length
  const getCities=()=>{
    const citydata=data.map((d)=>d.City)
    const cities=[...new Set(citydata)]
    return cities
  }
  const totalCities=getCities()

  const getCounties=()=>{
    const countiesdata=data.map((d)=>d.County)
    const counties=[...new Set(countiesdata)]
    return counties
  }
  const totalCounties=getCounties()

  const getBrands=()=>{
    const vehicleNameData=data.map((d)=>d.Make)
    const vehicles=[...new Set(vehicleNameData)]
    return vehicles
  }
  const totalBrands=getBrands()
  console.log(jsonData,"json dataaaaaaaa")
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
            <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalUsers}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      <i class="fas fa-smile"></i>
                      </span>{" "}
                      <span className="text-nowrap">Happy Users</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Counties
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalCounties.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                        <i class="fa-solid fa-location-dot"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      <i class="fas fa-smile"></i>
                      </span>{" "}
                      <span className="text-nowrap">Counties We Serve</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Cities
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalCities.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                        <i class="fa-solid fa-city"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      <i class="fas fa-smile"></i>
                      </span>{" "}
                      <span className="text-nowrap">Cities We Serve</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Brands
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalBrands.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                        <i class="fa-solid fa-car"></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                      <i class="fas fa-smile"></i>
                      </span>{" "}
                      <span className="text-nowrap">Total Brands we have</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
