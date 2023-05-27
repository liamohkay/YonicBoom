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
  }),
  columnHelper.accessor('songUrl', {
    header: 'Song',
    cell: info => info.getValue() 
  }),
]

const ArtistDataTable = () => {
  const { data } = api?.getArtists.useQuery();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  if (!data) return <Loading />;

  return (
    <>
      <div className="p-2">
        <table>
          <thead>
            {table?.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
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
          <tbody>
            {table?.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
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