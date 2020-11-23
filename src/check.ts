#!/usr/bin/env node
import azure from 'azure-storage';
import moment from 'moment';

export interface AppInsightsCheckData {
  sharedKey: string;
  storageName: string;
}

export interface AppInsightsQueryResults {
  Name: {
    _: string;
  };
  InstrumentationKey: {
    _: string;
  };
}

class AppInsightsCheck {
  public AzureTableService: azure.TableService;

  constructor(data: AppInsightsCheckData) {
    this.AzureTableService = azure.createTableService(
      data.storageName,
      data.sharedKey,
    );
  }

  checkAppInsightsInstrumentationKey(key: string): void {
    const query = new azure.TableQuery()
      .select('InstrumentationKey', 'Name')
      .where(
        'InstrumentationKey eq ? && PartitionKey eq ?',
        key,
        `${moment().format('YYYY-MM-DD')}`,
      );

    this.AzureTableService.queryEntities<AppInsightsQueryResults>(
      'appinsights',
      query,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <any>null,
      (error, result) => {
        if (!error) {
          if (!result.entries.length) {
            console.error('Error: Instrumentation Key not found');
            process.exit(1);
          }

          console.log(
            `${result.entries[0].Name._}: Instrumentation Key is valid`,
          );
        } else {
          console.error(`Error: ${error.message}`);
          process.exit(1);
        }
      },
    );
  }
}

export default AppInsightsCheck;
