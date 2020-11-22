import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Slide
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import translate from '../../../translate';
import { useHistory } from 'react-router-dom';
import { useTheme } from "@material-ui/core/styles";
import AuthService from "../api-services/AuthService.js";
import { useUserService } from "../api-services/service/UserService.js";
import { useProjectService } from "../api-services/service/ProjectService.js";
import { useAdminService } from "../api-services/service/AdminService.js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InfoProjectTable = () => {
  const [project, setProject]         = useState({});
  const [location, setLocation]       = useState({});
  const [open, setOpen]               = useState(false);
  const [values, setValues]           = useState({'amount': 0, 'comment': ''});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage]               = useState(0);
  const [trans]                       = useState(translate);
  const history                       = useHistory();
  const theme                         = useTheme();
  const fullScreen                    = useMediaQuery(theme.breakpoints.down("sm"));
  const userAuth                      = AuthService.getCurrentUser();
  const { new_donate }                = useUserService();
  const { get_project }               = useProjectService();
  const { finishCollection }          = useAdminService();
  const [close, setClose]             = useState(false);
  const [msg, setMsg]                 = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    const projectId = history.location.state.id;
    console.log(userAuth.token);
    get_project(projectId, userAuth.token)
      .then((response) => {
        console.log(response);
        setProject(response);
        setLocation(response.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function donate() {
    const donation = {
      "amount": values.amount,
      "comment": values.comment,
      "idDonor": userAuth.id,
      "idProject": history.location.state.id,
    }
    
    new_donate(donation, userAuth.token)
      .then((response) => {
        setProject(response.data.project);
        setLocation(response.data.project.location);
      })
      .catch((error) => console.log(error));
    handleClose();
  };

  const handleClose = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const handleCloseProject = () => {
    close ? setClose(false) : setClose(true);
  }

  const handleAccept = () => {
    console.log(project);
    finishCollection(project, userAuth.token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  }

  function closeProject() {
    setClose(true);
  };

  return (
    <div className="w-100 overflow-auto">
      <Dialog
        open={close}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseProject}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {trans['Titles']['closeProject']}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {trans['Dialog']['reallyClose']}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProject} color="primary">
            {trans['Dialog']['cancel']}
          </Button>
          <Button onClick={handleAccept} color="primary">
            {trans['Dialog']['accept']}
          </Button>
        </DialogActions>
      </Dialog>
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['name']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['province']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['population']}</TableCell>
            <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['state']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['amountCollected']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['accumulatedPercentageCollected']}</TableCell>
            { userAuth.id == 1 ? 
              <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['close']}</TableCell> 
              : 
              <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['donate']}</TableCell>
            }  
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow key={project.id}>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {project.name}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {location.province}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {location.population}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={1} align="center">
                {location.state ? (
                  <small className="border-radius-4 bg-green text-white px-8 py-2 ">
                    {trans['Tables']['active']}
                  </small>) : (
                  <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                    {trans['Tables']['finished']}
                  </small>)}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                    {trans['coin']}{project.collection}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {project.percentage === 100 ? (
                  <small className="border-radius-4 bg-green text-white px-8 py-2 ">
                    {Math.ceil(project.percentage).toFixed(2)}%
                  </small>
                ) : (
                  project.percentage < 20 ? (
                    <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                      {Math.ceil(project.percentage).toFixed(2)}%
                    </small>
                  ) : (
                    <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                      {Math.ceil(project.percentage).toFixed(2)}%
                    </small>
                  )
                )}
            </TableCell>
            {userAuth.id == 1 ?
              <TableCell className="px-0" colSpan={1} align="center">
                <IconButton onClick={() => closeProject()}>
                  {project.percentage === 100 ? (
                      <Icon className="icon-table-green">check_circle</Icon>
                    ) : (
                      project.percentage < 20 ? (
                          <Icon color="error">check_circle</Icon>
                        ) : (
                          <Icon color="secondary">check_circle</Icon>
                        )
                  )}
                </IconButton>
              </TableCell> : 
              <TableCell className="px-0" colSpan={1} align="center">
                <Button hidden onClick={handleClose}>
                  <Icon color="primary">payment</Icon>
                </Button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {trans['Dialog']['title']}
                    </DialogTitle>
                    <DialogContent>
                      <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">{trans['Dialog']['amount']}</InputLabel>
                        <FilledInput
                          id="filled-adornment-amount"
                          value={values.amount}
                          onChange={handleChange('amount')}
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        />
                      </FormControl>
                      <FormControl variant="filled">
                        <InputLabel htmlFor="filled-adornment-amount">{trans['Dialog']['comment']}</InputLabel>
                        <FilledInput
                          id="filled-adornment-amount"
                          value={values.comment}
                          onChange={handleChange('comment')}
                        />
                      </FormControl>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        {trans['Dialog']['cancel']}
                      </Button>
                      <Button onClick={() => donate()} color="primary" autoFocus>
                        {trans['Tables']['donate']}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
            }
          </TableRow>
        </TableBody>
      </Table>
      {/* <div className="py-12" />
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['nickname']}</TableCell>
            <TableCell className="px-0">{trans['Tables']['donation']}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donors
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((donor, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {donor.nickname}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {trans['coins']}{donor.donation}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-16"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={donors.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": trans['Tables']['previousPage']
        }}
        nextIconButtonProps={{
          "aria-label": trans['Tables']['nextPage']
        }}
        backIconButtonText={trans['Tables']['previousPage']}
        nextIconButtonText={trans['Tables']['nextPage']}
        onChangePage={handleChangePage}
        labelRowsPerPage={trans['Tables']['rowsPerPage']}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </div> 
  );
};

export default InfoProjectTable;
