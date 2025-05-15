"use client";
import React, { useState } from "react";

export default function ContactBooking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkin: "",
    checkout: "",
    roomType: "",
    guests: 1,
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Giả lập gửi form, thực tế sẽ gọi API
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
        padding: 40,
        maxWidth: 480,
        width: "100%"
      }}>
        <h1 style={{textAlign: "center", color: "#232946", marginBottom: 8, fontSize: 32, fontWeight: 800}}>Liên hệ & Đặt phòng</h1>
        <div style={{textAlign: "center", color: "#555", marginBottom: 24, fontSize: 16}}>Vui lòng điền thông tin, chúng tôi sẽ liên hệ xác nhận nhanh nhất!</div>
        {submitted ? (
          <div style={{textAlign: "center", color: "#27ae60", fontWeight: 700, fontSize: 20, padding: "32px 0"}}>
            <i className="fas fa-check-circle" style={{fontSize: 48, color: "#27ae60"}}></i><br/>
            Đã gửi yêu cầu! Chúng tôi sẽ liên hệ bạn sớm nhất.
          </div>
        ) : (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: 18}}>
          <input name="name" type="text" placeholder="Họ và tên" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input name="phone" type="tel" placeholder="Số điện thoại" value={form.phone} onChange={handleChange} required style={inputStyle} />
          <div style={{display: "flex", gap: 12}}>
            <input name="checkin" type="date" value={form.checkin} onChange={handleChange} required style={{...inputStyle, flex: 1}} />
            <input name="checkout" type="date" value={form.checkout} onChange={handleChange} required style={{...inputStyle, flex: 1}} />
          </div>
          <select name="roomType" value={form.roomType} onChange={handleChange} required style={inputStyle}>
            <option value="">Chọn loại phòng</option>
            <option value="Superior">Superior</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Family">Family</option>
            <option value="Presidential">Presidential Suite</option>
          </select>
          <input name="guests" type="number" min={1} max={10} value={form.guests} onChange={handleChange} required style={inputStyle} placeholder="Số khách" />
          <textarea name="message" placeholder="Yêu cầu thêm (nếu có)" value={form.message} onChange={handleChange} rows={3} style={{...inputStyle, resize: "vertical"}} />
          {error && <div style={{color: "#ee4c40", fontWeight: 600, textAlign: "center"}}>{error}</div>}
          <button type="submit" disabled={loading} style={{
            background: loading ? "#ccc" : "#ee4c40",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "14px 0",
            fontWeight: 700,
            fontSize: 18,
            boxShadow: "0 2px 8px rgba(238,76,64,0.10)",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.18s"
          }}>{loading ? "Đang gửi..." : "Gửi yêu cầu"}</button>
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
  background: "#a0a0a0"
};
