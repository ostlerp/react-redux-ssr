export let AuthService = require('./auth');

export let HandleResponse = function(response, resolve, reject) {
  response.text().then((json) => {
    try {
      if(response.ok) {
        if(json) {
          let r = JSON.parse(json);
          if(response.headers.has('X-Total-Count')) {
            r = {
              total: Number(response.headers.get('X-Total-Count')),
              items: r
            };
          }
          resolve(r);
        }
        else { resolve() };
      } else {
        reject({_error: json || `Failed with status code ${response.status}`});
      }
    } catch(err) {
      reject({_error: `Failed with status code ${response.status}`})
    }
  });
}
