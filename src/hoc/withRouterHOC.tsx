import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { WithRouterProps } from '../interfaces/interfaces';

const withRouter = <Props extends WithRouterProps>(
  Component: React.ComponentType<Props>
) => {
  return (props: Omit<Props, keyof WithRouterProps>) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();

    return (
      <Component
        {...(props as Props)}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  };
};

export default withRouter;
