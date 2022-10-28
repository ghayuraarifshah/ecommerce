import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="flex bg-purple-700 justify-between items-center fixed w-full top-0 z-10">
      <div className="flex">
        <div className="p-3">
          <span className="text-3xl">🏪</span>
          <span className="p-2 text-2xl text-white">E-Cart</span>
        </div>
        <div className="my-auto bg-white rounded-sm">
          <input
            type="text"
            className="rounded-sm h-8 px-2 focus-visible:outline-none"
            placeholder="Search"
          />
          <FontAwesomeIcon icon={faSearch} className="px-2 text-gray-600" />
        </div>
      </div>
      <div className="flex mx-5">
        <div className="rounded-full w-5 h-5 bg-slate-600"></div>
        <FontAwesomeIcon
          icon={faHeart}
          className="px-2 text-2xl text-pink-500 mx-3"
        />
        <div className="mx-3 relative">
          <div className="bg-white w-5 h-5 rounded-full ml-auto absolute top-[-15px] flex items-center justify-center right-0">
            <p>1</p>
          </div>
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="px-2 text-2xl text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
