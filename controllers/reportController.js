const generateExcel = require("../services/excelService");

const executeQuery = require("../services/queryService");

const salesReport = async (req, res) => {
  try {
    const data = await executeQuery({
      intent: "TOTAL_SALES_MONTH",
    });

    const filePath = await generateExcel([data], "monthly-sales");

    return res.download(filePath);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  salesReport,
};
