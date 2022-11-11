import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import UsersAdd from "../../component/UsersAdd";

class UsersAddContainer extends React.Component {
  handleSubmit = async (values) => {
    let res = await this.props.usersAdd(values);
    if (!res.error) this.props.navigate("/");
  };

  handleUpdate = async (values) => {
    let res = await this.props.usersUpdate(values);
    if (!res.error) this.props.navigate("/");
  };

  componentDidMount() {
    if (this.props.params?.user_id) {
      this.props.getUniqueUsers({ user_id: this.props.params?.user_id });
    }
  }

  render() {
    const { unique_users_data, navigate, add_loading } = this.props;
    return (
      <Container maxWidth="lg" sx={{ paddingTop: 5 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {this.props.params?.user_id ? "Users Update" : "Users Add"}
            </Typography>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Go Back
            </Button>
          </Grid>
          <Grid item xs={12}>
            <UsersAdd
              add_loading={add_loading}
              addUsers={this.handleSubmit}
              updateUsers={this.handleUpdate}
              is_update={this.props.params?.user_id ? true : false}
              updateData={unique_users_data}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default UsersAddContainer;
