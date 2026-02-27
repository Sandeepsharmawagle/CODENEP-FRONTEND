import { useNavigate } from "react-router-dom";

// Using Unsplash images that represent the four values
const values = [
    {
        label: "QUALITY",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80",
    },
    {
        label: "THRIVING COMMUNITIES",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=500&q=80",
    },
    {
        label: "THOUGHTFUL DESIGN",
        image: "https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=500&q=80",
    },
    {
        label: "SUSTAINABILITY",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=80",
    },
];

const Values = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 bg-white">
            <div className="px-6 mx-auto max-w-7xl md:px-12">
                {/* Header */}
                <div className="w-full text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest text-gray-900 uppercase">
                        Values We Preserve
                    </h2>
                    <p className="mt-5 text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
                        We create spaces that enable Everyday Joys; one community, one family, and one home at a time.
                    </p>
                </div>

                {/* 4-Image Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {values.map(({ label, image }) => (
                        <div
                            key={label}
                            className="relative overflow-hidden rounded-xl aspect-[3/4] group cursor-pointer"
                        >
                            <img
                                src={image}
                                alt={label}
                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            {/* Label at bottom with more padding */}
                            <div className="absolute bottom-7 left-0 right-0 flex justify-center px-3">
                                <span className="text-white text-xs font-bold tracking-[3px] uppercase text-center">
                                    {label}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Explore It Button */}
                <div className="flex justify-center mt-20 mb-4">
                    <button
                        onClick={() => navigate("/projects")}
                        className="px-14 py-4 text-base font-bold border-2 border-gray-800 text-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition-all hover:-translate-y-0.5 cursor-pointer tracking-widest"
                    >
                        EXPLORE IT
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Values;
