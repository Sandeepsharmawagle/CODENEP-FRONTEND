import { useEffect, useState } from "react";
import { fetchServices } from "../services/api";
import { Home, Building2, KeyRound, Handshake } from "lucide-react";

const iconMap = {
  Home: Home,
  Building2: Building2,
  KeyRound: KeyRound,
  Handshake: Handshake,
};

const Services = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchServices()
      .then((res) => {
        const servicesData = res?.data || res;
        setData(servicesData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="services" className="py-20 bg-white md:py-28">
      <div className="px-6 mx-auto max-w-7xl md:px-12">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-amber-500">
            {data?.sectionSubtitle}
          </p>
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            {data?.sectionTitle}
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {data?.services?.map((service) => {
            const IconComponent = iconMap[service.icon] || Home;
            return (
              <div
                key={service.id}
                className="relative overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-md group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Image */}
                <div className="overflow-hidden h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 mb-4 -mt-12 bg-amber-500 rounded-xl shadow-lg relative z-10">
                    <IconComponent className="text-white" size={28} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
