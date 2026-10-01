import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { createUserService } from "./user.services";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required fields.",
      });
    }

    const result = await createUserService(req.body);

    sendResponse(res, {
      statusCode: 201,
      data: result,
      message: "User created successfully!",
      success: true,
    });
  } catch (error: any) {
    // Service layer theke error ashle global error handler ba custom response pathano
    if (error.message === "User with this email already exists!") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
};
