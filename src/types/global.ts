export type TError = {
  data: {
    message: string;
    stack: string;
    success: string;
  };
  status: number;
};

export type TResponse = {
  data?: any;
  error?: TError;
};
