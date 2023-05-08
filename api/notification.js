import axiosInstance from "../axios";

export const getNotification = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/notification`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const markRead = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/notification/mark_read/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

