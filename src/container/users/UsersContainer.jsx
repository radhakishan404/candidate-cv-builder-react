import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import UsersTable from "../../component/UsersTable";

class UsersContainer extends React.Component {
  getUsersData() {
    this.props.usersGetList({ params: this.props.users_meta });
  }

  componentDidMount() {
    this.getUsersData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users_meta !== this.props.users_meta) {
      this.getUsersData();
    }
  }

  handleSearch(val) {
    this.props.setUsersMeta({ meta: { search: val } });
  }

  handleEdit(id) {
    this.props.navigate("/add-user/" + id);
  }

  render() {
    const {
      users_data_loading,
      users_data,
      users_meta,
      users_data_count,
      setUsersMeta,
      navigate,
    } = this.props;

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
            <Typography variant="h6">Users List</Typography>
            <Grid>
              <TextField
                sx={{ marginRight: 2 }}
                hiddenLabel
                id="filled-hidden-label-small"
                placeholder="Search here..."
                size="small"
                type={"search"}
                onChange={(e) => this.handleSearch(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() => navigate("/add-user")}
              >
                Add Users
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <UsersTable
              users_data={users_data}
              users_data_loading={users_data_loading}
              users_meta={users_meta}
              users_data_count={users_data_count}
              setUsersMeta={(d) => setUsersMeta(d)}
              getUsersData={() => this.getUsersData()}
              edit={(id) => this.handleEdit(id)}
            />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default UsersContainer;
