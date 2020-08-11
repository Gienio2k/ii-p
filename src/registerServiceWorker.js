/* eslint-disable no-console */

import ***REMOVED*** register ***REMOVED*** from 'register-service-worker'

if (process.env.NODE_ENV === 'production') ***REMOVED***
  register(`$***REMOVED***process.env.BASE_URL***REMOVED***service-worker.js`, ***REMOVED***
    ready () ***REMOVED***
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    ***REMOVED***,
    registered () ***REMOVED***
      console.log('Service worker has been registered.')
    ***REMOVED***,
    cached () ***REMOVED***
      console.log('Content has been cached for offline use.')
    ***REMOVED***,
    updatefound () ***REMOVED***
      console.log('New content is downloading.')
    ***REMOVED***,
    updated () ***REMOVED***
      console.log('New content is available; please refresh.')
    ***REMOVED***,
    offline () ***REMOVED***
      console.log('No internet connection found. App is running in offline mode.')
    ***REMOVED***,
    error (error) ***REMOVED***
      console.error('Error during service worker registration:', error)
    ***REMOVED***
  ***REMOVED***)
***REMOVED***
