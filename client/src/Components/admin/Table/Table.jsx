import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

// Function to create sample data rows
function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}

// Sample data rows
const rows = [
  createData("Lasania Chicken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Bazaar Bang", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshener", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

// Function to determine cell background and text color based on status
const makeStyle = (status) => {
  switch (status) {
    case "Approved":
      return {
        background: "rgb(145 254 159 / 47%)",
        color: "green",
      };
    case "Pending":
      return {
        background: "#ffadad8f",
        color: "red",
      };
    default:
      return {
        background: "#59bfff",
        color: "white",
      };
  }
};

// Component rendering the table
export default function BasicTable() {
  return (
    <div className="Table">
      <h3>Quản lý đơn hàng</h3>
      {/* <TableContainer
        component={Paper}
        sx={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Tracking ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.trackingId}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
}
