// import React from "react";
// import { useState } from "react";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import sdevImage from "./assets/sdevCropped.jpg";
import cv from "./assets/resume/Samarth Dev's Resume.pdf";

// about imports
import { Container, Row, Col } from "react-bootstrap";
import {
  meta,
  introdata,
  dataabout,
  dataportfolio,
  worktimeline,
  workExperience,
  researcherExperience,
  contactConfig,
  volunteeringExperience,
} from "./content.tsx";

function App() {
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 text-container">
                <div className="align-self-center">
                  <div className="intro mx-auto">
                    {/* Importing the self portrait to the front page */}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <img
                      alt="Samarth Portrait Image"
                      src={sdevImage}
                      style={{
                        width: "128px",
                        height: "128px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Titles and descriptions */}
                    <h1 className="mb-1x">{introdata.title}</h1>
                    <h3 className="mb-1x">{introdata.title2}</h3>
                    <br />
                    <h1 className="fluidz-48 mb-1x">
                      {/* Writing animation on the front page of the website */}
                      <Typewriter
                        options={{
                          strings: [
                            introdata.animated.first,
                            introdata.animated.second,
                            introdata.animated.third,
                            introdata.animated.fourth,
                            introdata.animated.fifth,
                            introdata.animated.sixth,
                            introdata.animated.seventh,
                          ],
                          autoStart: true,
                          loop: true,
                          deleteSpeed: 5,
                        }}
                      />
                    </h1>
                    <br />
                    <p className="mb-1x">{introdata.description}</p>
                    <p className="mb-1x">{introdata.description2}</p>
                    {/* paragraph element is for the links */}
                    <p className="mb-1x">
                      <u>
                        <a href={cv} target="_blank" rel="noopener noreferrer">
                          CV
                        </a>
                      </u>{" "}
                      /{" "}
                      <a href="mailto:samarthdev138@gmail.com">
                        <u>email</u>
                      </a>{" "}
                      /{" "}
                      <a href="https://github.com/sdev138">
                        <u>github</u>
                      </a>{" "}
                      /{" "}
                      <a href="https://www.linkedin.com/in/samarth-dev">
                        <u>linkedin</u>
                      </a>{" "}
                      /{" "}
                      <a href="https://bsky.app/profile/samarthdev.bsky.social">
                        <u>bluesky</u>
                      </a>{" "}
                      /{" "}
                      <a href="https://x.com/chinnu_chan_">
                        <u>twitter</u>
                      </a>{" "}
                      /{" "}
                      <a href="https://scholar.google.com/citations?user=ByJ5jz4AAAAJ&hl=en">
                        <u>google scholar</u>
                      </a>
                    </p>
                  </div>
                </div>
                {/*  this is for col-6 */}
                <div className="col-lg-6 image-container"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Past the homepage. Here is the timeline or CV */}
      {/* All of the content appears at the very left */}
      <section id="experiences" className="experiences">
        <Container className="About-header">
          <Helmet>
            <meta charSet="utf-8" />
            <title> About | {meta.title}</title>
            <meta name="description" content={meta.description} />
          </Helmet>
          {/* About Me title */}
          {/* <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4">About me</h1>
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row> */}
          {/* Education (University) */}
          <Row className=" sec_sp">
            <Col lg={5}>
              <h3 className="color_sec py-4">
                <a
                  href="https://www.asu.edu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  education
                </a>
              </h3>
            </Col>
            <Col lg={7}>
              <table className="table caption-top">
                <tbody>
                  {worktimeline.map((data, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{data.jobtitle}</th>
                        <td>{data.where}</td>
                        <td>{data.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Col>
          </Row>
          {/* Work Experience */}
          <Row className="sec_sp">
            <Col lg={5}>
              <h3 className="color_sec py-4">work experience</h3>
            </Col>
            <Col lg={7}>
              {workExperience.map((data, i) => {
                return (
                  <div className="service_ py-4" key={i}>
                    <h5 className="service__title">{data.title}</h5>
                    <p className="service_desc">{data.period}</p>
                    <p className="service_desc">{data.description}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
          {/* Research Experience */}
          <Row className="sec_sp">
            <Col lg={5}>
              <h3 className="color_sec py-4">research experience</h3>
            </Col>
            <Col lg={7}>
              {researcherExperience.map((data, i) => {
                return (
                  <div className="service_ py-4" key={i}>
                    <h5 className="service__title">{data.title}</h5>
                    <p className="service_desc">{data.period}</p>
                    <p className="service_desc">{data.description}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
          {/* Volunteering Experience */}
          <Row className="sec_sp">
            <Col lg={5}>
              <h3 className="color_sec py-4">volunteering</h3>
            </Col>
            <Col lg={7}>
              {volunteeringExperience.map((data, i) => {
                return (
                  <div className="service_ py-4" key={i}>
                    <h5 className="service__title">{data.title}</h5>
                    <p className="service_desc">{data.period}</p>
                    <p className="service_desc">{data.description}</p>
                  </div>
                );
              })}
            </Col>
          </Row>
          {/* Research Interests */}
          <Row className="sec_sp">
            <Col lg={5}>
              <h3 className="color_sec py-4">{dataabout.title}</h3>
            </Col>
            <Col lg={7} className="d-flex align-items-center">
              <div>
                <p>{dataabout.aboutme}</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* Projects sections */}
      <section id="projects" className="experiences">
        <Container className="About-header">
          <Row className="sec-sp">
            <Col lg={5}>
              <h2 className="color_sec py-4">projects</h2>
            </Col>
          </Row>
        </Container>
        {/* <Col lg={5}>
          <ul><h2 className="color_sec py-4">Projects</h2></ul>
        </Col> */}
        <Col lg={7} className="d-flex align-items-center">
          <div className="projects-grid">
            {dataportfolio.map((project, index) => (
              <div
                key={index}
                className="project-card"
                onClick={() => window.open(project.url, "_blank")}
              >
                <h3>{project.title}</h3>
                {/* Would probably delete, trying to install image */}
                <img
                  src={project.image}
                  alt="repo image"
                  className="repo-image"
                />
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Col>
      </section>
      <br />
      <br />
      <p className="projects-grid">{contactConfig.description}</p>
      <br />
      <br />
      <br />
    </HelmetProvider>
  );
}

export default App;
