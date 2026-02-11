import { Roles } from "@/constants/constants";
import { userService } from "@/service/session.service";
import React, { ReactNode } from "react";

export default async function layout({
  admin,
  student,
  tutor,
}: {
  admin: ReactNode;
  student: ReactNode;
  tutor: ReactNode;
}) {
  const { data, error } = await userService.getSession();
  const role = data.user.role;
  return (
    <div>
      {role === Roles.admin && admin}
      {role === Roles.student && student}
      {role === Roles.tutor && tutor}
    </div>
  );
}
