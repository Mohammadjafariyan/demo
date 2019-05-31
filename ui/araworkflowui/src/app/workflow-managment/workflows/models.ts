declare module namespace {

  export interface Datum {
    id: string;
    url: string;
    key: string;
    version: number;
    name: string;
    description?: any;
    tenantId: string;
    deploymentId: string;
    deploymentUrl: string;
    resource: string;
    diagramResource: string;
    category: string;
    graphicalNotationDefined: boolean;
    suspended: boolean;
    startFormDefined: boolean;
  }

  export interface ProcessDefinition {
    data: Datum[];
    total: number;
    start: number;
    sort: string;
    order: string;
    size: number;
  }

}
