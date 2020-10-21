import React from 'react';
import CreateProject from './CreateProject';
import { Breadcrumb, SimpleCard } from "matx";
import translate from '../../../translate';

const AppCreateProject = () => {
  const [trans] = React.useState(translate);
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: trans['Titles']['createProject'], path: "/admin/create-project" }
          ]}
        />
      </div>
      <div className="py-12" />
      <SimpleCard title={trans['Titles']['createProject']}>
        <CreateProject />
      </SimpleCard>
    </div>
  );
};

export default AppCreateProject;
