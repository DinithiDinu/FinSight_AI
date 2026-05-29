import Papa from "papaparse";

function ExportCSVButton({
  transactions,
}) {

  const exportCSV = () => {

    const csv = Papa.unparse(
      transactions
    );

    const blob = new Blob(
      [csv],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "transactions.csv"
    );

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition-all duration-200"
    >
      Export CSV
    </button>
  );
}

export default ExportCSVButton;