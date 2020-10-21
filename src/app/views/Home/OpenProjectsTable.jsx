import React from "react";
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination
} from "@material-ui/core";
import translate from '../../../translate';

const projects = [
  {
    name: "Avellaneda",
    totalParticipants: "20",
    amountCollected: 20000,
    accumulatedPercentageCollected: 80
  },
  {
    name: "Florencio Varela",
    totalParticipants: "30",
    amountCollected: 30000,
    accumulatedPercentageCollected: 90
  },
  {
    name: "CABA",
    totalParticipants: "2",
    amountCollected: 2000,
    accumulatedPercentageCollected: 20
  },
  {
    name: "Wilde",
    totalParticipants: "100",
    amountCollected: 100000,
    accumulatedPercentageCollected: 100
  },
  {
    name: "Quilmes",
    totalParticipants: "20",
    amountCollected: 20000,
    accumulatedPercentageCollected: 80
  },
  {
    name: "Bernal",
    totalParticipants: "90",
    amountCollected: 90000,
    accumulatedPercentageCollected: 90
  },
  {
    name: "Villa Domínico",
    totalParticipants: "20",
    amountCollected: 20000,
    accumulatedPercentageCollected: 19
  },
  {
    name: "Sarandí",
    totalParticipants: "20",
    amountCollected: 20000,
    accumulatedPercentageCollected: 30
  },
  {
    name: "Alsina",
    totalParticipants: "23",
    amountCollected: 23000,
    accumulatedPercentageCollected: 35
  }
];

const OpenProjectsTable = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [trans] = React.useState(translate);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  function donate(project) {
    console.log(project);
    console.log("editando...");
  };

  /* function closeProject(project) {
    console.log(project);
    console.log("cerrando...");
  }; */

  return (
    <div className="w-100 overflow-auto">
      <Table style={{ whiteSpace: "pre" }}>
        <TableHead>
          <TableRow>
            <TableCell className="px-0">{trans['Tables']['name']}</TableCell>
            <TableCell className="px-0">{trans['Tables']['totalParticipants']}</TableCell>
            <TableCell className="px-0">{trans['Tables']['amountCollected']}</TableCell>
            <TableCell className="px-0">{trans['Tables']['accumulatedPercentageCollected']}</TableCell>
            <TableCell className="px-0">{trans['Tables']['donate']}</TableCell>
            {/* <TableCell className="px-0">{trans['Tables']['close']}</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((project, index) => (
              <TableRow key={index}>
                <TableCell className="px-0 capitalize" align="left">
                  {project.name}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {project.totalParticipants}
                </TableCell>
                <TableCell className="px-0 capitalize" align="left">
                  {trans['coin']}{project.amountCollected}
                </TableCell>
                <TableCell className="px-0 capitalize">
                {project.accumulatedPercentageCollected === 100 ? (
                    <small className="border-radius-4 bg-green text-white px-8 py-2 ">
                      {project.accumulatedPercentageCollected}%
                    </small>
                  ) : (
                    project.accumulatedPercentageCollected < 20 ? (
                      <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                        {project.accumulatedPercentageCollected}%
                      </small>
                    ) : (
                      <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                        {project.accumulatedPercentageCollected}%
                      </small>
                    )
                  )}
                </TableCell>
                <TableCell className="px-0" colSpan={1}>
                  <IconButton onClick={() => donate(project)}>
                    <Icon color="primary">insert_emoticon</Icon>
                  </IconButton>
                </TableCell>
                {/* <TableCell className="px-0" colSpan={1}>
                  <IconButton onClick={() => closeProject(project)}>
                  {project.accumulatedPercentageCollected === 100 ? (
                    <Icon className="icon-table-green">check_circle</Icon>
                  ) : (
                    project.accumulatedPercentageCollected < 20 ? (
                      <Icon color="error">check_circle</Icon>
                    ) : (
                      <Icon color="secondary">check_circle</Icon>
                    )
                  )}
                  </IconButton>
                </TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        className="px-16"
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={projects.length}
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
      />
    </div>
  );
};

export default OpenProjectsTable;
