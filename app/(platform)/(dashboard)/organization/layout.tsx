import Sidebar from "../_components/sidebar";

const OrganiationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="pt-20 px-4 md:pt-24 max-w-6xl 2xl:max-w-screen-2xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 hidden shrink-0 md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default OrganiationLayout;
