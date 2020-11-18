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
  Button,
  FormControl,
  FilledInput,
  InputLabel,
  InputAdornment
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import translate from '../../../translate';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@material-ui/core/styles";
import AuthService from "../api-services/AuthService.js";
import { useUserService } from "../api-services/service/UserService.js"
import { useProjectService } from "../api-services/service/ProjectService.js"

const donors = [
  {
    nickname: "Donor1",
    donation: 1000,
  },
  {
    nickname: "El Donador",
    donation: 4000,
  },
  {
    nickname: "The Donor",
    donation: 2000,
  },
  {
    nickname: "Bill Gates",
    donation: 100,
  },
  {
    nickname: "Ion Hazzikostas",
    donation: 9000,
  },
  {
    nickname: "Satoshi Tajiri",
    donation: 9000,
  },
  {
    nickname: "Shigeru Mishamoto",
    donation: 9000,
  }
];

const InfoProjectTable = () => {
  const [projects, setProjects]                           = useState([]);
  const [open, setOpen]                                 = useState(false);
  const [collection, setCollection]                     = useState(0);
  const [percentage, setPercentage]                     = useState(0);
  const [values, setValues]                             = useState({'amount': 0, 'comment': ''});
  const [rowsPerPage, setRowsPerPage]                   = useState(5);
  const [page, setPage]                                 = useState(0);
  const [trans]                                         = useState(translate);
  const history                                         = useHistory();
  const theme                                           = useTheme();
  const fullScreen                                      = useMediaQuery(theme.breakpoints.down("sm"));
  const userAuth                                        = AuthService.getCurrentUser();
  const { new_donate }                                  = useUserService();
  const { open_projects }                                     = useProjectService();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    const projectId = history.location.state.id;
    allProjects();
  }, []);

  function allProjects() {
    open_projects()
      .then((response) => {
        setProjects(response);
      })
      .catch((error) => console.log(error));
  }

  function donate() {
    const donation = {
      "amount": values.amount,
      "comment": values.comment,
      "idDonor": userAuth.id,
      "idProject": history.location.state.id,
    }
    
    new_donate(donation, userAuth.token)
      .then((response) => {
        setProjects({...projects, 
          'collection': response.project.collection,
          'percentage': response.project.percentage
        });
      })
      .catch((error) => console.log(error));
    handleClose();
  };

  const handleClose = () => {
    open ? setOpen(false) : setOpen(true);
  }

  const handleChange = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value});
  }

  return (
    <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['name']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['province']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['population']}</TableCell>
            <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['state']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['amountCollected']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['accumulatedPercentageCollected']}</TableCell>
            <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['donate']}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {project.name}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {project.locationProvince}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {project.locationPopulation}
              </TableCell>
              <TableCell className="px-0 capitalize" colSpan={1} align="center">
                {project.locationState ? (
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
          </TableRow>
          ))}
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
