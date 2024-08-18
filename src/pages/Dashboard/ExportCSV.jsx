import Papa from "papaparse";

const ExportCSV = ({ data }) => {
  const handleDownload = () => {
    const csv = Papa.unparse(data);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="btn button text-white" onClick={handleDownload}>
      Download Expense - CSV
    </button>
  );
};

export default ExportCSV;
