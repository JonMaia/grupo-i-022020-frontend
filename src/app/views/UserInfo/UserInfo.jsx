import React, { useState, useEffect } from "react";
import { SimpleCard } from "matx";
import { TableRow, TableCell, TableHead, Grid, CircularProgress, makeStyles, TableBody, Table } from "@material-ui/core";
import translate from '../../../translate';
import { useUserService } from "./UserService.js";
import AuthService from "./auth.service.js";

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    progress: {
      margin: theme.spacing(2)
    }
  }));

const UserInfo = () => {

  const classes = useStyles();
  const [trans] = React.useState(translate);

  const { findUserById } = useUserService();
  const userAuth = AuthService.getCurrentUser();

  const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    findUser();
    return () => {
    }
  }, []);

  const findUser = () => {
    findUserById(userAuth.id)
      .then((responsive) => {
        setUser(responsive);
        setLoadingUser(false);
        console.log(responsive);
      })
      .catch((error) => console.log(error));    
  }

  const createTableDonations = () => {
    return (
      <div>
        <SimpleCard title={trans['Titles']['donationsInfo']}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['projectName']}</TableCell>
                <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['amount']}</TableCell>
                <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['points']}</TableCell>
                <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['date']}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.dtoDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="px-0 capitalize" colSpan={2} align="center">
                    {donation.projectName}
                  </TableCell>
                  <TableCell className="px-0 capitalize" colSpan={2} align="center">
                    {donation.amount}
                  </TableCell>
                  <TableCell className="px-0 capitalize" colSpan={2} align="center">
                    {donation.points}
                  </TableCell>
                  <TableCell className="px-0 capitalize" colSpan={2} align="center">
                    {donation.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SimpleCard>
      </div>
    )
  }

  const createInfoUser = () => {
    return (
      <div>
        <SimpleCard title={trans['Titles']['userInfo']}>
          <Grid container>
            <Grid item lg={6} md={6} sm={10} xs={10}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="px-0">{trans['Tables']['name']}</TableCell>
                    <TableCell className="px-10">{user.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-0">{trans['SignIn/Up']['nickname']}</TableCell>
                    <TableCell className="px-10">{user.nickname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-0">{trans['Tables']['points']}</TableCell>
                    <TableCell className="px-10">
                      {user.points}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid item lg={6} md={4} sm={10} xs={10}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="px-0">{trans['SignIn/Up']['email']}</TableCell>
                    <TableCell className="px-10">{user.mail}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="px-0">{trans['SignIn/Up']['password']}</TableCell>
                    <TableCell className="px-10"> ******* </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </SimpleCard>
        {createTableDonations()}
      </div>
    )
  }

  return (
    <div className="w-100 overflow-auto">
      {loadingUser ? <CircularProgress className={classes.progress} /> : createInfoUser()}
    </div>
  );
};

export default UserInfo;
