#!/usr/bin/env node

import CheckAppInsights from './check';

const storageName = process.argv[2].replace('--storage-name=', '');
const sharedKey = process.argv[3].replace('--shared-key=', '');
const instrumentationKey = process.argv[4].replace(
  '--instrumentation-key=',
  '',
);

const checkAppInsights = new CheckAppInsights({
  sharedKey,
  storageName,
});

checkAppInsights.checkAppInsightsInstrumentationKey(instrumentationKey);
