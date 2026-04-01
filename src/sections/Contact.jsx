import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const LINKS = [
  { icon: <FaGithub />, label: "GitHub", sub: "github.com/codecsuman", href: "https://github.com/codecsuman", color: "#38bdf8" },
  { icon: <FaLinkedin />, label: "LinkedIn", sub: "linkedin.com/in/sumanjhanp", href: "https://www.linkedin.com/in/sumanjhanp/", color: "#34d399" },
  { icon: <SiLeetcode />, label: "LeetCode", sub: "leetcode.com/u/sumanjhanp1", href: "https://leetcode.com/u/sumanjhanp1/", color: "#06b6d4" },
  { icon: <FaEnvelope />, label: "Email", sub: "sumanjhanp1@gmail.com", href: "mailto:sumanjhanp1@gmail.com", color: "#2dd4bf" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(""); // "" | "sending" | "success" | "error"
  const [focused, setFocused] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID,
        { from_name: form.name, reply_to: form.email, message: form.message },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field = (name) => ({
    style: {
      background: "rgba(10,28,55,0.85)",
      border: `1px solid ${focused === name ? "rgba(14,165,233,0.6)" : "rgba(14,165,233,0.15)"}`,
      borderRadius: "12px",
      color: "#e0f2fe",
      padding: "13px 16px",
      width: "100%",
      fontFamily: "inherit",
      fontSize: "0.9rem",
      outline: "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: focused === name ? "0 0 0 3px rgba(14,165,233,0.12)" : "none",
      resize: name === "message" ? "vertical" : undefined,
    },
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(""),
  });

  return (
    <section id="contact" className="section" style={{ position: "relative" }}>

      {/* Ambient glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(14,165,233,0.08), transparent 70%)",
          filter: "blur(50px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "380px", height: "380px",
          background: "radial-gradient(circle, rgba(16,185,129,0.07), transparent 70%)",
          filter: "blur(50px)",
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Header */}
        <h2 className="section-title">Get In Touch</h2>

        {/* sub-header */}
        <p style={{ color: "#7ecfcf", fontSize: "0.88rem", marginTop: "-1.2rem", marginBottom: "2.8rem" }}>
          Open to opportunities, collabs, or just a friendly hello 👋
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "2.5rem",
          alignItems: "start",
        }} className="contact-grid">

          {/* ── LEFT — info ── */}
          <div>

            {/* availability pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 16px", borderRadius: "999px", marginBottom: "24px",
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: "#10b981",
                boxShadow: "0 0 8px rgba(16,185,129,0.8)",
                animation: "pulse 2s ease-in-out infinite",
              }} />
              <span style={{ color: "#34d399", fontWeight: 600, fontSize: "0.78rem", letterSpacing: "0.06em" }}>
                AVAILABLE FOR WORK
              </span>
            </div>

            <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "28px", fontSize: "0.92rem" }}>
              I'm always open to new opportunities, collaborations, or just a
              friendly chat about tech. Whether you have a project in mind or
              want to connect — drop me a message!
            </p>

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {LINKS.map(({ icon, label, sub, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: "14px",
                    padding: "13px 16px", borderRadius: "14px",
                    background: `${color}07`,
                    border: `1px solid ${color}1a`,
                    textDecoration: "none",
                    transition: "all 0.22s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${color}15`;
                    e.currentTarget.style.borderColor = `${color}40`;
                    e.currentTarget.style.transform = "translateX(6px)";
                    e.currentTarget.style.boxShadow = `0 4px 20px ${color}18`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `${color}07`;
                    e.currentTarget.style.borderColor = `${color}1a`;
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* icon box */}
                  <div style={{
                    width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${color}15`, color, fontSize: "1.05rem",
                    border: `1px solid ${color}25`,
                  }}>
                    {icon}
                  </div>

                  {/* text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "0.85rem", color: "#e0f2fe" }}>
                      {label}
                    </p>
                    <p style={{
                      margin: 0, fontSize: "0.72rem", color: "#7ecfcf",
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    }}>
                      {sub}
                    </p>
                  </div>

                  <span style={{ color, fontSize: "0.8rem", opacity: 0.6, flexShrink: 0 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── RIGHT — form ── */}
          <div style={{
            background: "rgba(13,33,55,0.75)",
            backdropFilter: "blur(16px)",
            borderRadius: "20px",
            padding: "28px",
            border: "1px solid rgba(14,165,233,0.12)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
            position: "relative", overflow: "hidden",
          }}>

            {/* corner glow */}
            <div style={{
              position: "absolute", top: "-60px", right: "-60px",
              width: "200px", height: "200px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)",
              pointerEvents: "none",
            }} />

            <h3 style={{
              fontSize: "1rem", fontWeight: 800,
              color: "#e0f2fe", marginBottom: "20px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{
                background: "linear-gradient(135deg, #0ea5e9, #10b981)",
                borderRadius: "8px", padding: "5px 7px", fontSize: "0.85rem",
              }}>
                <FaPaperPlane />
              </span>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Name + Email side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }} className="form-row">
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#7ecfcf", marginBottom: "6px", letterSpacing: "0.06em" }}>
                    YOUR NAME
                  </label>
                  <input
                    type="text" name="name" placeholder=" "
                    value={form.name} onChange={handleChange} required
                    {...field("name")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#7ecfcf", marginBottom: "6px", letterSpacing: "0.06em" }}>
                    YOUR EMAIL
                  </label>
                  <input
                    type="email" name="email" placeholder=""
                    value={form.email} onChange={handleChange} required
                    {...field("email")}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: "block", fontSize: "0.72rem", fontWeight: 600, color: "#7ecfcf", marginBottom: "6px", letterSpacing: "0.06em" }}>
                  MESSAGE
                </label>
                <textarea
                  name="message" rows="5" placeholder="Tell me about your project or just say hi..."
                  value={form.message} onChange={handleChange} required
                  {...field("message")}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "13px 24px", borderRadius: "12px", border: "none",
                  background: status === "sending"
                    ? "rgba(14,165,233,0.3)"
                    : "linear-gradient(135deg, #0ea5e9, #10b981)",
                  color: "white", fontWeight: 700, fontSize: "0.88rem",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  transition: "opacity 0.2s, transform 0.2s",
                  boxShadow: status === "sending" ? "none" : "0 4px 20px rgba(14,165,233,0.35)",
                  letterSpacing: "0.03em",
                }}
                onMouseEnter={e => { if (status !== "sending") { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {status === "sending" ? (
                  <>
                    <span style={{
                      width: "14px", height: "14px", borderRadius: "50%",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "white",
                      animation: "spin 0.7s linear infinite",
                      display: "inline-block",
                    }} />
                    Sending...
                  </>
                ) : (
                  <><FaPaperPlane size={13} /> Send Message</>
                )}
              </button>

              {/* Status messages */}
              {status === "success" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 16px", borderRadius: "10px",
                  color: "#34d399",
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  fontSize: "0.85rem", fontWeight: 600,
                }}>
                  <span style={{ fontSize: "1rem" }}>✓</span>
                  Message sent! I'll get back to you soon.
                </div>
              )}
              {status === "error" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "12px 16px", borderRadius: "10px",
                  color: "#f87171",
                  background: "rgba(248,113,113,0.1)",
                  border: "1px solid rgba(248,113,113,0.25)",
                  fontSize: "0.85rem", fontWeight: 600,
                }}>
                  <span style={{ fontSize: "1rem" }}>✕</span>
                  Failed to send. Please try again.
                </div>
              )}

            </form>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row     { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}