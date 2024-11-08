import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../.././interfaces/store";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const { auth } = useSelector((state: State) => state);
  const isLoggedIn = auth.login;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const EmailVerifiedRoute = ({ children }: Props) => {
  const { profile } = useSelector((state: State) => state);
  const isEmailVerify = profile?.profile?.emailVerifiedAt;

  if (!isEmailVerify) {
    return <Navigate to="/email-verification" />;
  }

  return <>{children}</>;
};

export const RoleBasedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const { profile } = useSelector((state: State) => state);
  const userType = profile?.profile?.userType;

  if (userType !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
