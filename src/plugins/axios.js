"use strict";

import Vue from 'vue';
import axios from "axios";
import QS from 'qs'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
   baseURL: "https://cstdio.cn/yingpin",
   // timeout: 60 * 1000, // Timeout
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
   withCredentials: true, // Check cross-site Access-Control
   transformRequest: [data => QS.stringify(data)],
   paramsSerializer: params => QS.stringify(params),
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
_axios.interceptors.response.use(
   function (response) {
      // Do something with response data
      return response;
   },
   function (error) {
      // Do something with response error
      return Promise.reject(error);
   }
);

Plugin.install = function (Vue) {
   Vue.axios = _axios;
   window.axios = _axios;
   Object.defineProperties(Vue.prototype, {
      axios: {
         get() {
            return _axios;
         }
      },
      $axios: {
         get() {
            return _axios;
         }
      },
   });
};

Vue.use(Plugin)

export default Plugin;