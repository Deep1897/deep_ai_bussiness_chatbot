const askGroq = require("./groqService");

const parseUserQuery = async (query) => {
  try {
    const normalizedQuery = query.trim().toLowerCase();

    const exportExcel =
      normalizedQuery.includes("download") ||
      normalizedQuery.includes("export") ||
      normalizedQuery.includes("excel") ||
      normalizedQuery.includes("xlsx") ||
      normalizedQuery.includes("report") ||
      normalizedQuery.includes("sheet") ||
      normalizedQuery.includes("file");

    const intentMap = [
      {
        intent: "LOW_STOCK",
        keywords: [
          "low stock",
          "stock low",
          "out of stock",
          "less stock",
          "inventory low",
        ],
      },

      {
        intent: "PENDING_ORDERS",
        keywords: ["pending order", "pending orders", "incomplete orders"],
      },

      {
        intent: "TOTAL_SALES_MONTH",
        keywords: [
          "total sales",
          "monthly sales",
          "sales this month",
          "month sales",
          "sales amount",
        ],
      },

      {
        intent: "TOP_CUSTOMERS",
        keywords: ["top customer", "best customer", "high purchase customer"],
      },

      {
        intent: "TOP_SELLING_PRODUCTS",
        keywords: ["top selling", "best selling", "most sold"],
      },

      {
        intent: "LAST_COMPLETED_ORDERS",
        keywords: ["completed order", "completed orders", "last completed"],
      },
     
    ];

    for (const item of intentMap) {
      const matched = item.keywords.some((keyword) =>
        normalizedQuery.includes(keyword),
      );

      if (matched) {
        return {
          intent: item.intent,
          exportExcel,
        };
      }
    }

    const priceRegex = /(?:under|below|less than)\s*(\d+)/i;

    const priceMatch = normalizedQuery.match(priceRegex);

    if (priceMatch) {
      return {
        intent: "PRODUCTS_UNDER_PRICE",
        price: Number(priceMatch[1]),
        exportExcel,
      };
    }

    const cityRegex = /(?:from|in)\s([a-zA-Z]+)/i;

    const cityMatch = normalizedQuery.match(cityRegex);

    if (normalizedQuery.includes("customer") && cityMatch) {
      return {
        intent: "CUSTOMERS_BY_CITY",
        city: cityMatch[1],
        exportExcel,
      };
    }

    const messages = [
      {
        role: "system",
        content: `
You are an AI business assistant.

Convert user query into VALID JSON ONLY.

Available intents:

TOTAL_SALES_MONTH
TOP_CUSTOMERS
LOW_STOCK
PRODUCTS_UNDER_PRICE
PENDING_ORDERS
LAST_COMPLETED_ORDERS
TOP_SELLING_PRODUCTS
CUSTOMERS_BY_CITY

IMPORTANT:
Detect if user wants excel export.

Return format:

{
 "intent":"LOW_STOCK",
 "exportExcel":true
}

JSON only.
No markdown.
No explanation.
`,
      },
      {
        role: "user",
        content: query,
      },
    ];

    const response = await askGroq(messages);

    const cleanResponse = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanResponse);
  } catch (error) {
    console.log("AI Parser Error:", error.message);

    return {
      intent: "UNKNOWN",
      exportExcel: false,
      originalQuery: query,
    };
  }
};

module.exports = parseUserQuery;
