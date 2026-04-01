const TESTIMONIALS = [
  {
    name: "Yash Sahu",
    role: "Software Engineer",
    review: "Strong MERN skills and problem-solving ability.",
    color: "#0ea5e9",
    initials: "YS",
  },
  {
    name: "Heather Forster",
    role: "UI/UX Designer",
    review: "Clean code and good design sense.",
    color: "#10b981",
    initials: "HF",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">

      <h2 className="section-title">Testimonials</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="card"
            style={{ borderColor: `${t.color}22`, transition: "all 0.3s ease", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${t.color}55`;
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 0 24px ${t.color}33, 0 8px 32px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = `${t.color}22`;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.4)";
            }}>

            {/* quote mark */}
            <div className="text-5xl font-black leading-none mb-3 select-none"
              style={{ color: `${t.color}25` }}>"</div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "#cbd5e1" }}>
              {t.review}
            </p>

            <div className="flex items-center gap-3">
              {/* avatar */}
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${t.color}, ${t.color}88)`,
                  color: "white",
                }}>
                {t.initials}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#e0f2fe" }}>{t.name}</p>
                <p className="text-xs" style={{ color: t.color }}>{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}