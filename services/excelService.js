// const XLSX = require("xlsx");
// const path = require("path");

// const generateExcel = async (data, fileName) => {
//   try {
//     const workbook = XLSX.utils.book_new();

//     const worksheet = XLSX.utils.json_to_sheet(data);

//     XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

//     const filePath = path.join(__dirname, `../${fileName}.xlsx`);

//     XLSX.writeFile(workbook, filePath);

//     return filePath;
//   } catch (error) {
//     console.log("Excel Error:", error.message);

//     throw error;
//   }
// };

// module.exports = generateExcel;


const XLSX = require("xlsx");
const path = require("path");
const fs = require("fs");

const generateExcel = async (
  data,
  fileName = "report"
) => {
  try {
    const workbook =
      XLSX.utils.book_new();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Report"
    );

    const reportsDir =
      path.join(__dirname, "../reports");

    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const finalFileName =
      `${fileName}-${Date.now()}.xlsx`;

    const filePath = path.join(
      reportsDir,
      finalFileName
    );

    XLSX.writeFile(workbook, filePath);

    return filePath;
  } catch (error) {
    console.log(
      "Excel Error:",
      error.message
    );

    throw error;
  }
};

module.exports = generateExcel;