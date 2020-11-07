import React from 'react';
import UserInfo from './UserInfo';
import { Breadcrumb } from "matx";
import translate from '../../../translate';

const AppUserInfo = () => {
  const [trans] = React.useState(translate);
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: trans['Titles']['userInfo'], path: "/user/info" }
          ]}
        />
      </div>
      <div className="py-12" />
        <UserInfo />
    </div>
  );
};

export default AppUserInfo;
