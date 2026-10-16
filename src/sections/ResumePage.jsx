import { useEffect, useState, useRef } from "react";
import { FaDownload, FaTimes, FaExpand, FaCompress, FaRedo, FaUndo, FaPlus, FaMinus, FaFileDownload } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

/* ============================================================================
   RESUME PAGE — Full-screen PDF viewer with toolbar controls
   ============================================================================ */
export default function ResumePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef(null);
  const viewerRef = useRef(null);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          toggleFullscreen();
        } else {
          navigate(-1); // Go back to previous page
        }
      }
      // Zoom shortcuts
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "=" || e.key === "+") {
          e.preventDefault();
          zoomIn();
        } else if (e.key === "-") {
          e.preventDefault();
          zoomOut();
        } else if (e.key === "0") {
          e.preventDefault();
          resetZoom();
        }
      }
      // Rotation
      if (e.key === "r" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        rotateCw();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, navigate]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await viewerRef.current?.requestFullscreen();
      } catch (err) {
        console.warn("Fullscreen request failed:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
      } catch (err) {
        console.warn("Exit fullscreen failed:", err);
      }
    }
  };

  const zoomIn = () => setZoom((z) => Math.min(z + 0.1, 3));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.3));
  const resetZoom = () => setZoom(1);
  const rotateCw = () => setRotation((r) => (r + 90) % 360);
  const rotateCcw = () => setRotation((r) => (r - 90 + 360) % 360);

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Resume.pdf";
    link.download = "Suman_Jhanp_Resume.pdf";
    link.click();
  };

  const printResume = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.focus();
      iframeRef.current.contentWindow.print();
    }
  };

  const goBack = () => navigate(-1);

  // Transform style for iframe
  const iframeTransform = `scale(${zoom}) rotate(${rotation}deg)`;

  return (
    <div
      ref={viewerRef}
      className="resume-page"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "#0a0a0f",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ===== TOP TOOLBAR ===== */}
      <header
        className="resume-toolbar"
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          background: "rgba(17,17,24,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(139,92,246,0.15)",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Left: Title + Back */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={goBack}
            className="toolbar-btn"
            title="Back (Esc)"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "10px",
              border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(139,92,246,0.08)",
              color: "var(--violet-light)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(139,92,246,0.18)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(139,92,246,0.08)";
              e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)";
            }}
          >
            <FaTimes size={14} /> Back
          </button>

          <div>
            <h1 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>
              📄 Suman Jhanp — Resume
            </h1>
            <p style={{ margin: "2px 0 0", fontSize: "0.7rem", color: "var(--text-muted)" }}>
              Full Stack Developer • MERN Stack • Data Analysis
            </p>
          </div>
        </div>

        {/* Center: Zoom & Rotation Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Rotation */}
          <button onClick={rotateCcw} className="toolbar-btn" title="Rotate Left (Ctrl+R)" style={{ padding: "8px 12px" }}>
            <FaUndo size={16} />
          </button>
          <button onClick={rotateCw} className="toolbar-btn" title="Rotate Right" style={{ padding: "8px 12px" }}>
            <FaRedo size={16} />
          </button>

          <div style={{ width: "1px", height: "28px", background: "rgba(139,92,246,0.2)", margin: "0 8px" }} />

          {/* Zoom */}
          <button onClick={zoomOut} className="toolbar-btn" title="Zoom Out (Ctrl+-)" style={{ padding: "8px 12px" }}>
            <FaMinus size={16} />
          </button>
          <span
            style={{
              minWidth: "50px",
              textAlign: "center",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--violet-light)",
              fontFamily: "monospace",
            }}
          >
            {Math.round(zoom * 100)}%
          </span>
          <button onClick={zoomIn} className="toolbar-btn" title="Zoom In (Ctrl+=)" style={{ padding: "8px 12px" }}>
            <FaPlus size={16} />
          </button>
          <button onClick={resetZoom} className="toolbar-btn" title="Reset Zoom (Ctrl+0)" style={{ padding: "8px 12px", marginLeft: "4px" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 700 }}>100%</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={printResume} className="toolbar-btn" title="Print (Ctrl+P)" style={{ padding: "8px 12px" }}>
            <FaFileDownload size={16} />
          </button>
          <a
            href="/Resume.pdf"
            download="Suman_Jhanp_Resume.pdf"
            className="toolbar-btn primary"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.8rem",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 2px 12px rgba(139,92,246,0.4)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(139,92,246,0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(139,92,246,0.4)";
            }}
          >
            <FaDownload size={14} /> Download
          </a>
          <button
            onClick={toggleFullscreen}
            className="toolbar-btn"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F)"}
            style={{ padding: "8px 12px", marginLeft: "4px" }}
          >
            {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
          </button>
        </div>
      </header>

      {/* ===== PDF VIEWER AREA ===== */}
      <div
        className="resume-viewer"
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
          padding: "20px",
          background: "radial-gradient(ellipse at center, rgba(139,92,246,0.03) 0%, transparent 70%)",
        }}
      >
        {/* Loading indicator */}
        {!pdfLoaded && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              color: "var(--text-secondary)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid rgba(139,92,246,0.2)",
                borderTopColor: "var(--violet)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <p style={{ margin: 0, fontSize: "0.9rem" }}>Loading resume...</p>
          </div>
        )}

        {/* PDF iframe */}
        <iframe
          ref={iframeRef}
          src="/Resume.pdf"
          title="Suman Jhanp Resume"
          onLoad={() => setPdfLoaded(true)}
          style={{
            width: "100%",
            maxWidth: "900px",
            height: "calc(100% - 40px)",
            minHeight: "600px",
            border: "1px solid rgba(139,92,246,0.15)",
            borderRadius: "12px",
            boxShadow: `
              0 0 60px rgba(139,92,246,0.08),
              0 30px 80px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.02)
            `,
            background: "white",
            transform: iframeTransform,
            transformOrigin: "center center",
            transition: "transform 0.15s ease-out",
            display: pdfLoaded ? "block" : "none",
          }}
        />

        {/* Fallback for browsers that don't support iframe PDF */}
        <div
          style={{
            display: pdfLoaded ? "none" : "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            padding: "40px",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            Your browser doesn't support embedded PDF viewing.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
            <a
              href="/Resume.pdf"
              download="Suman_Jhanp_Resume.pdf"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "white",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              <FaDownload size={16} /> Download Resume PDF
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "10px",
                background: "rgba(139,92,246,0.15)",
                color: "var(--violet-light)",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <FaExpand size={14} /> Open in New Tab
            </a>
          </div>
        </div>
      </div>

      {/* ===== BOTTOM HINTS ===== */}
      <footer
        style={{
          position: "relative",
          zIndex: 10,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          flexWrap: "wrap",
          color: "var(--text-muted)",
          fontSize: "0.7rem",
          background: "rgba(10,10,15,0.8)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(139,92,246,0.08)",
        }}
      >
        <kbd style={kbdStyle}>Esc</kbd> Back &nbsp;·&nbsp;
        <kbd style={kbdStyle}>Ctrl + Scroll</kbd> Zoom &nbsp;·&nbsp;
        <kbd style={kbdStyle}>Ctrl + R</kbd> Rotate &nbsp;·&nbsp;
        <kbd style={kbdStyle}>F</kbd> Fullscreen &nbsp;·&nbsp;
        <kbd style={kbdStyle}>Ctrl + P</kbd> Print
      </footer>

      {/* ===== INLINE STYLES ===== */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .toolbar-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          minWidth: 36px;
          height: 36px;
          borderRadius: 9px;
          border: 1px solid rgba(139,92,246,0.15);
          background: rgba(17,17,24,0.9);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .toolbar-btn:hover {
          background: rgba(139,92,246,0.12);
          borderColor: rgba(139,92,246,0.3);
          color: var(--violet-light);
          transform: scale(1.05);
        }
        .toolbar-btn:active { transform: scale(0.98); }
        .toolbar-btn.primary:hover { color: white; }
        
        @media (max-width: 640px) {
          .resume-toolbar { padding: 10px 16px; }
          .resume-toolbar h1 { font-size: 0.95rem; }
          .resume-viewer { padding: 12px; }
        }
      `}</style>
    </div>
  );
}

const kbdStyle = {
  padding: "2px 8px",
  borderRadius: "4px",
  background: "rgba(139,92,246,0.1)",
  border: "1px solid rgba(139,92,246,0.2)",
  color: "var(--violet-light)",
  fontFamily: "monospace",
  fontSize: "0.65rem",
  fontWeight: 600,
};