import { Document, Model, FilterQuery } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

interface IBaseDocument extends Document {
  createdAt?: Date;
}

export async function generateLast12MonthsData<T extends IBaseDocument>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i + 1,
      0
    );

    const monthYear = startDate.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    const count = await model.countDocuments({
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    } as FilterQuery<T>);
    last12Months.unshift({ month: monthYear, count });
  }
  return { last12Months };
}