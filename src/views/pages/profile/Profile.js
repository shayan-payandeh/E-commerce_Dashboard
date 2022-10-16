/* eslint-disable prettier/prettier */
import { CAvatar, CFormInput, CFormLabel, CFormSelect } from "@coreui/react";
import { Grid, List, ListItem } from "@material-ui/core";
import React from "react";
import avatar9 from "../../../assets/images/avatars/9.jpg";
import { Years, Months, Days } from "../../../api";
function Profile() {
  return (
    <>
      <form>
        <List>
          <Grid container spacing={4}>
            <Grid item md={4} xs={12}>
              <ListItem
                style={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CAvatar src={avatar9} size="xl" />
              </ListItem>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    First Name
                  </CFormLabel>
                  <CFormInput
                    defaultValue={"Shayan"}
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
                <Grid item md={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Last Name
                  </CFormLabel>
                  <CFormInput
                    defaultValue={"Developer"}
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
              </Grid>
              <br />
              <CFormLabel htmlFor="exampleFormControlInput1">Email</CFormLabel>
              <CFormInput
                defaultValue={"shayan.iker@gmail.com"}
                type="email"
                id="exampleFormControlInput1"
                placeholder=""
              />
              <br />
              <CFormLabel htmlFor="exampleFormControlInput1">
                Password
              </CFormLabel>
              <CFormInput
                defaultValue={"102030xxxx"}
                type="password"
                id="exampleFormControlInput1"
                placeholder=""
              />
              <br />
              <CFormLabel htmlFor="exampleFormControlInput1">Phone</CFormLabel>
              <CFormInput
                value={"0930817****"}
                type="text"
                id="exampleFormControlInput1"
                placeholder=""
              />
            </Grid>

            <Grid item md={7} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <CFormLabel>Gender</CFormLabel>
                  <CFormSelect
                    defaultValue={"Male"}
                    aria-label="Default select example"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </CFormSelect>
                </Grid>
                <Grid item md={6}>
                  <CFormLabel>Language</CFormLabel>
                  <CFormSelect aria-label="Default select example">
                    <option value="persian">Persian</option>
                    <option value="english">English</option>
                  </CFormSelect>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={3}>
                  <CFormLabel>Date of Birth</CFormLabel>
                  <CFormSelect aria-label="Default select example">
                    {Months.map((year, index) => (
                      <option key={index}>{year}</option>
                    ))}
                  </CFormSelect>
                </Grid>
                <Grid item md={3} style={{ marginTop: "8px" }}>
                  <CFormLabel></CFormLabel>
                  <CFormSelect aria-label="Default select example">
                    {Days.map((year, index) => (
                      <option key={index}>{year}</option>
                    ))}
                  </CFormSelect>
                </Grid>
                <Grid item md={3} style={{ marginTop: "8px" }}>
                  <CFormLabel></CFormLabel>
                  <CFormSelect aria-label="Default select example">
                    {Years.map((year, index) => (
                      <option key={index}>{year}</option>
                    ))}
                  </CFormSelect>
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2} style={{ marginTop: "-2px" }}>
                <Grid item md={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    YouTube
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
                <Grid item md={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    LinkedIn
                  </CFormLabel>
                  <CFormInput
                    value={"https://www.linkedin.com/feed/"}
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Twitter
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
                <Grid item md={6}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Facebook
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <CFormLabel htmlFor="exampleFormControlInput1">
                    Solgan
                  </CFormLabel>
                  <CFormInput
                    value={"Fast Code - Clean Code"}
                    type="text"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </List>
      </form>
    </>
  );
}

export default Profile;
