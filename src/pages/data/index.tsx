import React from 'react';
import { api } from '~/utils/api';
import { RouterOutputs } from '~/utils/api';
import { createColumnHelper, useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import Loading from '~/components/Loading';

type Artist = RouterOutputs['getArtists'][number];
const columnHelper = createColumnHelper<Artist>();
const columns = [
  columnHelper.accessor('artist', {
    header: 'Artist',
    cell: info => info.getValue() 
  }),
  columnHelper.accessor('genre', {
    header: 'Genre',
    cell: info => info.getValue() 
  }),
  columnHelper.accessor('pronoun', {
    header: 'Pronoun(s)',
    cell: info => info.getValue() 
  }),
  columnHelper.accessor('artistUrl', {
    header: 'Artist Profile',
    cell: info => info.getValue() 
  })
]

const ArtistDataTable = () => {
  const { data } = api?.getArtists.useQuery();
  if (!data) return <Loading />;
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <>
      <div className="overflow-hidden border rounded-lg p-2">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table?.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table?.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      </div>
    </>
  );
}
export default ArtistDataTable;