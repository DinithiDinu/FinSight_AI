import Papa from "papaparse";
import API from "../services/api";

function ImportCSV({
  fetchTransactions,
}) {

  const handleFileUpload = (
    event
  ) => {

    const file =
      event.target.files[0];

    if (!file) return;

    Papa.parse(file, {

      header: true,

      complete: async (results) => {

        try {

          for (const row of results.data) {

            if (
              !row.amount ||
              !row.category
            ) continue;

            await API.post(
              "/transactions",
              {
                amount:
                  parseFloat(row.amount),

                type:
                  row.type || "expense",

                category:
                  row.category,

                description:
                  row.description || "",

                date:
                  row.date,
              }
            );
          }

          alert(
            "CSV imported successfully!"
          );

          fetchTransactions();

        } catch (error) {

          console.error(error);

          alert(
            "Failed to import CSV"
          );
        }
      },
    });
  };

  return (
    <div>

      <label
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl cursor-pointer transition-all duration-200"
      >
        Import CSV

        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />

      </label>

    </div>
  );
}

export default ImportCSV;