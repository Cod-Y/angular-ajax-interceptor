function _getInterceptRequestConfig(requestConfigs) {
  var _type = requestConfigs.adapt;

  if(isUndefined(_type)) {
    return null;
  }

  for(var type in TYPES) {
    if(TYPES.hasOwnProperty(type) && TYPES[type] === _type) {
      return _type;
    }
  }

  return null;
}

function _adaptResponse(response, resolve, reject, $log) {
  var adapt = response.config.adapt;

  if( !adapt ) {
    return response || resolve(response);
  }

  switch(adapt) {

    case TYPES.list:
      console.log('is: ', TYPES.list);
      return resolve( new ListAjaxResponse(response) );
      break;

    case TYPES.simple:
      console.log('is: ', TYPES.simple);
      return resolve( new SimpleAjaxResponse(response) );
      break;

    case TYPES.form:
      console.log('is: ', TYPES.form);
      return resolve( new FormAjaxResponse(response) );
      break;

    case TYPES.error:
      console.log('is: ', TYPES.error);
      return reject( new ErrorAjaxResponse(response) );
      break;

    default:
      $log.warn('AjaxAdapter [UNRECOGNIZED "'+ adapt +'" RESPONSE TYPE]', response);
      return resolve( new SimpleAjaxResponse(response) );
  }
}
