import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Pagination, PaginationItem } from '@mui/material';
import { AlignItems, DisplayFlex, SpaceBetween } from '../StyledComponent/headerStyle';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import PreviewIcon from '@mui/icons-material/Preview';
import ReadModal from './ReadModal';

// Custom pagination component
const CustomPagination = ({ page, pageCount, onPageChange }) => {
  return (
    <AlignItems>
      <Pagination
        count={pageCount}
        page={page + 1}  // Adjust for 1-based page index display
        onChange={(event, value) => onPageChange(value - 1)}  // Adjust for 0-based page state
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              margin: "0 4px",  // Margin between pagination items
              minWidth: "28px",
              width: "28px",
              height: "28px",
              backgroundColor: "#D6D6D6",  // Default background for pagination items
              "&.Mui-selected": {
                backgroundColor: "#1e76e9",  // Selected item background
                color: "white",
              },
              "&.MuiPaginationItem-previousNext": {
                border: "none",
                color: "var(--primary-text-color)",  // Color for next/prev items
                backgroundColor: "transparent",
              },
            }}
          />
        )}
      />
    </AlignItems>
  );
};

// Main TodoTable component
const TodoTable = ({ data, handleEdit, handleDelete, toggleCompleteStatus }) => {
  const [page, setPage] = useState(0);  // Manage page number state
  const pageSize = 10;  // Number of rows per page
  const pageCount = Math.ceil(data.length / pageSize);  // Calculate total pages based on data length
  const [selectedRow, setSelectedRow] = useState(null); // State for storing the selected row data
  const [open, setOpen] = useState(false)

  const handlePageChange = (newPage) => {
    setPage(newPage);  // Update page number when the user clicks on a different page
  };

  const handleRowClick = (params) => {
    // console.log(params)
    setSelectedRow(params);  // Store the clicked row's data in state
    setOpen(true)
  };

  const handleClose = () =>{
    setOpen(false)
  }

  // Column definitions for the DataGrid
  const columns = [
    { field: "title", headerName: "Title", flex: 1 },  // Title column, flexible width
    { field: "description", headerName: "Description", flex: 3 },  // Description column, flexible width
    {
      field: "completed",
      headerName: "Completed",  // "Completed" column header
      flex: 0.75,  // Flex value to adjust width
      renderCell: (params) => (
        // Icon button for toggling task completion
        <IconButton
          onClick={() => toggleCompleteStatus(params.row.uuid, params.row.completed)}  // Toggle task completion on click
          color={params.row.completed ? "success" : "default"}  // Change color based on completion status
        >
          {params.row.completed ? <CheckCircleIcon style={{color: "var(--checkbox-color)"}} /> : <RadioButtonUncheckedIcon style={{color: "var(--primary-text-color)"}} />}
        </IconButton>
      ),
    },
    {
      field: "duedate",  // Column for task due date
      headerName: "Due Date",
      flex: 1,
      renderCell: (params) => {
        const dueDate = new Date(params.row.duedate);  // Convert due date to a Date object

        // Format the date to yyyy-MM-dd
        const year = dueDate.getUTCFullYear();
        const month = String(dueDate.getUTCMonth() + 1).padStart(2, '0');  // Adjust for zero-indexed months
        const day = String(dueDate.getUTCDate()).padStart(2, '0');

        return <span>{`${year}-${month}-${day}`}</span>;  // Display the formatted due date
      }
    },
    {
      field: "actions",  // Actions column with edit and delete options
      headerName: "Actions",
      flex: 0.75,
      renderCell: (params) => (
        <DisplayFlex>
          <IconButton
            onClick={() => handleEdit(params.row.uuid)}  // Trigger the edit function when clicked
            sx={{
              color: "#4CAF50",  // Green color for edit button
              "&:hover": { backgroundColor: "#A5D6A7" },  // Hover effect
            }}
            disabled={params.row.completed}
          >
            <EditIcon />  {/* Edit icon */}
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.row.uuid)}  // Trigger the delete function when clicked
            sx={{
              color: "#F44336",  // Red color for delete button
              "&:hover": { backgroundColor: "#FFCDD2" },  // Hover effect
            }}
          >
            <DeleteIcon />  {/* Delete icon */}
          </IconButton>
          <IconButton
            onClick={() => handleRowClick(params.row)}  // Trigger the delete function when clicked
            sx={{
              color: "#1e76e9",  // Red color for delete button
              "&:hover": { backgroundColor: "#47ccff" },  // Hover effect
            }}
          >
            <PreviewIcon />  {/* Delete icon */}
          </IconButton>
        </DisplayFlex>
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={data.slice(page * pageSize, (page + 1) * pageSize)}  // Paginate the rows based on current page
        columns={columns}
        pageSize={pageSize}  // Set the page size
        rowsPerPageOptions={[5, 10]}  // Allow user to select page sizes of 5 or 10 rows
        headerHeight={40}  // Height of the column headers
        rowHeight={50}  // Height of each row
        hideFooterPagination  // Hide default pagination (handled by CustomPagination)
        getRowId={(row) => row.uuid}  // Use 'uuid' as a unique row identifier
        sx={{
          overflow: "clip",  // Prevent overflow of table content
          marginTop: "50px",  // Top margin for table
          marginBottom: "30px",  // Bottom margin for table
          "& .MuiDataGrid-columnHeaders": { fontSize: "18px" },  // Font size for column headers
          "& .MuiDataGrid-cell": {
            backgroundColor: "transparent",  // Transparent background for cells
            color: "var(--primary-text-color)",  // Text color
            "&:focus": {
                outline: "none",  // Removes the focus outline (border when clicked)
              },
            },
            "& .MuiDataGrid-root": {
              "& .Mui-selected": {
                outline: "none",  // Removes the selection border on the row
              },
            },
            "& .MuiDataGrid-footerContainer": {
              display: "none",  // Hide the footer completely
            },
          }
        }
      />
      <SpaceBetween>
        {/* Render the custom pagination */}
        <CustomPagination
          page={page}
          pageCount={pageCount}
          onPageChange={handlePageChange}
        />
        <span style={{ paddingRight: "10px" }}>
          <b>Total:</b> {data?.length} todos  {/* Display total number of todos */}
        </span>
      </SpaceBetween>

      <ReadModal open={open} handleClose={handleClose} selectedRow={selectedRow} />
    </>
  );
};

export default TodoTable;
