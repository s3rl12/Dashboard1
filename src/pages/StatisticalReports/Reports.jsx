// Reports.jsx
import React, { useState } from "react";
import {
  RiSettings3Line,
  RiTruckLine,
  RiTimeLine,
} from "@remixicon/react";
import { IconBuildings, IconFilePlus } from '@tabler/icons-react'

import { TabNavigation, TabNavigationLink } from "../../pages/DocumentManager/Documents-components/TabNavigation";
import ListSede from "./Components/ListSede";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("In progress");

  return (
    <div className="p-2 space-y-4">
      <div>
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Reports
        </h3>
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Check status of recent reports
        </p>
      </div>

      <TabNavigation>
        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "In progress"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("In progress");
          }}
        >
          <IconBuildings className="size-4" aria-hidden="true" />
          In progress
        </TabNavigationLink>

        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "Delivering"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("Delivering");
          }}
        >
          <IconFilePlus className="size-4" aria-hidden="true" />
          Delivering
        </TabNavigationLink>

        <TabNavigationLink
          className="inline-flex gap-2"
          href="#"
          active={activeTab === "Delayed"}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab("Delayed");
          }}
        >
          <RiTimeLine className="size-4" aria-hidden="true" />
          Delayed
        </TabNavigationLink>
      </TabNavigation>

      {activeTab === "In progress" && <ListSede />}
      {activeTab === "Delivering" && (
        <div className="p-6">
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Delivering reports content goes here...
          </p>
        </div>
      )}
      {activeTab === "Delayed" && (
        <div className="p-6">
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Delayed reports content goes here...
          </p>
        </div>
      )}
    </div>
  );
}
