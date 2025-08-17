import React, { useState } from "react";
import PropTypes from "prop-types";

const DataTable = ({ data, columns, loading, selectable, onRowSelect }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);

  const handleSort = (col) => {
    let direction = "asc";
    if (sortConfig?.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRow = (row) => {
    let updated = [];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect && onRowSelect(updated);
  };

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (!data.length) return <p className="p-4 text-gray-500">No data available</p>;

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {selectable && <th className="p-2">Select</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                className="p-2 cursor-pointer"
                onClick={() => col.sortable && handleSort(col)}
              >
                {col.title}
                {col.sortable && sortConfig?.key === col.dataIndex && (
                  <span>{sortConfig.direction === "asc" ? " 🔼" : " 🔽"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 border">
              {selectable && (
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="p-2 border-t">
                  {row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      sortable: PropTypes.bool,
    })
  ).isRequired,
  loading: PropTypes.bool,
  selectable: PropTypes.bool,
  onRowSelect: PropTypes.func,
};

export default DataTable;
