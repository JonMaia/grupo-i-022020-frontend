import React from 'react';
import OpenProjectsTable from './OpenProjectsTable';
import ProjectsNearingCompletion from './ProjectsNearingCompletion';
import { Breadcrumb, SimpleCard } from "matx";
import translate from '../../../translate';

const AppHome = () => {
  const [trans] = React.useState(translate);
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: trans['Titles']['home'], path: "/home" }
          ]}
        />
      </div>
      <div className="py-12" />
      <SimpleCard title={trans['Tables']['openProjects']}>
        <OpenProjectsTable />
      </SimpleCard>
      <div className="py-12" />
      {/* <SimpleCard title={trans['Titles']['projectsNearingCompletion']}>
        <ProjectsNearingCompletion />
      </SimpleCard> */}
    </div>
  );
};

export default AppHome;
