"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  { name: 'Dashboard', href: '/' },
];

export function DashboardBreadcrumb() {
  const path = usePathname();

  const activeRoutes = routes.filter(route => path.includes(route.href));

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {activeRoutes.map((route, index) => (
          <BreadcrumbItem key={route.href}>
            {index < activeRoutes.length - 1 ? (
              <>
                <BreadcrumbLink asChild>
                  <Link href={route.href} className='text-md font-bold'>{route.name}</Link>
                </BreadcrumbLink>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{route.name}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}