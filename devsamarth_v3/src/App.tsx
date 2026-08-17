// import React from "react";
// import { useState } from "react";
import "./App.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import sdevImage from "./assets/sdevCropped.jpg";
import cv from "./assets/resume/Samarth Dev's Resume.pdf";

// about imports
import { Container } from "react-bootstrap";
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
          {/* Education (University) */}
          <div className="sec_sp">
            <h3 className="color_sec">
              <a
                href="https://www.asu.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                education
              </a>
            </h3>
            {worktimeline.map((data, i) => {
              return (
                <div className="experience-entry" key={i}>
                  <h5 className="experience-entry__title">{data.jobtitle}</h5>
                  <p className="experience-entry__period">
                    {data.where} &middot; {data.date}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Work Experience */}
          <div className="sec_sp">
            <h3 className="color_sec">work experience</h3>
            {workExperience.map((data, i) => {
              return (
                <div className="experience-entry" key={i}>
                  <h5 className="experience-entry__title">{data.title}</h5>
                  <p className="experience-entry__period">{data.period}</p>
                  <p className="experience-entry__desc">{data.description}</p>
                </div>
              );
            })}
          </div>
          {/* Research Experience */}
          <div className="sec_sp">
            <h3 className="color_sec">research experience</h3>
            {researcherExperience.map((data, i) => {
              return (
                <div className="experience-entry" key={i}>
                  <h5 className="experience-entry__title">{data.title}</h5>
                  <p className="experience-entry__period">{data.period}</p>
                  <p className="experience-entry__desc">{data.description}</p>
                </div>
              );
            })}
          </div>
          {/* Volunteering Experience */}
          <div className="sec_sp">
            <h3 className="color_sec">volunteering</h3>
            {volunteeringExperience.map((data, i) => {
              return (
                <div className="experience-entry" key={i}>
                  <h5 className="experience-entry__title">{data.title}</h5>
                  <p className="experience-entry__period">{data.period}</p>
                  <p className="experience-entry__desc">{data.description}</p>
                </div>
              );
            })}
          </div>
          {/* Research Interests */}
          <div className="sec_sp">
            <h3 className="color_sec">{dataabout.title}</h3>
            <p className="experience-entry__desc">{dataabout.aboutme}</p>
          </div>
        </Container>
      </section>
      {/* Projects sections */}
      <section id="projects" className="experiences">
        <Container className="About-header">
          <div className="projects-heading">
            <h2 className="color_sec">projects</h2>
          </div>
          <div className="project-pods">
            {dataportfolio.map((project) => (
              <article className="project-pod" key={project.url}>
                <div className="project-pod__content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="project-pod__tech">
                    {project.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="project-pod__cta"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} project in a new tab`}
                >
                  <span>View project</span>
                  <span className="project-pod__arrow" aria-hidden="true">
                    &gt;
                  </span>
                </a>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <br />
      <br />
      <p>{contactConfig.description}</p>
      <br />
      <br />
      <br />
    </HelmetProvider>
  );
}

export default App;
