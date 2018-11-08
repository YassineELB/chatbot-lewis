/* Doing all the API calls at the same time during initialization can net you a 429 Too Many Requests response,
 * so we delay some of the API calls */
export function setTimer(delay) {
  return new Promise (function (resolve, reject) {
    setTimeout(function() {
        resolve('OK');
      }, delay);
  });
}
