import Image from 'next/image';

const NoOneDashboard = () => {
  return (
    <div className="border w-full m-4 ml-0 rounded-lg flex items-center justify-center">
      <Image
        src="/message-dashboard.svg"
        priority
        width={600}
        height={400}
        alt="no-one"
        className="h-auto opacity-80"
      />
    </div>
  );
};

export default NoOneDashboard;
