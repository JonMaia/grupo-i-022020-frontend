import React, { useState, useEffect } from "react";
import { TableRow, TableCell, Grid, CircularProgress, makeStyles } from "@material-ui/core";
import translate from '../../../translate';
import { useUserService } from "./UserService.js";

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
  
  const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    findUser();
    return () => {
    }
  }, []);

  const findUser = () => {
    findUserById(48)
    .then((responsive) => {
      setLoadingUser(false);
      setUser(responsive);
    })
    .catch((error) => console.log(error))
  }

  const createInfoUser = () => {
    return (
      <Grid container spacing={12}>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['name']}</TableCell>
            <TableCell className="px-20">{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['nickname']}</TableCell>
            <TableCell className="px-20">{user.nickname}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['points']}</TableCell>
            <TableCell className="px-20">
              {user.points}
            </TableCell>
          </TableRow>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['mail']}</TableCell>
            <TableCell className="px-20">{user.mail}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['password']}</TableCell>
            <TableCell className="px-20"> ******* </TableCell>
          </TableRow>
        </Grid>
      </Grid>
    )
  }

  return (
    <div className="w-100 overflow-auto">
      {loadingUser ? <CircularProgress className={classes.progress} /> : createInfoUser()}
    </div>
  );
};

export default UserInfo;
