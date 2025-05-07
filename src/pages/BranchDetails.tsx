import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LocationEntity {
  id: number;
  name: string;
  district: string;
  address: string;
  phone: string;
  manager: string;
  hours: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const BranchAndRootDetails = () => {
  const { location } = useParams<{ location: string }>();
  const [branches, setBranches] = useState<LocationEntity[]>([]);
  const [roots, setRoots] = useState<LocationEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranchAndRootDetails = async () => {
      try {
        const branchResponse = await fetch(`${API_BASE_URL}/branches`);
        const branchData = await branchResponse.json();

        const rootResponse = await fetch(`${API_BASE_URL}/roots`);
        const rootData = await rootResponse.json();

        const filteredBranches = branchData.filter((branch: LocationEntity) =>
          branch.district.toLowerCase() === location?.toLowerCase()
        );
        const filteredRoots = rootData.filter((root: LocationEntity) =>
          root.district.toLowerCase() === location?.toLowerCase()
        );

        setBranches(filteredBranches);
        setRoots(filteredRoots);
      } catch (error) {
        console.error('Error fetching branch and root details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchBranchAndRootDetails();
    }
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-display font-semibold">Loading...</h1>
            <p className="text-gray-600 mt-4">Please wait while we fetch the branch and root details.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (branches.length === 0 && roots.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-28 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-display font-semibold">No Data Found</h1>
            <p className="text-gray-600 mt-4">No branches or roots found for {location}.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-semibold text-center text-gray-800">
            {location} Details
          </h1>

          {branches.length > 0 && (
            <Section title="Branches" items={branches} tag="Branch" color="indigo" />
          )}

          {roots.length > 0 && (
            <Section title="Roots" items={roots} tag="Root" color="green" />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface SectionProps {
  title: string;
  items: LocationEntity[];
  tag: string;
  color: 'indigo' | 'green';
}

const Section = ({ title, items, tag, color }: SectionProps) => (
  <div className="mt-12">
    <h2 className={`text-3xl font-display font-semibold text-center text-${color}-700 mb-8`}>
      {title}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-display font-semibold text-gray-800">{item.name}</h3>
              <span className={`px-3 py-1 text-sm font-medium text-${color}-600 bg-${color}-50 rounded-full`}>
                {tag}
              </span>
            </div>
            <div className="space-y-4 text-gray-600">
              <InfoRow icon="map-pin" label="Address" value={item.address} color={color} />
              <InfoRow icon="phone" label="Phone" value={item.phone} color={color} />
              <InfoRow icon="user" label="Manager" value={item.manager} color={color} />
              <InfoRow icon="clock" label="Open Time" value={item.hours} color={color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InfoRow = ({
  icon,
  label,
  value,
  color,
}: {
  icon: 'map-pin' | 'phone' | 'user' | 'clock';
  label: string;
  value: string;
  color: 'indigo' | 'green';
}) => {
  const icons: Record<string, JSX.Element> = {
    'map-pin': (
      <svg className={`w-5 h-5 text-${color}-500 mt-1 mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    phone: (
      <svg className={`w-5 h-5 text-${color}-500 mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    user: (
      <svg className={`w-5 h-5 text-${color}-500 mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    clock: (
      <svg className={`w-5 h-5 text-${color}-500 mr-3`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className="flex items-start">
      {icons[icon]}
      <p className="flex-1">
        <strong className="text-gray-700">{label}:</strong> {value}
      </p>
    </div>
  );
};

export default BranchAndRootDetails;
