/*
Dashboard component
It displays a personalized user progress using different charts.
*/

import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import DashboardIntro from "./DashboardIntro";

const Dashboard = ({ isDarkMode }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
  const [competitionData, setCompetitionData] = useState({
    name: [],
    percentage: [],
  });
  const [dailySuccessData, setDailySuccessData] = useState(null); // State to handle daily success

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      console.log(localStorage.getItem("userID"));
      const response = await fetch(
        `https://braude-habbits-v2-hksm.vercel.app/get_user_personal_data?id=${localStorage.getItem(
          "userID"
        )}`
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const calcpercentage = async () => {
      // console.log("trying to calc");
      try {
        const response = await fetch(
          `https://braude-habbits-v2-hksm.vercel.app/get_user_habits?id=${localStorage.getItem(
            "userID"
          )}`
        );
        if (response.ok) {
          // console.log("response ok");
          const data = await response.json();
          const habits = data.habits;
          const keys = Object.keys(habits);
          const total = keys.length;
          let active = 0;
          const today = new Date().toISOString().split("T")[0];
          // console.log("today: " + today);
          keys.forEach((key) => {
            // console.log(habits[key].events);
            if (habits[key].events.includes(today)) active++;
          });
          const percent = (active / total) * 100;
          // console.log(percent);
          setDailySuccessData([percent, 100 - percent]);
        } else {
          if (response.status == 404) {
            setDailySuccessData(0);
            console.log(dailySuccessData);
          } else throw new Error("failedddd");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    calcpercentage();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const friends_percents = async () => {
        console.log(userData.friends);
        const names = [];
        const percent = [];
        userData.friends.forEach(async (friend) => {
          try {
            const response = await fetch(
              `https://braude-habbits-v2-hksm.vercel.app/get_user_personal_data?id=${friend}`
            );
            if (response.ok) {
              const data = await response.json();
              if (!names.includes(data.name)) names.push(data.name);
            } else {
              throw new Error("Failed to fetch");
            }
          } catch (error) {
            console.log(error.message);
          }
          try {
            const response = await fetch(
              `https://braude-habbits-v2-hksm.vercel.app/get_user_habits?id=${friend}`
            );
            if (response.ok) {
              const data = await response.json();
              const habits = data.habits;
              const keys = Object.keys(habits);
              const total = keys.length;
              let active = 0;
              const today = new Date().toISOString().split("T")[0];
              keys.forEach((key) => {
                if (habits[key].events.includes(today)) active++;
              });
              percent.push((active / total) * 100);
            } else if (response.status == 404) {
              percent.push(0);
            } else {
              throw new Error("Failed to fetch");
            }
          } catch (error) {
            console.log(error.message);
          }
          if (names.length > 0 && percent.length > 0) {
            setCompetitionData({ name: names, percentage: percent });
            console.log(competitionData);
          }
        });
      };
      friends_percents();
    }
  }, [userData]);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Sample data for the pie chart
  // const dailySuccessData = [80, 20]; // 80% success, 20% failure

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error state
  }

  return (
    <div className="mx-auto py-6 sm:px-6 lg:px-8 dark:bg-slate-900">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Hello, {userData.name + " " + userData.surname}
        </h2>
        <div>
          <DashboardIntro />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-2 bg-white border border-slate-900 overflow-hidden shadow rounded-lg p-5 dark:bg-slate-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Competition with Friends
            </h3>
            {competitionData.name.length > 0 ? (
              <BarChart data={competitionData} width={800} height={400} />
            ) : (
              <p>
                you are not connected to any friends yet!<br />please contact the
                dev team to connect to your friends!
              </p>
            )}
          </div>
          <div className="bg-white border border-slate-900 overflow-hidden shadow rounded-lg p-5 dark:bg-slate-800">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Daily Success Rate
            </h3>
            {dailySuccessData != 0 ? (
              <PieChart data={dailySuccessData} isDarkMode={isDarkMode} />
            ) : (
              <p>
                you dont have any habits yet!<br />please add habits in the habits
                page
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
