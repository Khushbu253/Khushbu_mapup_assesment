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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Modal,
  Typography,
  Box,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import data from '../assets/csvjson.json'
import Header from "components/Headers/Header.js";

const Index = (props) => {

  const [isInfo,setIsInfo]=useState(false)
  const [currentModelData,setCurrentModelData]=useState([])
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");


  const toggle = () => setIsInfo(!isInfo);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const lineChartDataSet=data.map((d)=>d["Model Year"])
  const linechartLabel=data.map((d)=>d["Electric Range"])

 
  const lineChartData={
    labels: ['1998','2002','2010','2012','2014','2016','2018','2020','2022','2024'],
    datasets: [{
      data: linechartLabel,
    }]
  };

  const lineChartOptions = {
    // responsive: true,
    // plugins: {
    //   legend: {
    //     display: true,
    //   },
    //   title: {
    //     display: true,
    //     text: "Monthly Sales Data", // Main chart title
    //   },
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months", // X-axis label
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales (in USD)", // Y-axis label
        },
      },
    },
  };

  const type1=data.filter((d)=>d["Electric Vehicle Type"]==="Battery Electric Vehicle (BEV)")
  const type2=data.filter((d)=>d["Electric Vehicle Type"]==="Plug-in Hybrid Electric Vehicle (PHEV)")
  const pieChartData={
   labels:[
      'Battery Electric Vehicle (BEV)',
      'Plug-in Hybrid Electric Vehicle (PHEV)'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [type1.length,type2.length],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }

  const topSellingData=()=>{
    const vehicleNameData=data.map((d)=>d.Make)
    const vehicles=[...new Set(vehicleNameData)]
    const topSellingVehicleData=vehicles.map((v)=>({vehicleName:v,sales:0,per:0}))
    data.map((d)=>{
      topSellingVehicleData.map((data)=>{
        if(data.vehicleName===d.Make){
          data.sales=data.sales+1
        }
      })
    })
    topSellingVehicleData.sort((a,b)=>b.sales-a.sales)
      // add percentage
      const totalSales=topSellingVehicleData.reduce((a,d)=>a+d.sales,0)
     
      data.map((d)=>{
        topSellingVehicleData.map((data)=>{
          if(data.vehicleName===d.Make){
            data.per=(data.sales*100/totalSales).toFixed(2)
          }
        })
      })
      
    return topSellingVehicleData

  }
  const topSellingTableData=topSellingData()

  const topSellingCounties=()=>{
    const countydata=data.map((d)=>d.County)
    const counties=[...new Set(countydata)]
    const topCounties=counties.map((c)=>({countyName:c,sales:0}))
    data.map((d)=>{
      topCounties.map((data)=>{
        if(data.countyName===d.County){
          data.sales=data.sales+1
        }
      })
    })
    topCounties.sort((a,b)=>b.sales-a.sales)
    return topCounties
  }

  const countyTableData=topSellingCounties()

  const handleIconClick=(e,d)=>{
      e.preventDefault()
      setIsInfo(true)
      const clickedVehicleData=data.filter((record)=>record.Make===d.vehicleName)
      const modelsData=clickedVehicleData.map((d)=>d.Model)
      const models=[...new Set(modelsData)]
      const topModels=models.map((m)=>({modelName:m,sales:0,per:0}))
      data.map((d)=>{
        topModels.map((data)=>{
          if(data.modelName===d.Model){
            data.sales=data.sales+1
          }
        })
      })
      topModels.sort((a,b)=>b.sales-a.sales)

      //add percentage
      const totalSales=d.sales
      data.map((d)=>{
        topModels.map((data)=>{
          if(data.modelName===d.Model){
            data.per=(data.sales*100/totalSales).toFixed(2)
          }
        })
      })
      setCurrentModelData({vehicleName:d.vehicleName,data:topModels})
      console.log(topModels,"clicked data")
      
  }
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="text-white mb-0">Sum of Electric Range By Model Year</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={lineChartData}
                    options={lineChartOptions}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Breakdown of Electric vehicle type</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Pie
                    data={pieChartData}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
        
          <Col xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Top Selling Vehicles</h3>
                   
                  </div>
                  <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                      </Button>
                       {/* <div><i class="fa-solid fa-circle-info" ></i> <p>for Model Information</p></div> */}
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Vehicle Name</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {topSellingTableData.slice(0,10).map((data)=>
                  <tr>
                  <th scope="row">{data.vehicleName}{"  "} <a href="#" onClick={(e)=>handleIconClick(e,data)}>
                  <i class="fa-solid fa-circle-info" ></i>
                    </a></th>
                  <td>{data.sales}</td>
                  
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">{data.per}</span>
                       <div>
                        <Progress
                          max="100"
                          value={data.per}
                          barClassName="bg-gradient-danger"
                        />
                      </div>
                    </div>
                  </td>
                </tr> )}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Top Selling Counties</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">County Name</th>
                    <th scope="col">Sales</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {countyTableData.slice(0,10).map((data)=>
                  <tr>
                  <th scope="row">{data.countyName}</th>
                  <td>{data.sales}</td>
                 
                </tr> )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={isInfo} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>{currentModelData.vehicleName} Sales Information</ModalHeader>
        <ModalBody>
        <Col xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">{currentModelData.vehicleName} Models</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Model Name</th>
                    <th scope="col">Sales</th>
                    <th scope="col">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {currentModelData?.data?.map((d)=>
                  <tr>
                  <th scope="row">{d.modelName}</th>
                  <td>{d.sales}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className="mr-2">{d.per}</span>
                       <div>
                        <Progress
                          max="100"
                          value={d.per}
                          barClassName="bg-gradient-danger"
                        />
                      </div>
                    </div>
                  </td>
                </tr> )}
                </tbody>
              </Table>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
      </Container>
    </>
  );
};

export default Index;
