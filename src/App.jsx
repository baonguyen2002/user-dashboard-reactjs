import { useEffect, useState } from "react";

import axios from "axios";

import {
  Card,
  CardContent,
  CardFooter,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import NavBarMobile from "./app-components/navbar-mobile";
import { Button } from "./components/ui/button";
import ReactCSV from "./ReactCSV";
import DisplayTable from "./tanstack-table/display-table";
import AddDialog from "./app-components/add-dialog";
import NavBarDeskTop from "./app-components/navbar-desktop";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [sortedData, setSortedData] = useState(fetchedData);
  const [role, setRole] = useState("all");
  const [sort, setSort] = useState("asc");
  const [searchString, setSearchString] = useState("");
  useEffect(() => {
    fetchData(setFetchedData);
  }, []);
  useEffect(() => {
    if (fetchedData.length > 0) {
      sortAndFilter();
    }
  }, [fetchedData]);

  useEffect(() => {
    sortAndFilter();
  }, [role, searchString, sort]);

  const fetchData = () => {
    setFetchedData([]);
    axios
      .get("https://668a57e42c68eaf3211c8931.mockapi.io/api/user/user")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error fetching data");
      });
  };

  const sortBy = (startingData) => {
    const sortedUsers = startingData;
    sortedUsers.sort((a, b) => {
      switch (sort) {
        case "asc":
          return parseInt(a.id) - parseInt(b.id);
        case "desc":
          return parseInt(b.id) - parseInt(a.id);
        case "fn-asc":
          return a.firstName.localeCompare(b.firstName);
        case "fn-desc":
          return b.firstName.localeCompare(a.firstName);
        case "ln-asc":
          return a.lastName.localeCompare(b.lastName);
        case "ln-desc":
          return b.lastName.localeCompare(a.lastName);
        case "r-asc":
          return a.role.localeCompare(b.role);
        case "r-desc":
          return b.role.localeCompare(a.role);
      }
    });
    return sortedUsers;
  };
  const filterRole = (startingData) => {
    if (role === "all") return startingData;
    const newData = startingData.filter((user) => user.role === role);
    return newData;
  };
  const filterSearch = (startingData) => {
    if (searchString === "") return startingData;
    const searchLower = searchString.toLowerCase();
    const newData = startingData.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchLower) ||
        user.lastName.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phoneNumber.toLowerCase().includes(searchLower)
    );
    return newData;
  };

  const sortAndFilter = () => {
    let startingData = [...fetchedData];
    startingData = sortBy(startingData);
    startingData = filterRole(startingData);
    startingData = filterSearch(startingData);
    setSortedData(startingData);
  };
  return (
    <>
      <div className="min-w-screen min-h-screen w-full lg:flex bg-light1 ">
        <aside className="h-full min-h-screen self-start sticky top-0 hidden lg:block">
          <NavBarDeskTop />
        </aside>
        <div className="w-full">
          <NavBarMobile />
          <Card className="w-10/12 m-auto mb-8 text-light1 border-gray-800 bg-light4 rounded-3xl">
            <CardHeader>
              <div className="flex flex-row items-center justify-between">
                <CardTitle>Users</CardTitle>
                <div className="flex-row hidden gap-4 md:flex">
                  <AddDialog fetchData={fetchData} />
                  <Button className="bg-light1 text-light5 hover:text-light2">
                    <ReactCSV fetchedData={fetchedData} />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-light1">
                Your users
              </CardDescription>
            </CardHeader>
            <div className="flex flex-row items-center justify-between px-4 sm:justify-end sm:gap-4 md:hidden">
              <AddDialog fetchData={fetchData} />
              <Button className="mr-4 md:hidden bg-light1 text-light5 hover:text-light2">
                <ReactCSV fetchedData={fetchedData} />
              </Button>
            </div>

            <CardContent>
              <DisplayTable
                role={role}
                setRole={setRole}
                fetchedData={sortedData}
                fetchData={fetchData}
                searchString={searchString}
                setSearchString={setSearchString}
                sort={sort}
                setSort={setSort}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
