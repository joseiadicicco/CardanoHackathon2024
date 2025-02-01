import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface PieChartVoteProps {
  dataValues?: number[];
}

export const PieChartVote: React.FC<PieChartVoteProps> = (props) => {

  const { dataValues } = props;
  const data = {
    labels: ['Yes', 'No', 'Abstain'],
    datasets: [
      {
        label: 'My First Dataset',
        data: dataValues,
        backgroundColor: [
          '#317f43',
          '#A52019',
          '#E5BE01',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
      <Pie data={data} />
  );
};


