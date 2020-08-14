export default function reverseObject(object) ***REMOVED***
  let NewObj = ***REMOVED******REMOVED***,
    keysArr = Object.keys(object);
  for (let i = keysArr.length - 1; i >= 0; i--) ***REMOVED***
    NewObj[keysArr[i]] = object[keysArr[i]];
  ***REMOVED***
  return NewObj;
***REMOVED***
