'use client';
import { ReactNode } from 'react';

export interface Column<T> {
    name: string;
    dataIndex: keyof T;
    render?: (val: T[keyof T]) => ReactNode;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (record: T) => void;
    tableClassName?: string;
    headerClassName?: string;
    headerCellClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
}

export default function Table<T>({
    columns,
    data,
    onRowClick,
    tableClassName = '',
    headerClassName = '',
    headerCellClassName = '',
    rowClassName = '',
    cellClassName = '',
}: Readonly<TableProps<T>>) {
    return (
        <table className={tableClassName}>
            <thead>
                <tr className={headerClassName}>
                    {columns.map((column) => (
                        <th key={column.name} className={headerCellClassName}>
                            {column.name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((cell, rowIndex) => (
                    <tr key={rowIndex} className={rowClassName} onClick={() => onRowClick?.(cell)}>
                        {columns.map((col, colIndex) => (
                            <td key={colIndex} className={cellClassName}>
                                {col.render ? col.render(cell[col.dataIndex]) : String(cell[col.dataIndex])}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
