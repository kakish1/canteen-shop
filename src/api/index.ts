import * as axios from 'axios';

const instance = () =>
  axios.default.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImVtYWlsIjoiMyIsIm5hbWVpZCI6IjIiLCJqdGkiOiJiNDRmM2E1OS0wYjA4LTQyNmUtYTNhNi02ZWFmNGMyMDQ5MjIiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiZXhwIjoxNjIxNzczODI3LCJpc3MiOiJTY2hvb2xDYW50ZWVuIiwiYXVkIjoiU2Nob29sQ2FudGVlbiJ9.LXwMbEF9piP85kszuBwYV08tUIrbZiTXt6PtShjh--0',
    },
  });

//#region Service spending
export const getLoggerUser = () => {
  return instance().get('http://localhost:52425/api/User/GetLoggedUser');
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
