'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductsTable({
  offset,
  totalProducts
}: {
  offset: number;
  totalProducts: number;
}) {
  const router = useRouter();
  const productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                id: 1,
                name: 'Product A',
                status: 'Available',
                price: '$10.00',
                totalSales: 100,
                createdAt: '2023-01-01',
              },
              {
                id: 2,
                name: 'Product B',
                status: 'Out of Stock',
                price: '$20.00',
                totalSales: 50,
                createdAt: '2023-02-01',
              },
              {
                id: 3,
                name: 'Product C',
                status: 'Available',
                price: '$15.00',
                totalSales: 75,
                createdAt: '2023-03-01',
              },
            ].map((product) => (
              <TableRow key={product.id}>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <img
                    src={`https://via.placeholder.com/100?text=${product.name}`}
                    alt={product.name}
                    className="w-10 h-10 object-cover"
                  />
                </TableHead>
                <TableHead>{product.name}</TableHead>
                <TableHead>{product.status}</TableHead>
                <TableHead className="hidden md:table-cell">{product.price}</TableHead>
                <TableHead className="hidden md:table-cell">{product.totalSales}</TableHead>
                <TableHead className="hidden md:table-cell">{product.createdAt}</TableHead>
                <TableHead>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableHead>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
