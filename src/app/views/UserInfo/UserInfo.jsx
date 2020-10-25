import React from "react";
import { TableRow, TableCell, Grid } from "@material-ui/core";
import translate from '../../../translate';

const user =
  {
    id:48,
    name:"Cristian",
    mail:"cris.esroj@gmail.com",
    password:"cris123",
    nickname:"Cris",
    points:0
  };


const UserInfo = () => {
  const [trans] = React.useState(translate);

  return (
    <div className="w-100 overflow-auto">
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
    </div>
  );
};

export default UserInfo;
