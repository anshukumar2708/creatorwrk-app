import { FC, PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as actionTypes from "../store-items/action-types";
import { Header } from "./header";
import { useDispatch } from "react-redux";
import HttpService from "../services/http.service";
import { API_CONFIG } from "../utils/api";
import { createAction } from "../utils/common";
import BottomBar from "../components/common/bottom-bar";
import { authPage } from "../assets/locales/constant";
// import { State } from "../interfaces/store";

//Create different files for different layouts
export const Layout: FC<PropsWithChildren> = ({ children }) => {
  // const auth = useSelector((state: State) => state?.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  let token = localStorage.getItem("token");
  const matchPath =
    authPage?.includes(location?.pathname) ||
    location?.pathname?.startsWith("/reset-password");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // get profile data
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await HttpService.get(API_CONFIG.path.profile);
        if (response) {
          dispatch(createAction(actionTypes.GET_PROFILE_DATA, response?.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    token && getProfileData();
  }, [token, dispatch]);

  // get category data
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await HttpService.get(API_CONFIG.path.categories);
        if (response) {
          dispatch(createAction(actionTypes.GET_CATEGORY_DATA, response?.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    token && getCategoryData();
  }, [token, dispatch]);

  return (
    <>
      <div className="bg-primary w-full h-full">
        {matchPath && <div className="absolute h-100 top-gradient"></div>}
        {!matchPath && <div className="absolute h-140px dark-gradient"></div>}
        <div className="header-wrapper">
          <Header />
        </div>
        <div className="fixed gradient-left"></div>
        {/* <div
          className={`w-full flex justify-center items-start z-1${
            matchPath
              ? " overflow-y-auto xl:pt-40 sm:pt-32 pt-24"
              : "sm:pt-32 pt-24 max-sm:mb-8"
          } `}
        > */}
        {/* <div
          className={`children-scroll w-full flex justify-center items-start z-1
            ${
              matchPath
                ? " overflow-y-auto xl:mt-40 sm:mt-32 mt-[83px]"
                : "sm:pt-32 mt-[83px] max-sm:mb-8"
            } `}
        > */}
        <div
          className={`w-full flex justify-center items-start z-1 ${
            matchPath
              ? "overflow-y-auto xl:mt-40 sm:mt-32 mt-[83px]"
              : "sm:mt-[6.5rem] mt-[83px] max-sm:mb-8"
          }`}
        >
          {children}
        </div>
        <div className="fixed gradient-right"></div>
        {!matchPath && (
          <div className="sm:hidden block w-full">
            <div className="fixed left-0 bottom-0 w-full z-50 overflow-hidden">
              <BottomBar />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
