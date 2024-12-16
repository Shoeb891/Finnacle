import { createContext, useState, useEffect, useContext } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const financeContext = createContext({
  expenses: [],
  categories: [],
  addExpense: async () => {},
  addCategory: async () => {},
  // Other functions...
});

export default function FinanceContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);

  // Define functions to interact with Prisma Client

  const addExpense = async (newExpenseData) => {
    try {
      const createdExpense = await prisma.expense.create({
        data: newExpenseData,
      });
      setExpenses((prevExpenses) => [...prevExpenses, createdExpense]);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const addCategory = async (categoryName) => {
    try {
      const createdCategory = await prisma.category.create({
        data: {
          categoryName,
        },
      });
      setCategories((prevCategories) => [...prevCategories, createdCategory]);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Other functions...

  const values = {
    expenses,
    categories,
    addExpense,
    addCategory,
    // Other functions...
  };

  // Fetch initial data from Prisma on component mount using useEffect

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allExpenses = await prisma.expense.findMany();
        const allCategories = await prisma.category.findMany();
        setExpenses(allExpenses);
        setCategories(allCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <financeContext.Provider value={values}>{children}</financeContext.Provider>
  );
}
