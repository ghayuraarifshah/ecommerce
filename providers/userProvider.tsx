import { createContext, useState } from "react";
import item from "../interface/item";
import user from "../interface/user";
type userContextType = {
  user?: user;
  setUser?: (user: user) => void;
  addToFavorites: (item: item) => Promise<void>;
};
const UserContext = createContext<userContextType>({
  addToFavorites: async (item: item) => {},
});

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<user>();
  async function addToFavorites(item: item) {
    try {
      const res = await fetch(`/api/add-to-favorites`, {
        method: "POST",
        body: JSON.stringify({ userId: user?._id, itemId: item._id }),
      });
      if (res.status === 200 || res.status === 201) {
        const newUser: user = await res.json();
        setUser(newUser);
        return;
      }
      throw new Error("Something went wrong");
    } catch (error) {
      alert("Something went wronf");
    }
  }
  const store = {
    user,
    setUser,
    addToFavorites,
  };
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>;
};
export default UserContext;
