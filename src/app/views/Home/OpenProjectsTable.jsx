import React, { useEffect, useState } from "react";
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
import { useHistory } from 'react-router-dom';
import { useProjectService } from "../api-services/service/ProjectService.js" 
import AuthService from "../api-services/AuthService.js";

const OpenProjectsTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [trans] = useState(translate);
  const history = useHistory();
  const { open_projects } = useProjectService();

  const [projects, setProjects] = useState([]);
  const userAuth = AuthService.getCurrentUser();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
  };

  useEffect(() => {
    allProjects();
  }, []);

  function allProjects() {
    open_projects(userAuth.token)
      .then((response) => {
        setProjects(response);
      })
      .catch((error) => console.log(error));
  }

  function info(projectId) {
    history.push({
      pathname: '/user/info-project',
      state: {
        id: projectId
      }
    });
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
            <TableCell className="px-0" colSpan={3} align="center">{trans['Tables']['name']}</TableCell>
            <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['totalParticipants']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['amountCollected']}</TableCell>
            <TableCell className="px-0" colSpan={2} align="center">{trans['Tables']['accumulatedPercentageCollected']}</TableCell>
            <TableCell className="px-0" colSpan={1} align="center">{trans['Tables']['info']}</TableCell>
            {/* <TableCell className="px-0">{trans['Tables']['close']}</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((project) => (
              <TableRow key={project.id}>
                <TableCell className="px-0 capitalize" colSpan={3} align="center">
                  {project.name}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={1} align="center">
                  {project.cantDonations}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={2} align="center">
                  {trans['coin']}{project.collection}
                </TableCell>
                <TableCell className="px-0 capitalize" colSpan={2} align="center">
                {project.cumulativePercentage === 100 ? (
                    <small className="border-radius-4 bg-green text-white px-8 py-2 ">
                      {Math.ceil(project.cumulativePercentage).toFixed(2)}%
                    </small>
                  ) : (
                    project.cumulativePercentage < 20 ? (
                      <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                        {Math.ceil(project.cumulativePercentage).toFixed(2)}%
                      </small>
                    ) : (
                      <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                        {Math.ceil(project.cumulativePercentage).toFixed(2)}%
                      </small>
                    )
                  )}
                </TableCell>
                <TableCell className="px-0" colSpan={1} align="center">
                  <IconButton onClick={() => info(project.id, project.collection, project.cumulativePercentage)}>
                    <Icon color="primary">info</Icon>
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
