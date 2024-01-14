import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  return <div className="error">{error.message}</div>;
}

export default Error;
