import React, { createContext, useCallback, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "styled-components";
import { INotificationContext, INotifyConfig } from "./INotificationContext";

const NotificationContext = createContext<INotificationContext>({} as INotificationContext);

export const NotificationProvider = ({ children }: INotificationContext.IProvider) => {
  const theme = useTheme();
  const notify = useCallback((message: string, config?: INotifyConfig) => {
    const mergedConfig = {
      ...config,
      style: {
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    };

    const TYPES = {
      success: () => {
        toast.success(message, mergedConfig);
      },
      error: () => {
        toast.success(message, mergedConfig);
      },
    };

    return config?.type ? TYPES[config?.type]() : TYPES.success();
  }, [theme]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Toaster />
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  const { notify } = context;

  return {
    notify,
  };
};
