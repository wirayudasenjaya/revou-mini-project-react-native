import axios from 'axios';
import {storageService} from '../services';
import Config from 'react-native-config';

const authApiUrl = Config.AUTH_API_URL;
const socialApiUrl = 'https://api.investly.id/api/social';
const socialDevUrl = Config.SOCIAL_API_URL;

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
      .get(socialDevUrl + url)
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
  getSocialHeader: function (url: string, callback: CallbackProps) {
    axios
      .get(socialDevUrl + url, {
        headers: {
          Authorization: 'Bearer ' + storageService.getToken(),
        },
      })
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
  postSocial: function (url: string, data: any, callback: CallbackProps) {
    axios
      .post(socialDevUrl + url, data, {
        headers: {
          Authorization: 'Bearer ' + storageService.getToken(),
        },
      })
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
  postSocialFormData: function (
    url: string,
    data: any,
    callback: CallbackProps,
  ) {
    axios
      .post(socialDevUrl + url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + storageService.getToken(),
        },
      })
      .then(response => {
        callback.success(response);
      })
      .catch(e => {
        callback.error(e);
      });
  },
};
