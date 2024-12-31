import React, { useState, useEffect } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import TopAdminBarComponents from "./common/TopAdminBarComponents";
import AdminSideMenuComponents from "./common/AdminSideMenuComponents";
import { getAdminContacts,deleteAdminCantact } from "../../services/apiService";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import DialogBoxComponent from "../common/DialogBoxComponent";
import DialogBoxViewComponent from "../common/DialogBoxViewComponent";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextInputComponent from "../common/TextInputComponent";
import AlertComponent from '../common/AlertComponent';



function AdminContactsData() {


  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      sortable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      sortable: true,
    },
    {
        field: "subject",
        headerName: "Subject",
        width: 350,
        sortable: true,
      },
    {
      field: "createdAt",
      headerName: "Created on",
      sortable: true,
      width: 250,
    },
    {
      field: "updatedAt",
      headerName: "Updated on",
      sortable: true,
      width: 250,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
         
          <Tooltip title="Delete">
            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Record">
            <IconButton
              color="primary"
              onClick={() => handleView(params.id)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>


        </div>
      ),
    },
  ];

  const [userData, setuserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogViewOpen, setDialogViewOpen] = useState(false);
  const [operationId, setOperationId] = useState(0);

  
  const [dialogPassordOpen, setDialogPassordOpen] = useState(false);
  const [recordData, setRecordData] = useState({});
  

  const [alertData, setAlertData] = useState({
    alert_show: false,
    alert_message: "",
    alert_title: "",
    alert_type: "",
  });

  useEffect(() => {
    // Simulate a data fetch with a timeout
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await getAdminContacts();
      if (response) {
        if (response.success === true) {
          setuserData(response.data);
          setLoading(false);
        } else {
          setAlertData(() => ({
            alert_show: true,
            alert_message: response.message,
            alert_title: "Failed!",
            alert_type: "error",
          }));
          setLoading(false);
        }
      }
    } catch (err) {
      setAlertData(() => ({
        alert_show: true,
        alert_message: err.message,
        alert_title: "Failed!",
        alert_type: "error",
      }));
      setuserData([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserData = async () => {
    setLoading(true);
    try {
      const apiData = {id:operationId};
      const response = await deleteAdminCantact(apiData);
      if (response) {
        if (response.success === true) {
          setAlertData(() => ({
            alert_show: true,
            alert_message: response.message,
            alert_title: "Success!",
            alert_type: "success",
          }));
          setLoading(false);
          getUserData()
        } else {
          setAlertData(() => ({
            alert_show: true,
            alert_message: response.message,
            alert_title: "Failed!",
            alert_type: "error",
          }));
          setLoading(false);
        }
      }
    } catch (err) {
      setAlertData(() => ({
        alert_show: true,
        alert_message: err.message,
        alert_title: "Failed!",
        alert_type: "error",
      }));
      setuserData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate('/admin/update_page/'+id);
  };


  

  const handleView = (id) => {

    const matchedRecord = userData.find(record => record.id === id);
    
    
    setDialogViewOpen(true);
    setRecordData(matchedRecord);
  };

  const confirmClose = () => {
    setDialogViewOpen(false);
  };



  const handleDelete = (id) => {
    setDialogOpen(true);
    setOperationId(id);
    
    // Implement your delete logic here
  };

  const confirmDelete = () => {
    
    setDialogOpen(false);
    deleteUserData();
  };

  const cancelFunction = () => {
    setDialogOpen(false);
    setOperationId(0);
  };



  

  const addUser = () => {
    navigate('/admin/create_page');
  };

  const handleUpdatePassword = (id) => {
    setDialogPassordOpen(true);
    setOperationId(id);
    
    // Implement your delete logic here
  };








  return (
    
    <Box sx={{ display: "flex" }}>
      
      <DialogBoxComponent opendialog={dialogOpen}  oncancelfunction={cancelFunction} onconfirmfunction={confirmDelete} alerttitle="Are you sure?" alertmessagetext="Are you sure, you want to delete this record ?" okbuttontext="Yes, Delete" cancelbuttontext="No, cancel"    />

      <DialogBoxViewComponent opendialog={dialogViewOpen}  onconfirmfunction={confirmClose} alerttitle="View Full record" alertmessagetext="Here is the full detail of record" okbuttontext="Okay!" fieldData={{recordData}}   />

     


      <TopAdminBarComponents />
      <AdminSideMenuComponents />
      <Box></Box>     
      <Box sx={{ marginTop: 10, display: "flex", marginLeft:2 }}  display="flex" justifyContent="center" alignItems="center" >
      
       {loading ? (
        <CircularProgress color="primary" size={60} thickness={5} />
      ) : (
        <>
        <Fab color="secondary" aria-label="add" onClick={addUser}>
        <AddIcon />
        </Fab>

        <DataGrid
          rows={userData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        </>
      
      )}
      
      </Box>
     


      
    </Box>
  );
}
export default AdminContactsData;
