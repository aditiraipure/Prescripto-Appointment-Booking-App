import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";

  const calculateAge = (dob) => {
    const today = new Date();
    const BirthDate = new Date(dob);

    let age = today.getFullYear() - BirthDate.getFullYear();
    return age;
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

 const slotDateFormat = (dateString) => {
   if (!dateString || typeof dateString !== "string") return "Invalid Date";

   const [day, month, year] = dateString.split("_");
   return `${day}/${month}/${year}`;
 };


  

  const values = {
    calculateAge,
    slotDateFormat,
    currency,
  };
  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
