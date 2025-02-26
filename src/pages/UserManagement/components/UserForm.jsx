// 'use client';
import { useState } from 'react';
import {
    Textarea,
} from '@tremor/react';
import { Input } from '../../../components/ui/Input';
import { Label } from '../../../components/ui/Label';
//import { Divider } from "@tremor/react";
import { Select, SelectItem, SelectTrigger, SelectContent } from '../../../components/dashboard/Select';
import { Divider } from '../../../components/ui/Divider';
import { RadioGroup } from '@headlessui/react';
import { RiCheckboxCircleFill, RiCheckLine } from '@remixicon/react';

// Datos para el RadioGroup
const workspaces = [
    {
        id: 1,
        title: 'Notificaciones Diarias',
        description: 'Recibe actualizaciones diarias de todas las actividades',
        users: 'Básico'
    },
    {
        id: 2,
        title: 'Notificaciones en Tiempo Real',
        description: 'Alertas inmediatas para acciones críticas',
        users: 'Premium'
    },
    {
        id: 3,
        title: 'Sin Notificaciones',
        description: 'Solo notificaciones esenciales del sistema',
        users: 'Minimalista'
    },
];

// Componente para detalles de características
const PackageDetails = ({ workspaceId }) => {
    const features = {
        1: ['Resumen matutino', 'Reporte de actividad diaria', 'Alertas de seguridad'],
        2: ['Alertas de acceso', 'Notificaciones de transacciones', 'Monitoreo en vivo'],
        3: ['Actualizaciones del sistema', 'Mantenimiento programado']
    };

    return (
        <div className="mt-6">
            <p className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Incluye:
            </p>
            <ul role="list" className="mt-2 space-y-2">
                {features[workspaceId].map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                        <RiCheckLine
                            className="size-5 text-tremor-content dark:text-dark-tremor-content"
                            aria-hidden={true}
                        />
                        <span className="text-tremor-default text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            {feature}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default function UserForm() {
    const [selectedWorkspace, setSelectedWorkspace] = useState(workspaces[0]);
    return (
        <>
            <form className='pt-5'>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Personal information
                        </h2>
                        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                        </p>
                    </div>
                    <div className="sm:max-w-3xl md:col-span-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                            <div className="col-span-full sm:col-span-3">
                                <Label htmlFor="first-name" className="text-tremor-default font-medium">
                                    First name
                                </Label>
                                <Input
                                    type="text"
                                    id="first-name"
                                    name="first-name"
                                    autoComplete="given-name"
                                    placeholder="Emma"
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Label htmlFor="last-name" className="text-tremor-default font-medium">
                                    Last name
                                </Label>
                                <Input
                                    type="text"
                                    id="last-name"
                                    name="last-name"
                                    autoComplete="family-name"
                                    placeholder="Crown"
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-full">
                                <Label htmlFor="email" className="text-tremor-default font-medium">
                                    Email
                                </Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="emma@company.com"
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Label htmlFor="birthyear" className="text-tremor-default font-medium">
                                    Birth year
                                </Label>
                                <Input
                                    type="number"
                                    id="birthyear"
                                    name="year"
                                    placeholder="1990"
                                    enableStepper={false}
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <Label htmlFor="role" className="text-tremor-default font-medium">
                                    Role
                                </Label>
                                <Input
                                    type="text"
                                    id="role"
                                    name="role"
                                    placeholder="Senior Manager"
                                    disabled
                                    className="mt-2"
                                />
                                <p className="mt-2 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    Roles can only be changed by system admin.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className="my-5" />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Workspace settings
                        </h2>
                        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                        </p>
                    </div>
                    <div className="sm:max-w-3xl md:col-span-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                            <div className="col-span-full sm:col-span-3">
                                <Label htmlFor="workspace-name" className="text-tremor-default font-medium">
                                    Workspace name
                                </Label>
                                <Input
                                    type="text"
                                    id="workspace-name"
                                    name="workspace-name"
                                    placeholder="Test workspace"
                                    className="mt-2"
                                />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label className="text-tremor-default font-medium text-tremor-content-strong">
                                    Rol
                                </label>
                                <Select>
                                    <SelectTrigger className="mt-2 w-full">
                                        Seleccionar rol
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Administrador</SelectItem>
                                        <SelectItem value="user">Usuario</SelectItem>
                                        <SelectItem value="guest">Invitado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="workspace-description"
                                    className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
                                >
                                    Workspace description
                                </label>
                                <Textarea
                                    id="workspace-description"
                                    name="workspace-description"
                                    className="mt-2"
                                    rows={4}
                                />
                                <p className="mt-2 text-tremor-label text-tremor-content dark:text-dark-tremor-content">
                                    Note: description provided will not be displayed externally.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className="my-5" />
                <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                    <div>
                        <h2 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Notification settings
                        </h2>
                        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                            Selecciona tu preferencia de notificaciones
                        </p>
                    </div>

                    {/* Nuevo RadioGroup */}
                    <div className="sm:max-w-3xl md:col-span-2">
                        <RadioGroup
                            value={selectedWorkspace}
                            onChange={setSelectedWorkspace}
                            name="notificationSettings"
                        >
                            <RadioGroup.Label className="text-tremor-default font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                Configuración de notificaciones
                            </RadioGroup.Label>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {workspaces.map((item) => (
                                    <RadioGroup.Option
                                        key={item.id}
                                        value={item}
                                        className={({ active }) =>
                                            `relative flex cursor-pointer rounded-lg border p-4 transition ${active
                                                ? 'border-tremor-brand ring-2 ring-tremor-brand-muted dark:border-dark-tremor-brand-subtle'
                                                : 'border-tremor-border dark:border-dark-tremor-border'
                                            } bg-tremor-background dark:bg-dark-tremor-background`
                                        }
                                    >
                                        {({ checked }) => (
                                            <>
                                                <div className="flex w-full flex-col justify-between">
                                                    <div>
                                                        <RadioGroup.Label className="block text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                            {item.title}
                                                        </RadioGroup.Label>
                                                        <p className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    <span className="mt-4 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                                        {item.users}
                                                    </span>
                                                </div>
                                                <RiCheckboxCircleFill
                                                    className={`size-5 shrink-0 text-tremor-brand dark:text-dark-tremor-brand ${!checked ? 'invisible' : ''
                                                        }`}
                                                    aria-hidden={true}
                                                />
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                            <PackageDetails workspaceId={selectedWorkspace.id} />
                        </RadioGroup>
                    </div>
                </div>
            </form>
        </>
    );
}