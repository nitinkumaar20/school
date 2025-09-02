"use client";

import { useState } from "react";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import AddSchool from "./addSchool";
import ShowSchools from "./showSchools";
import Mobile from "./Mobile";

type Page = {
  params: { page: string };
};

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [page, setPage] = useState<Page>({ params: { page: "home" } });

  const renderPage = () => {
    switch (page.params.page) {
      case "home":
        return (
          <div className="flex-1 bg-gray-100 p-6 overflow-auto">
            <ShowSchools />
          </div>
        );
      case "add":
        return <AddSchool />;
      case "show":
        return <ShowSchools />;

      default:
        return <p>Page not found</p>;
    }
  };

  return (
    <div className="">
      <div className="lg:flex h-screen overflow-hidden hidden">
        {/* Sidebar */}
        <div
          className={`transition-all duration-300 bg-gray-800 text-white ${
            sidebarOpen ? "w-64" : "w-16"
          } `}
        >
          <div
            className={` py-5 mb-4 text-center border-gray-500  font-bold text-2xl ${
              sidebarOpen ? "text-2xl" : "py-[16px] text-sm"
            } border-b `}
          >
            <h1>School</h1>
          </div>

          <nav className="space-y-2 mx-4">
            <SidebarItem
              icon={<HomeIcon className="h-5 w-5" />}
              label="Add School"
              onClick={() => setPage({ params: { page: "add" } })}
              open={sidebarOpen}
            />
            <SidebarItem
              icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
              label="Show Schools"
              onClick={() => setPage({ params: { page: "show" } })}
              open={sidebarOpen}
            />
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600 hover:text-black p-2 rounded-full border border-gray-200"
              >
                {sidebarOpen ? (
                  <ChevronLeftIcon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
              </button>
              <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative text-gray-600">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-100 p-4">
            {renderPage()}
          </main>
        </div>
      </div>
      <div className="lg:hidden block">
        <Mobile />
      </div>
    </div>
  );
}

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  open: boolean;
  small?: boolean;
};

function SidebarItem({ icon, label, onClick, open, small }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-2 py-1 text-left w-full rounded hover:bg-gray-700 ${
        small ? "text-sm pl-6" : ""
      }`}
    >
      {icon}
      {open && <span>{label}</span>}
    </button>
  );
}
