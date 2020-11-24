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

    console.log(`Data e Hora: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`);
    console.log(`Buscando chave: ${key}`);

    this.AzureTableService.queryEntities<AppInsightsQueryResults>(
      'appinsights',
      query,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <any>null,
      (error, result) => {
        if (!error) {
          if (!result.entries.length) {
            console.error('Error: Instrumentation Key não encontrada');
            console.log(
              'Siga as orientações do nosso knowledge base para encontrar a instrumentation key da sua aplicação:',
            );
            console.log(
              'https://parcorretoradeseguros.sharepoint.com/sites/Gov.Met.Devz/SitePages/Chave-de-instrumenta%C3%A7%C3%A3o-Application-Insights---Onde-encontrar.aspx',
            );
            process.exit(1);
          }

          console.log(
            `${result.entries[0].Name._}: Instrumentation Key é valida`,
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
