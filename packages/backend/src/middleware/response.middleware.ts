import { Response, Request } from 'express';

const response = (status: number, values: Object, res: Response) => {
  const data = {
    'status': status,
    'values': values
  };
  res.status(data.status);
  res.json(data);
  res.end();
};

export default response;
