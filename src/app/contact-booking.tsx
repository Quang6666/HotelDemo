"use client";
import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";

const today = new Date().toISOString().split("T")[0];

type BookingForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  checkin: string;
  guests: number;
  purpose: string;
  stay: number;
  room: string;
  services: string[];
};

export default function ContactBooking() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingForm>({
    name: "",
    email: "",
    phone: "",
    address: "",
    checkin: today,
    guests: 1,
    purpose: "Du lịch",
    stay: 1,
    room: "",
    services: [],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => {
        const arr = prev.services;
        return { ...prev, services: checked ? [...arr, value] : arr.filter(v => v !== value) };
      });
    } else if (type === "number") {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    setError("");
    if (step === 1 && (!form.name || !form.email || !form.phone || !form.address)) {
      setError("Vui lòng nhập đầy đủ thông tin cá nhân.");
      return;
    }
    if (step === 2 && (!form.checkin || !form.guests || !form.purpose || !form.stay)) {
      setError("Vui lòng nhập đầy đủ thông tin đặt phòng.");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  // Tạo dữ liệu sao lấp lánh chỉ 1 lần phía client để tránh hydration error
  const stars = useMemo(() => {
    return Array.from({ length: 38 }).map(() => {
      const cx = Math.random() * 100;
      const cy = Math.random() * 30 + 2;
      const r = Math.random() * 1.2 + 0.8;
      const dur = (1.2 + Math.random() * 1.8).toFixed(2);
      const delay = (Math.random() * 2.5).toFixed(2);
      return { cx, cy, r, dur, delay };
    });
  }, []);

  return (
    <>
      {/* Nút quay lại trang chủ: luôn nằm trên cùng, tách biệt hoàn toàn, zIndex cao nhất */}
      <Link
        href="/"
        style={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 1003, // cao hơn mọi hiệu ứng nền, sao lấp lánh, bảng form
          textDecoration: "none",
          minWidth: 120,
          display: "inline-block",
          ...backButtonStyle,
          width: "auto",
          padding: "12px 28px",
          marginTop: 0
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = '#fff';
          (e.currentTarget as HTMLElement).style.color = '#b71c1c';
          (e.currentTarget as HTMLElement).style.border = '2px solid #b71c1c';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = '#d32f2f';
          (e.currentTarget as HTMLElement).style.color = '#fff';
          (e.currentTarget as HTMLElement).style.border = 'none';
        }}
      >
        <i className="fas fa-arrow-left" style={{marginRight: 8}}></i> Quay lại Trang Chủ
      </Link>
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #232946 60%, #005bea 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 0",
        position: "relative"
      }}>
        {/* Hiệu ứng nền động: bầu trời đêm, mặt trăng, mây đen, wave, sao lấp lánh */}
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}>
          {/* Bầu trời đêm */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "55%",
            background: "linear-gradient(180deg, #232946 70%, rgba(35,41,70,0.0) 100%)"
          }} />
          {/* Mặt trăng */}
          <svg width="100%" height="100%" style={{position: "absolute", top: 0, left: 0}}>
            <circle cx="84%" cy="22%" r="32" fill="#fffbe8" filter="url(#moonGlow)" />
            <defs>
              <filter id="moonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
          {/* Mây đen động (Cirrus) */}
          <svg width="100%" height="70%" style={{position: "absolute", top: 0, left: 0}}>
            {Array.from({length: 3}).map((_, i) => {
              const baseY = 33 + i*7;
              const baseX = 18 + i*28;
              const dur = 18 + i*4;
              return (
                <g key={i} style={{opacity: 0.55 + 0.15*i}}>
                  <g>
                    <ellipse cx={`${baseX}%`} cy={`${baseY}%`} rx="1000" ry="22" fill="#232329" opacity="0.82">
                      <animate attributeName="cx" values={`${baseX}%;${baseX+12}%;${baseX}%`} dur={`${dur}s`} repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={`${baseX+16}%`} cy={`${baseY+3}%`} rx="76" ry="15" fill="#232329" opacity="0.7">
                      <animate attributeName="cx" values={`${baseX+16}%;${baseX+24}%;${baseX+16}%`} dur={`${dur+3}s`} repeatCount="indefinite" />
                    </ellipse>
                    <ellipse cx={`${baseX-20}%`} cy={`${baseY+4}%`} rx="56" ry="10" fill="#232329" opacity="0.6">
                      <animate attributeName="cx" values={`${baseX-20}%;${baseX-12}%;${baseX-20}%`} dur={`${dur+2}s`} repeatCount="indefinite" />
                    </ellipse>
                  </g>
                </g>
              );
            })}
          </svg>
          {/* Wave động nền dưới */}
          <svg
            style={{position: "absolute", bottom: 0, left: 0, width: "100%", height: "45%", zIndex: 0, pointerEvents: "none"}}
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradientCB" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00c6fb">
                  <animate attributeName="stop-color" values="#00c6fb;#005bea;#00c6fb" dur="8s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" stopColor="#005bea">
                  <animate attributeName="stop-color" values="#005bea;#00c6fb;#005bea" dur="8s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <path
              id="wave1cb"
              d="M0,400 Q360,350 720,400 T1440,400 V600 H0 Z"
              fill="url(#waveGradientCB)"
              opacity="0.18"
            >
              <animate 
                attributeName="d"
                dur="7s"
                repeatCount="indefinite"
                values="
                  M0,400 Q360,350 720,400 T1440,400 V600 H0 Z;
                  M0,410 Q360,370 720,390 T1440,410 V600 H0 Z;
                  M0,400 Q360,350 720,400 T1440,400 V600 H0 Z
                "
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                calcMode="spline"
              />
            </path>
            <path
              id="wave2cb"
              d="M0,480 Q360,430 720,480 T1440,480 V600 H0 Z"
              fill="url(#waveGradientCB)"
              opacity="0.12"
            >
              <animate 
                attributeName="d"
                dur="9s"
                repeatCount="indefinite"
                values="
                  M0,480 Q360,430 720,480 T1440,480 V600 H0 Z;
                  M0,470 Q360,450 720,470 T1440,470 V600 H0 Z;
                  M0,480 Q360,430 720,480 T1440,480 V600 H0 Z
                "
                keyTimes="0;0.5;1"
                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                calcMode="spline"
              />
            </path>
          </svg>
          {/* Sao lấp lánh phía trên mây - zIndex thấp hơn nút back */}
          {isClient && (
            <svg width="100%" height="32%" style={{position: "absolute", top: 0, left: 0, zIndex: 1001, pointerEvents: "none"}}>
              {stars.map((star, i) => (
                <circle key={i} cx={`${star.cx}%`} cy={`${star.cy}%`} r={star.r} fill="#fff" opacity="0.85">
                  <animate attributeName="opacity" values="0.2;1;0.2" dur={`${star.dur}s`} begin={`${star.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="r" values={`${star.r};${star.r*2.2};${star.r}`} dur={`${star.dur}s`} begin={`${star.delay}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </svg>
          )}
        </div>
        {/* Bảng form đặt phòng */}
        <div style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(35,41,70,0.13)",
          padding: 56,
          maxWidth: 600,
          width: "100%",
          position: "relative",
          zIndex: 2
        }}>
          <h1 style={{textAlign: "center", color: "#1a237e", marginBottom: 12, fontSize: 32, fontWeight: 900, fontFamily: 'Segoe UI', letterSpacing: 0.5}}>Liên hệ & Đặt phòng</h1>
          <div style={{textAlign: "center", color: "#444", marginBottom: 28, fontSize: 16, fontFamily: 'Segoe UI', fontWeight: 500}}>Điền thông tin theo từng bước, chúng tôi sẽ liên hệ xác nhận nhanh nhất!</div>
          {submitted ? (
            <div style={{textAlign: "center", color: "#27ae60", fontWeight: 700, fontSize: 20, padding: "32px 0"}}>
              <i className="fas fa-check-circle" style={{fontSize: 48, color: "#27ae60"}}></i><br/>
              Đã gửi yêu cầu! Chúng tôi sẽ liên hệ bạn sớm nhất.
            </div>
          ) : (
          <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 18}} autoComplete="off">
            {step === 1 && (
              <div>
                <div style={tableTitle}>Thông tin cá nhân khách hàng</div>
                <div style={tableRow}><input name="name" type="text" placeholder="Họ và tên" value={form.name} onChange={handleChange} required style={inputStyleFull} /></div>
                <div style={tableRow}><input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyleFull} /></div>
                <div style={tableRow}><input name="phone" type="tel" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} required style={inputStyleFull} /></div>
                <div style={tableRow}><input name="address" type="text" placeholder="Địa chỉ liên lạc" value={form.address} onChange={handleChange} required style={inputStyleFull} /></div>
                {error && <div style={errorStyle}>{error}</div>}
                <button
                  type="button"
                  onClick={handleNext}
                  style={buttonStyle}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#fff';
                    e.currentTarget.style.color = '#d63a2a';
                    e.currentTarget.style.border = '2px solid #d63a2a';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#ee4c40';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.border = 'none';
                  }}
                >Tiếp tục</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div style={tableTitle}>Thông tin đặt phòng</div>
                <div style={{...tableRow, display: 'flex', alignItems: 'center', gap: 12}}>
                  <label style={labelStyle}>Chọn ngày đặt</label>
                  <input name="checkin" type="date" min={today} value={form.checkin} onChange={handleChange} required style={inputStyleFull} />
                </div>
                <div style={{...tableRow, display: 'flex', alignItems: 'center', gap: 12}}>
                  <label style={labelStyle}>Bạn đi mấy người</label>
                  <input name="guests" type="number" min={1} max={10} value={form.guests} onChange={handleChange} required style={inputStyleFull} placeholder="Số người" />
                </div>
                <div style={{...tableRow, display: 'flex', alignItems: 'center', gap: 12}}>
                  <label style={labelStyle}>Bạn đặt phòng để</label>
                  <select name="purpose" value={form.purpose} onChange={handleChange} required style={inputStyleFull}>
                    <option value="Du lịch">Du lịch</option>
                    <option value="Nghỉ Dưỡng">Nghỉ Dưỡng</option>
                    <option value="Công Tác">Công Tác</option>
                  </select>
                </div>
                <div style={{...tableRow, display: 'flex', alignItems: 'center', gap: 12}}>
                  <label style={labelStyle}>Bạn muốn ở lại bao lâu</label>
                  <input name="stay" type="number" min={1} max={30} value={form.stay} onChange={handleChange} required style={inputStyleFull} placeholder="Số ngày ở lại" />
                </div>
                {error && <div style={errorStyle}>{error}</div>}
                <div style={{display: 'flex', gap: 12, marginTop: 8}}>
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    style={backButtonStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#b71c1c';
                      e.currentTarget.style.border = '2px solid #b71c1c';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#d32f2f';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.border = 'none';
                    }}
                  >Back</button>
                  <button
                    type="button"
                    onClick={handleNext}
                    style={buttonStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#d63a2a';
                      e.currentTarget.style.border = '2px solid #d63a2a';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ee4c40';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.border = 'none';
                    }}
                  >Tiếp tục</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div style={tableTitle}>Lựa chọn Phòng</div>
                <div style={tableRow}>
                  <select name="room" value={form.room} onChange={handleChange} required style={inputStyleFull}>
                    <option value="">Chọn phòng</option>
                    <option value="Superior">Superior</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Family">Family</option>
                    <option value="Presidential">Presidential Suite</option>
                  </select>
                </div>
                <div style={tableRow}>
                  <label style={{color: '#232946', fontWeight: 600, marginBottom: 4, display: 'block'}}>Dịch vụ thêm:</label>
                  <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                    <label style={checkboxLabel}><input type="checkbox" name="services" value="Ăn sáng" checked={form.services.includes("Ăn sáng")} onChange={handleChange} /> Ăn sáng</label>
                    <label style={checkboxLabel}><input type="checkbox" name="services" value="Đưa đón sân bay" checked={form.services.includes("Đưa đón sân bay")} onChange={handleChange} /> Đưa đón sân bay</label>
                    <label style={checkboxLabel}><input type="checkbox" name="services" value="Spa" checked={form.services.includes("Spa")} onChange={handleChange} /> Spa</label>
                    <label style={checkboxLabel}><input type="checkbox" name="services" value="Hồ bơi" checked={form.services.includes("Hồ bơi")} onChange={handleChange} /> Hồ bơi</label>
                  </div>
                </div>
                <div style={{display: 'flex', gap: 12, marginTop: 8}}>
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    style={backButtonStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#b71c1c';
                      e.currentTarget.style.border = '2px solid #b71c1c';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#d32f2f';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.border = 'none';
                    }}
                  >Back</button>
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => setStep(4)}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#d63a2a';
                      e.currentTarget.style.border = '2px solid #d63a2a';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ee4c40';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.border = 'none';
                    }}
                  >Tổng kết</button>
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <div style={tableTitle}>Tổng kết</div>
                <div style={{marginBottom: 18, background: '#f7f7fa', borderRadius: 10, padding: 18, color: '#232946', fontSize: 18, boxShadow: '0 2px 8px rgba(35,41,70,0.06)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
                  <div>{form.name}</div>
                  <div>{form.email}</div>
                  <div>{form.phone}</div>
                  <div>{form.address}</div>
                  <div>Ngày nhận phòng: {form.checkin}</div>
                  <div>Số người: {form.guests}</div>
                  <div>Mục đích: {form.purpose}</div>
                  <div>Số ngày ở lại: {form.stay}</div>
                  <div>Phòng đã chọn: {form.room}</div>
                  <div>Dịch vụ thêm: {form.services.length > 0 ? form.services.join(', ') : 'Không có'}</div>
                </div>
                <div style={{display: 'flex', gap: 12, marginTop: 8}}>
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    style={backButtonStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#b71c1c';
                      e.currentTarget.style.border = '2px solid #b71c1c';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#d32f2f';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.border = 'none';
                    }}
                  >Back</button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={buttonStyle}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#d63a2a';
                      e.currentTarget.style.border = '2px solid #d63a2a';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#ee4c40';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.border = 'none';
                    }}
                  >{loading ? "Đang gửi..." : "Xác nhận"}</button>
                </div>
              </div>
            )}
          </form>
          )}
        </div>
      </div>
    </>
  );
}

const inputStyleFull: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 18px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 18,
  outline: "none",
  background: "#f7f7fa",
  color: "#232946",
  marginBottom: 0,
};
const tableTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 22,
  color: "#1976d2",
  marginBottom: 20,
  textAlign: "center",
  fontFamily: 'Segoe UI',
  letterSpacing: 0.2,
  textTransform: 'uppercase'
};
const tableRow: React.CSSProperties = {
  marginBottom: 14
};
const buttonStyle: React.CSSProperties = {
  background: "#ee4c40",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "14px 0",
  fontWeight: 700,
  fontSize: 18,
  boxShadow: "0 2px 8px rgba(238,76,64,0.10)",
  cursor: "pointer",
  width: "100%",
  marginTop: 8,
  transition: "background 0.18s, transform 0.18s, box-shadow 0.18s",
  outline: "none",
  position: "relative",
  overflow: "hidden"
};
const errorStyle: React.CSSProperties = {
  color: "#ee4c40",
  fontWeight: 600,
  textAlign: "center",
  marginBottom: 8
};
const checkboxLabel: React.CSSProperties = {
  color: '#232946',
  fontWeight: 500,
  fontSize: 15,
  fontFamily: 'Segoe UI',
  letterSpacing: 0.1
};
const labelStyle: React.CSSProperties = {
  minWidth: 170,
  color: "#232946",
  fontWeight: 700,
  fontSize: 16,
  marginRight: 0,
  fontFamily: 'Segoe UI',
  letterSpacing: 0.1
};
const backButtonStyle: React.CSSProperties = {
  background: "#d32f2f",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "14px 0",
  fontWeight: 700,
  fontSize: 18,
  boxShadow: "0 2px 8px rgba(238,76,64,0.10)",
  cursor: "pointer",
  width: "100%",
  marginTop: 8,
  transition: "background 0.18s, transform 0.18s, box-shadow 0.18s",
  outline: "none",
  position: "relative",
  overflow: "hidden"
};
