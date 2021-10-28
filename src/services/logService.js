import * as Sentry from '@sentry/react';
import {Integrations} from '@sentry/tracing';



function init() {
  Sentry.init({
    dsn: "https://6c3c08efff544925a4194acefefed065@o1043594.ingest.sentry.io/6013231",
    integrations: [new Integrations.BrowserTracing()],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
