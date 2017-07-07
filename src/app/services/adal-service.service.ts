import { Injectable, Inject } from '@angular/core';
//import { adal } from 'adal';


@Injectable()
export class AdalService {
  private _adal: adal.AuthenticationContext;
  private _oauthData = { isAuthenticated: false, userName: '', loginError: '', profile: '' };

  constructor(configOptions: any) {
    if (configOptions) {
      //configOptions.isAngular = false;

      // if (httpProvider && httpProvider.interceptors) {
      //     httpProvider.interceptors.push('ProtectedResourceInterceptor');
      // }

      // create instance with given config
      this._adal = new AuthenticationContext(configOptions);
    } else {
      throw new Error('You must set configOptions, when calling init');
    }

    this.processHash(window.location.hash);
    // loginResource is used to set authenticated status
    this.updateDataFromCache(this._adal.config.loginResource);
  }

  private updateDataFromCache(resource) {
    // only cache lookup here to not interrupt with events
    let token = this._adal.getCachedToken(resource);
    this._oauthData.isAuthenticated = token !== null && token.length > 0;
    let user = this._adal.getCachedUser() || { userName: '', profile: '' };
    this._oauthData.userName = user.userName;
    this._oauthData.profile = user.profile;
    this._oauthData.loginError = this._adal.getLoginError();
  }

  config() { return this._adal.config };

  login() {
    this._adal.login();
  }
  loginInProgress() {
    return this._adal.loginInProgress();
  }
  logOut() {
    this._adal.logOut();
    //call signout related method
  }
  getCachedToken(resource) {
    return this._adal.getCachedToken(resource);
  }
  userInfo() {
    return this._oauthData;
  }

  acquireToken(resource) {
    // automated token request call
    return new Promise((resolve, reject) => {
      //this._adal._renewActive = true;
      this._adal.acquireToken(resource, (errorDesc, tokenOut) => {
        //this._adal._renewActive = false;
        if (!tokenOut) {
          //$rootScope.$broadcast('adal:acquireTokenFailure', errorDesc, error);
          this._adal.error('Error when acquiring token for resource: ' + resource, errorDesc);
          reject(errorDesc);
        } else {
          //$rootScope.$broadcast('adal:acquireTokenSuccess', tokenOut);
          resolve(tokenOut);
        }
      });
    });
  }

  // acquireTokenPopup(resource, extraQueryParameters) {
  //     return new Promise((reslove, reject)=>{
  //       this._adal.acquireTokenPopup(resource, extraQueryParameters, function (errorDesc, tokenOut, error) {
  //         if (error) {
  //             $rootScope.$broadcast('adal:acquireTokenFailure', errorDesc, error);
  //             this._adal.error('Error when acquiring token for resource: ' + resource, error);
  //             deferred.reject(errorDesc + "|" + error);
  //         } else {
  //             $rootScope.$broadcast('adal:acquireTokenSuccess', tokenOut);
  //             deferred.resolve(tokenOut);
  //         }
  //     });

  //     });
  // },

  // acquireTokenRedirect (resource, extraQueryParameters) {
  //     this._adal.acquireTokenRedirect(resource, extraQueryParameters);
  // },

  getUser() {
    return new Promise((resolve, reject) => {
      this._adal.getUser(function (error, user) {
        if (error) {
          this._adal.error('Error when getting user', error);
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }

  getResourceForEndpoint(endpoint) {
    return this._adal.getResourceForEndpoint(endpoint);
  }

  clearCache() {
    this._adal.clearCache();
  }

  clearCacheForResource(resource) {
    this._adal.clearCacheForResource(resource);
  }

  info(message) {
    this._adal.info(message);
  }

  verbose(message) {
    this._adal.verbose(message);
  }

  isAuthenticated(): boolean {
    return this._oauthData.isAuthenticated;
  }

  processHash(hash) {
    if (this._adal.isCallback(hash)) {
      // callback can come from login or iframe request
      this._adal.verbose('Processing the hash: ' + hash);
      var requestInfo = this._adal.getRequestInfo(hash);
      this._adal.saveTokenFromHash(requestInfo);
      // Return to callback if it is sent from iframe
      if (requestInfo.stateMatch) {
        if (requestInfo.requestType === 'RENEW_TOKEN') {
          //this._adal._renewActive = false;
          //var callback = $window.parent.callBackMappedToRenewStates[requestInfo.stateResponse] || _adal.callback;
          // since this is a token renewal request in iFrame, we don't need to proceed with the location change.
          if (event && event.preventDefault) {
            if (window.parent !== window) {//if token renewal request is made in an iframe
              event.preventDefault();
            }
          }

          // Call within the same context without full page redirect keeps the callback
          // if (callback && typeof callback === 'function') {
          //     // id_token or access_token can be renewed
          //     var token = requestInfo.parameters['access_token'] || requestInfo.parameters['id_token'];
          //     var error = requestInfo.parameters['error'];
          //     var errorDescription = requestInfo.parameters['error_description'];
          //     if ($window.parent === $window && !$window.parent.callBackMappedToRenewStates[requestInfo.stateResponse]) {
          //         if (token) {
          //             $rootScope.$broadcast('adal:acquireTokenSuccess', token);
          //         }
          //         else if (error && errorDescription) {
          //             $rootScope.$broadcast('adal:acquireTokenFailure', error, errorDescription);
          //         }
          //     }
          //     callback(errorDescription, token, error);
          //     if (window.parent !== window) {//in iframe
          //         return;
          //     }
          // }
        } else if (requestInfo.requestType === 'LOGIN') {
          // normal full login redirect happened on the page
          this.updateDataFromCache(this._adal.config.loginResource);
          if (this._oauthData.userName) {
            // $timeout(function () {
            //     // id_token is added as token for the app
            //     updateDataFromCache(_adal.config.loginResource);
            //     $rootScope.userInfo = _oauthData;
            // }, 1);

            // $rootScope.$broadcast('adal:loginSuccess', _adal._getItem(_adal.CONSTANTS.STORAGE.IDTOKEN));
          } else {
            // $rootScope.$broadcast('adal:loginFailure', _adal._getItem(_adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), _adal._getItem(_adal.CONSTANTS.STORAGE.ERROR));
          }

          // if (this._adal.callback && typeof _adal.callback === 'function')
          //     _adal.callback(_adal._getItem(_adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), _adal._getItem(_adal.CONSTANTS.STORAGE.IDTOKEN), _adal._getItem(_adal.CONSTANTS.STORAGE.ERROR));
        }
        // redirect to login start page
        // if (!_adal.popUp && window.parent === window) {
        //     if (_adal.config.navigateToLoginRequestUrl) {
        //         var loginStartPage = _adal._getItem(_adal.CONSTANTS.STORAGE.LOGIN_REQUEST);
        //         if (typeof loginStartPage !== 'undefined' && loginStartPage && loginStartPage.length !== 0) {
        //             // prevent the current location change and redirect the user back to the login start page
        //             _adal.verbose('Redirecting to start page: ' + loginStartPage);
        //             if (!$location.$$html5 && loginStartPage.indexOf('#') > -1) {
        //                 $location.url(loginStartPage.substring(loginStartPage.indexOf('#') + 1));
        //             }
        //             $window.location.href = loginStartPage;
        //         }
        //     }
        //     else {
        //         // resetting the hash to null
        //         if ($location.$$html5) {
        //             $location.hash('');
        //         }
        //         else {
        //             $location.path('');
        //         }
        //     }
        // }
      }
      else {
        // state did not match, broadcast an error
        // $rootScope.$broadcast('adal:stateMismatch', _adal._getItem(_adal.CONSTANTS.STORAGE.ERROR_DESCRIPTION), _adal._getItem(_adal.CONSTANTS.STORAGE.ERROR));
      }
    } else {
      // No callback. App resumes after closing or moving to new page.
      // Check token and username
      this.updateDataFromCache(this._adal.config.loginResource);
      // if (!this._oauthData.isAuthenticated && this._oauthData.userName && !this._adal._renewActive) {
      //     // id_token is expired or not present
      //     var self = $injector.get('adalAuthenticationService');
      //     self.acquireToken(_adal.config.loginResource).then(function (token) {
      //         if (token) {
      //             _oauthData.isAuthenticated = true;
      //         }
      //     }, function (error) {
      //         var errorParts = error.split('|');
      //         $rootScope.$broadcast('adal:loginFailure', errorParts[0], errorParts[1]);
      //     });
      // }
    }

  }

}


export function provideAdalService(config: any) {
  return {
    provide: AdalService,
    useFactory: (config) => new AdalService(config)
  }
}