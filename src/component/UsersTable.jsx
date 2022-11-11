import React from "react";
import {
  Button,
  Card,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { api_users_delete } from "../store/common/commonApi";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../store/common/commonSlice";
import { Link } from "react-router-dom";
import { baseUrl } from "../helpers/constants";

export default function UsersTable({
  users_data,
  users_meta,
  setUsersMeta,
  users_data_loading,
  users_data_count,
  getUsersData,
  edit,
}) {
  const dispatch = useDispatch();
  const handlePerPageChange = (val) => {
    setUsersMeta({ meta: { perPage: val } });
  };

  const handlePageChange = (val) => {
    setUsersMeta({ meta: { page: val } });
  };

  const handleDelete = async (id) => {
    let res = await api_users_delete(id);
    if (res.success) {
      dispatch(
        setSnackBar({
          open: true,
          message: res.message,
          severity: "info",
        })
      );
      getUsersData();
    }
  };

  console.log(users_data, "users_data");

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users_data_loading ? (
            <CircularProgress />
          ) : (
            users_data.map((val, key) => (
              <TableRow key={key}>
                <TableCell>
                  <img src={val.profile} alt={`${val.name}`} width="100" />
                </TableCell>
                <TableCell
                  onClick={() =>
                    window.open(baseUrl + "/public/" + val._id + ".pdf")
                  }
                  style={{cursor: "pointer"}}
                >
                  {val.name}
                </TableCell>
                <TableCell>{val.professional_title}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() =>
                      window.open(baseUrl + "/public/" + val._id + ".pdf")
                    }
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        onPageChange={(e, val) => handlePageChange(val)}
        page={users_meta.page}
        count={users_data_count}
        rowsPerPage={users_meta.perPage}
        onRowsPerPageChange={(e) => handlePerPageChange(e.target.value)}
      />
    </Card>
  );
}
