import { createContext, useState } from "react";
import user from "../interface/user";
type userContextType = {
  user?: user;
  setUser?: (user: user) => void;
};
const UserContext = createContext<userContextType>({});

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<user>();

  const store = {
    user,
    setUser,
  };
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
export default UserContext;
