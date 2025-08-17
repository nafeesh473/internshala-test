import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

function App() {
 

  const [data, setData] = useState([
    { id: 1, name: "John Doe", age: 24 },
    { id: 2, name: "Alice", age: 29 },
  ]);

  // Form ke fields
  const [form, setForm] = useState({
    id: "",
    name: "",
    age: "",
  });

  // Columns define
  const columns = [
    { key: "col1", title: "ID", dataIndex: "id", sortable: true },
    { key: "col2", title: "Name", dataIndex: "name", sortable: true },
    { key: "col3", title: "Age", dataIndex: "age", sortable: true },
  ];
    const [errors, setErrors] = useState({});

  // Form change handler
   const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" }); // error hata do jab user likhna start kare
  };

  // Form submit
   const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.id) newErrors.id = "ID is required";
    if (!form.name) newErrors.name = "Name is required";
    if (!form.age) newErrors.age = "Age is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setData([...data, { id: form.id, name: form.name, age: form.age }]);
    setForm({ id: "", name: "", age: "" });
    setErrors({});
  };

  return (
    <>
  <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Dynamic Form + Table Demo</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <InputField
          label="ID"
          value={form.id}
          onChange={handleChange("id")}
          placeholder="Enter ID"
          clearable
            invalid={!!errors.id}
          errorMessage={errors.id}
        />
        <InputField
          label="Name"
          value={form.name}
          onChange={handleChange("name")}
          placeholder="Enter Name"
          clearable
            invalid={!!errors.name}
          errorMessage={errors.name}
        />
        <InputField
          label="Age"
          value={form.age}
          onChange={handleChange("age")}
          placeholder="Enter Age"
          clearable
          invalid={!!errors.age}
          errorMessage={errors.age}
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Add to Table
        </button>
      </form>

      {/* Table */}
      <DataTable
        data={data}
        columns={columns}
        selectable
        onRowSelect={(rows) => console.log("Selected Rows:", rows)}
      />
    </div>
    </>
  )
}

export default App
