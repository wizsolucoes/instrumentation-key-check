#!/usr/bin/env node

import azure from 'azure-storage';

interface AppInsightsCheckData {
  sharedKey: string;
  storageName: string;
}

class AppInsightsCheck {
  private AzureTableService: azure.TableService;

  constructor(data: AppInsightsCheckData) {
    this.AzureTableService = azure.createTableService(
      data.storageName,
      data.sharedKey,
    );
  }

  checkAppInsightsInstrumentationKey(key: string): void {
    const query = new azure.TableQuery()
      .select('InstrumentationKey')
      .where('InstrumentationKey eq ?', key);

    this.AzureTableService.queryEntities(
      'appinsights',
      query,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <any>null,
      (error, result) => {
        if (!error) {
          if (!result.entries.length) {
            throw new Error('Instrumentation Key not found');
          }
        } else {
          throw error;
        }
      },
    );
  }
}

export default AppInsightsCheck;
