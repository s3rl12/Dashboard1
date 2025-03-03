// ListSede.jsx
import React from "react";
import {
  RiBuildingFill,
  RiMapPin2Fill,
  RiUserFill,
} from "@remixicon/react";
import { IconUser } from '@tabler/icons-react';
import { IconBuildings } from '@tabler/icons-react';
import { IconMapPin } from '@tabler/icons-react';
import Card from '../../../components/ui/Card';


function ListSede() {
  // Datos específicos para el tab "In progress"
  const inProgress = {
    status: "Activas",
    orders: [
      {
        item: "Distrito fiscal Madre de Dios",
        company: "Big Tech Ltd.",
        location: "Paris, France",
        contact: "Lena Stone",
        fulfillmentActual: 8,
        fulfillmentTotal: 10,
        lastUpdated: "2min ago",
      },
      {
        item: "LED Monitor",
        company: "Bitclick Holding",
        location: "Zurich, Switzerland",
        contact: "Matthias Ruedi",
        fulfillmentActual: 3,
        fulfillmentTotal: 4,
        lastUpdated: "5min ago",
      },
      {
        item: "Conference Speaker",
        company: "Cornerstone LLC",
        location: "Frankfurt, Germany",
        contact: "David Mueller",
        fulfillmentActual: 2,
        fulfillmentTotal: 4,
        lastUpdated: "10d ago",
      },
    ],
  };

  const statusColor =
    "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/20";

  return (
    <div className="space-y-4 pb-6 pt-2">
      {inProgress.orders.map((order) => (
        <Card key={order.item}>
          <div className="flex items-center justify-between space-x-4 sm:justify-start sm:space-x-2">
            <h4 className="truncate text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {order.item}
            </h4>
            <span
              className={`inline-flex items-center whitespace-nowrap rounded px-1.5 py-0.5 text-tremor-label font-medium ring-1 ring-inset ${statusColor}`}
              aria-hidden="true"
            >
              {inProgress.status}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
            <div className="flex items-center space-x-1">
              <IconBuildings
                className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                aria-hidden="true"
              />
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {order.company}
              </p>
            </div>
            <div className="flex items-center space-x-1.5">
              <IconMapPin
                className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                aria-hidden="true"
              />
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {order.location}
              </p>
            </div>
            <div className="flex items-center space-x-1.5">
              <IconUser
                className="size-5 text-tremor-content-subtle dark:text-dark-tremor-content-subtle"
                aria-hidden="true"
              />
              <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {order.contact}
              </p>
            </div>
          </div>
          
        </Card>
      ))}
    </div>
  );
}

export default ListSede;
