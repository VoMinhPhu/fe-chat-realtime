import Navigation from '@/components/Navigation';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex md:gap-2 h-screen bg-[#f6f6f6] dark:bg-[#121212]">
      <Navigation />
      <div className="flex flex-1">{children}</div>
    </div>
  );
};

export default DashboardLayout;
