import { useEffect, useMemo, useState } from 'react';
import Papa from 'papaparse';

const useGetVehicleData = () => {
  const [csvData, setCsvData] = useState(null);

  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('../../public/Electric_Vehicle_Population_Data.csv'); // Update the path as needed
        const text = await response.text();
        Papa.parse(text, {
          header: true, // Automatically converts CSV rows to JSON objects
          skipEmptyLines: true,
          complete: (results) => {
            setCsvData(results.data); // Store parsed JSON
          },
        });
      } catch (error) {
        console.error('Error fetching the CSV file:', error);
      }
    };

    fetchCSV();
  }, []);
console.log(csvData,"csv data")
  return useMemo(() => {
    if (!csvData) return null;

    // Example transformation: Add unique IDs and filter invalid rows
    return csvData
      .filter((row) => row.Name && row.Email) // Filter rows with Name and Email
      .map((row, index) => ({
        id: index + 1,
        name: row.Name.trim(),
        email: row.Email.trim(),
      }));
  }, [csvData]);
};

export default useGetVehicleData;