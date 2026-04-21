type ApplicationStatsItem = {
  label: string;
  value: number;
};

type ApplicationStatsProps = {
  stats: ApplicationStatsItem[];
};

export default function ApplicationStats({ stats }: ApplicationStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-6 p-2">
      {stats.map((item) => (
        <div
          key={item.label}
          className="p-4 text-center border border-gray-200 dark:border-gray-800 rounded shadow-sm bg-white dark:bg-gray-900"
        >
          <p className="text-2xl font-bold">{item.value}</p>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
