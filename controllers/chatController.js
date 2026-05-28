
const parseUserQuery = require("../services/aiParserService");

const executeQuery = require("../services/queryService");

const generateExcel = require("../services/excelService");

const chat = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query required",
      });
    }

    const parsedQuery = await parseUserQuery(query);

    const data = await executeQuery(parsedQuery);

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }

    if (parsedQuery.exportExcel) {
      const filePath = await generateExcel(
        Array.isArray(data) ? data : [data],
        parsedQuery.intent.toLowerCase(),
      );

      return res.download(filePath, "report.xlsx");
    }

    return res.status(200).json({
      success: true,
      parsedQuery,
      data,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  chat,
};
