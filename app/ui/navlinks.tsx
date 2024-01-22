'use client'; //for usePathname() hook

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import {
    UserPlusIcon,
    TableCellsIcon,
  } from '@heroicons/react/24/outline';

// Map of links to display in the NavBar.
const links = [
  {
     name: 'Schedules', 
     href: '/', 
     icon: TableCellsIcon 
  },
  {
    name: 'Add Employee',
    href: '/add-employee',
    icon: UserPlusIcon,
  },
  {
    name: 'Insert Workshift',
    href: '/insert-workshift',
    icon: UserPlusIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex flex-row h-2 items-center justify-center rounded-md bg-inherit p-7 mx-4 text-lg font-bold hover:bg-orange-50 hover:text-orange-600",
              {
                'bg-orange-100 text-orange-600': pathname === link.href, //if selected
              }
           )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden ml-1 md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
