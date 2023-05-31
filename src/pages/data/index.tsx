import React from 'react';
import { api } from '~/utils/api';
import type { RouterOutputs } from '~/utils/api';
import { CSVLink } from 'react-csv';
import { 
  Column,
  Table as ReactTable,
  useReactTable, 
  flexRender, 
  createColumnHelper, 
  getCoreRowModel,
  getFilteredRowModel, 
  getPaginationRowModel
} from '@tanstack/react-table';
import Loading from '~/components/Loading';

const colors =  {
  'left field': 'text-[#99ADFF]/50',
  'acid': 'text-[#F08080]/50',
  'expirimental': 'text-[#A8FF33]/50',
  'bass': 'text-[#3386FF]/50',
  'pop': 'text-[#FF33DD]/50', 
  'uk funky': 'text-[#BF15E9]/50',
  'garage': 'text-[#00C85E]/50',
  'footwerk': 'text-[#FFD134]/50',
  'electro': 'text-[#34FF8D]/50',
  'dancehall': 'text-[#FF34A6]/50',
  'ambient': 'text-[#90FFFD]/50',
  'jungle': 'text-[#3232FF]/50',
  'drum and bass': 'text-[#5132FF]/50',
  'tech house': 'text-[#FFA832]/50',
  'jazz': 'text-[#2325AD]/50',
  'disco': 'text-[#C146F6]/50',
  'dubstep': 'text-[#E6F646]/50',
  'dub': 'text-[#C3F646]/50',
  'techno': 'text-[#e31507]/50', 
  'gqom': 'text-[#',
  ']nu wave': 'text-[#00FFF3]/50',
  'rap': 'text-[#E892FF]/50',
  'hip hop': 'text-[#AA64BD]/50',
  'donk': 'text-[#E540DD]/50',
  'jersey club': 'text-[#F9FF2A]/50',
  'house': 'text-[#2A2DFF]/50',
}

type Artist = RouterOutputs['getArtists'][number];

const columnHelper = createColumnHelper<Artist>();
const columns = [
  columnHelper.accessor('artist', {
    header: 'Artist',
    cell: info => info.getValue() 
  }),
  columnHelper.accessor('genre', {
    header: 'Genre',
    cell: info => <span className={`${colors[info.getValue() as keyof typeof colors]}`}>{info.getValue()}</span>
  }),
  columnHelper.accessor('pronoun', {
    header: 'Pronoun(s)',
    cell: info => info.getValue() 
  }),
  columnHelper.accessor('artistUrl', {
    header: 'Artist Profile',
    cell: info => <a href={info.getValue()}>{info.getValue()}</a>
  })
]

const ArtistDataTable = () => {
  const { data, isLoading } = api.getArtists.useQuery();
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  if (isLoading) return <Loading />

  return (
    <>
      <div className="rounded-lg">
        <table className="min-w-full divide-y divide-black-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                      {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-black-200">
            {table.getRowModel().rows.map(row => (
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

      <footer className="inset-x-0 bottom-0 pt-3 pb-3 bg-gray-100">
        <div className="flex content-center -space-x-px items-center gap-2">  
          <CSVLink data={data ?? []} className="px-4 py-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >
            Download CSV
          </CSVLink>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
            >
            {[10, 25, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#8b72b5]/80 rounded-lg hover:bg-[#8b72b5]"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#8b72b5]/80 rounded-lg hover:bg-[#8b72b5]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            >
            {'<'}
          </button>

          <span className="flex items-center gap-2 ml-50 text-sm">
            <span>
              {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
            </span>
          </span>

          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#8b72b5]/80 rounded-lg hover:bg-[#8b72b5]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            >
            {'>'}
          </button>
          <button
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#8b72b5]/80 rounded-lg hover:bg-[#8b72b5]"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>

          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
        
                table.setPageIndex(page)
              }}
              className="border rounded w-16"
              />
          </span>

          

        </div>
        
      </footer>
  </>
);
}

function Filter({
  column,
  table,
  }: {
  column: Column<any, any>
  table: ReactTable<any>
  }) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={e =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder={`Max`}
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
    <input
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      placeholder={`Search...`}
      className="w-36 border shadow rounded"
    />
  )
}

export default ArtistDataTable;