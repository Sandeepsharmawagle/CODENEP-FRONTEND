import { useEffect, useState } from "react";
import { fetchTestimonials } from "../services/api";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const CARDS_PER_PAGE = 3;

const Testimonials = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchTestimonials()
      .then((res) => {
        const testData = res?.data || res;
        setData(testData);
      })
      .catch((err) => console.log(err));
  }, []);

  const items = data?.testimonials || [];
  const totalPages = Math.ceil(items.length / CARDS_PER_PAGE);

  const prevPage = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const nextPage = () => setPage((p) => (p + 1) % totalPages);

  const visible = items.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <section id="testimonials" className="py-28 bg-white">
      <div className="px-6 mx-auto max-w-7xl md:px-12">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-block px-5 py-1.5 bg-rose-50 text-rose-400 text-xs font-semibold rounded-full mb-4 border border-rose-100">
            Our Testimonial
          </div>
          <h2 className="text-4xl font-bold text-gray-900">
            {data?.sectionTitle || "Clients Feedback"}
          </h2>
        </div>

        {/* 3-Column Cards with Side Arrows */}
        <div className="relative flex items-center gap-4">
          {/* Left Arrow */}
          {totalPages > 1 && (
            <button
              onClick={prevPage}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white text-gray-500 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Cards Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-6"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < (item.rating || 5) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-500 text-sm leading-relaxed flex-1">
                  {item.text}
                </p>

                {/* Avatar + Name */}
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    {item.role && (
                      <p className="text-xs text-gray-400">{item.role}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {totalPages > 1 && (
            <button
              onClick={nextPage}
              className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-200 hover:bg-amber-500 hover:border-amber-500 hover:text-white text-gray-500 transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Page Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${i === page ? "bg-amber-500 w-6" : "bg-gray-200 w-2.5"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
