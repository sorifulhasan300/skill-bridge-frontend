"use server";

import { userService } from "@/service/session.service";

export const getSession = async () => {
  return await userService.getSession();
};
