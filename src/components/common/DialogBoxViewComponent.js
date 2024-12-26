import ButtonComponent from "../common/ButtonComponent";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DialogBoxViewComponent(props) {
  
  const { opendialog = false,
          onclosefunction,
          onconfirmfunction,
          alerttitle= 'Success!',
          alertmessagetext = 'Something groing wrong',
          okbuttontext = 'Confirm',
          fieldData
          } = props;

          console.log('fieldData',fieldData.recordData);     

  return (
 
    <Dialog
    open={opendialog}
    onClose={onclosefunction}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {alerttitle}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
       {alertmessagetext}
      </DialogContentText>
      <div>
      {Object.entries(fieldData.recordData).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
      </div>
    </DialogContent>
    <DialogActions>
      <ButtonComponent buttonLabel={okbuttontext} clickHandler={onconfirmfunction} buttonColor='secondary' />
    </DialogActions>
  </Dialog>


  );
}

export default DialogBoxViewComponent;
