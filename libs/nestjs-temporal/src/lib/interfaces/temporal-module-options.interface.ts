import { ConnectionOptions, WorkflowClientOptions } from '@temporalio/client';

export interface TemporalModuleOptions {
  connection?: ConnectionOptions;
  workflowOptions?: WorkflowClientOptions;
}
