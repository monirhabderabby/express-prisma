import { Response } from "express";
interface IResponseData<T> {
  statusCode: number;
  success: boolean;
  message?: string;

  data?: T | null;
}

export const sendResponse = <T>(res: Response, data: IResponseData<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  });
};
