export function getResponseData(res) {
  let response;

  if (res.result == 1) {
    response = {
      status: true,
      data: res['resultData'],
      message: res['resultMessage'],
    };
    return response;
  } else {
    response = {
      status: false,
      data: {},
      message: res['resultMessage'],
    };
    return response;
  }
}