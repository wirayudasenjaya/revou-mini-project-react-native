import axios from 'axios';

const authApiUrl = 'https://develop.investly.id/api/auth';
const socialApiUrl = 'https://api.investly.id/api/social';
const socialDevUrl = 'https://develop.investly.id/api/social';

type CallbackProps = {
  success: (response: any) => void;
  error: (error: any) => void;
};

export default {
  getAuth: function (url: string, callback: CallbackProps) {
    axios
      .get(authApiUrl + url)
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
  postAuth: function (url: string, data: any, callback: CallbackProps) {
    axios
      .post(authApiUrl + url, data)
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
  getSocial: function (url: string, callback: CallbackProps) {
    axios
      .get(socialApiUrl + url)
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
  getSocialDev: function (url: string, callback: CallbackProps) {
    axios
      .get(socialDevUrl + url)
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
};
