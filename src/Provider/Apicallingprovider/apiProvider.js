import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

class ApiContainer {
  myAppVersion = Platform.OS === 'ios' ? '16' : '16';
  usertype = 'user';

  getApi = async (url, status) => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          if (status != 1) {
      
          }
          fetch(url, {
            method: 'GET',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: 0,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'app-type': Platform.OS === 'ios' ? 'ios' : 'android',
              'app-version': this.myAppVersion,
              'user-type': this.usertype,
            },
          })
            .then(response => {
             
              
              if (response.status === 423) {
                alert('Must update app version first');
              } else {
                return response.json();
              }
            })
            .then(obj => {
              
              resolve(obj);
            })
            .catch(error => {
              
              reject(error);
            });
        } else {
          
          reject('noNetwork');
        }
      });
    });
  };
  postApi = async (url, data, status) => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          //  
          if (status != 1) {
             
          }
          fetch(url, {
            method: 'POST',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: 0,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'app-type': Platform.OS === 'ios' ? 'ios' : 'android',
              'app-version': this.myAppVersion,
              'user-type': this.usertype,
            },
            body: data,
          })
            .then(response => {
              
              if (response.status === 423) {
                alert('Must update app version first');
              } else {
                return response.json();
              }
            })
            .then(obj => {
              
              resolve(obj);
            })
            .catch(error => {
              
              reject(error);
            });
        } else {
          
          reject('noNetwork');
        }
      });
    });
  };

  postApiTest = async (url, data) => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          fetch(url, {
            method: 'POST',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: 0,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'app-type': Platform.OS === 'ios' ? 'ios' : 'android',
              'app-version': this.myAppVersion,
              'user-type': this.usertype,
            },
            body: data,
          })
            .then(response => {
             
              
              if (response.status === 423) {
                alert('Must update app version first');
              } else {
                return response.json();
              }
            })
            .then(obj => {
              
              resolve(obj);
            })
            .catch(error => {
              
              reject(error);
            });
        } else {
          
          reject('noNetwork');
        }
      });
    });
  };

  NoLoaderpostApi = async (url, data) => {
    return new Promise((resolve, reject) => {
      NetInfo.fetch().then(state => {
        if (state.isConnected == true) {
          fetch(url, {
            method: 'POST',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: 0,
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              'app-type': Platform.OS === 'ios' ? 'ios' : 'android',
              'app-version': this.myAppVersion,
              'user-type': this.usertype,
            },
            body: data,
          })
            .then(response => {
              
              if (response.status === 423) {
                alert('Must update app version first');
              } else {
                return response.json();
              }
            })
            .then(obj => {
              
              resolve(obj);
            })
            .catch(error => {
              
              reject(error);
            });
        } else {
          
          reject('noNetwork');
        }
      });
    });
  };
}
//--------------------------- Config Provider End -----------------------
export const apifuntion = new ApiContainer();
