"use client";
import React, { useState } from "react";

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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #232946 60%, #005bea 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 0"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 8px 32px rgba(35,41,70,0.13)",
        padding: 56,
        maxWidth: 600,
        width: "100%"
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
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 8,
  border: "1px solid #ccc",
  fontSize: 16,
  outline: "none",
  background: "#f7f7fa",
  color: "#232946",
  marginBottom: 0,
  // placeholder color handled by global CSS
};
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
