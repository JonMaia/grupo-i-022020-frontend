import React from 'react';
import InfoProject from './InfoProject';
import { Breadcrumb, SimpleCard } from "matx";
import translate from '../../../translate';

const AppInfoProject = () => {
  const [trans] = React.useState(translate);
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: trans['Titles']['home'], path: "/home" },
            { name: trans['Titles']['infoProject'] }
          ]}
        />
      </div>
      <div className="py-12" />
      <SimpleCard title={trans['Titles']['infoProject']}>
        <InfoProject />
      </SimpleCard>
    </div>
  );
};

export default AppInfoProject;
