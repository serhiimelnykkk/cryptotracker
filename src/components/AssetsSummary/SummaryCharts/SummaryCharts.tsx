import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { useSelector } from "react-redux";
import { type RootState } from "../../../store";
import { getAssetTotals } from "../../../utils";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const SummaryCharts = () => {
  const assets = useSelector((state: RootState) => state.assets);
  const { totalCost, labels } = assets.reduce(
    (result, asset) => {
      const { cost } = getAssetTotals(asset);
      result.totalCost += cost;
      result.labels.push(asset.coin);

      return result;
    },
    { totalCost: 0, labels: [] as string[] }
  );

  const percents = assets.map((asset) => {
    const { cost } = getAssetTotals(asset);
    return ((cost / totalCost) * 100).toFixed(2);
  });

  return (
    <div style={{ width: "350px", height: "350px", margin: "auto" }}>
      <Doughnut
        data={{ datasets: [{ data: percents }], labels: labels }}
        options={{
          cutout: "60%",
          plugins: {
            colors: {
              enabled: true,
            },
          },
        }}
      />
    </div>
  );
};

export default SummaryCharts;
