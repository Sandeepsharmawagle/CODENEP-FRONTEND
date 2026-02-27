import { useEffect, useState } from "react";
import { fetchContact, submitEnquiry } from "../services/api";

const Contact = () => {
  const [data, setData] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchContact()
      .then((res) => {
        const contactData = res?.data || res;
        setData(contactData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitEnquiry(form);
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSending(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  // Google Maps embed — use address from DB or fallback
  const mapSrc = data?.mapEmbedUrl ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.6!2d77.3!3d28.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdd5c9f!2sReal%20Estate%20Road!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="px-6 mx-auto max-w-6xl md:px-12">
        <div className="grid md:grid-cols-2 overflow-hidden rounded-xl shadow-sm border border-gray-200 bg-white">

          {/* LEFT — Form */}
          <div className="px-8 py-10 md:px-10 md:py-12 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Us</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded focus:outline-none focus:border-gray-400 transition-colors"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded resize-none focus:outline-none focus:border-gray-400 transition-colors"
              />

              {status === "success" && (
                <p className="text-sm text-green-600 font-medium">Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500 font-medium">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="px-8 py-2.5 text-sm font-bold text-white bg-gray-900 rounded hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {sending ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>

          {/* RIGHT — Google Map */}
          <div className="hidden md:block h-full min-h-[400px]">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
