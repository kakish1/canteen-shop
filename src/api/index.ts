import * as axios from 'axios';

const instance = () =>
  axios.default.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

//#region Service spending
export const getServiceSpending = () => {
  return instance().get('/api/');
};

// export const saveServiceSpending = (data: any) => {
//   return instance().post('/api/ServiceSpending', data);
// };

// export const updateServiceSpending = (data: any) => {
//   return instance().put('/api/ServiceSpending', data);
// };

// export const deleteServiceSpending = (id: number) => {
//   return instance().delete(`/api/ServiceSpending/${id}`);
// };
//#endregion
