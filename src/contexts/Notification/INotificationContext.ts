import { ReactNode } from "react";

export const initialStateNotificationReducer = {
  helpRequests: [],
  error: null,
  loadingStore: false,
  tags: [],
  elderlys: [],
  voluntarys: [],
};

export type INotifyConfig = {
  type?: "success" | "error";
  icon?: string;
  style?: any;
  duration?: number;
}

export interface INotificationContext {
  notify: (message: string, config?: INotifyConfig) => void,
}

export namespace INotificationContext {
  export type IProvider = {
    children: ReactNode;
  }
}
