import Link from 'next/link';
import NavLinks from '@/app/ui/navlinks';

export default function SideNav() {
  return (
    <div className="flex h-2 w-full flex-row my-10 justify-center items-center">
        <NavLinks />
    </div>
  );
}