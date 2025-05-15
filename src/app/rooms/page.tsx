"use client";
import React, { useState } from "react";

const rooms = [
  {
    name: "Superior",
    price: "1.200.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Wifi miễn phí", "TV", "Mini Bar", "View thành phố"],
    people: 2,
    size: "25m²",
    reviews: "Phòng sạch sẽ, view đẹp, giá hợp lý."
  },
  {
    name: "Deluxe",
    price: "1.800.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Ban công", "Bồn tắm", "Sofa", "Máy pha cà phê"],
    people: 3,
    size: "32m²",
    reviews: "Không gian rộng, tiện nghi, rất hài lòng."
  },
  {
    name: "Suite",
    price: "2.500.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Phòng khách riêng", "Bếp nhỏ", "View biển", "Bồn tắm lớn"],
    people: 4,
    size: "50m²",
    reviews: "Phòng sang trọng, view biển tuyệt vời, dịch vụ tốt."
  }
];

export default function RoomsPage() {
  const [selected, setSelected] = useState(0);
  const [imgIdx, setImgIdx] = useState(0);
  const room = rooms[selected];

  const nextImg = () => setImgIdx((imgIdx + 1) % room.images.length);
  const prevImg = () => setImgIdx((imgIdx - 1 + room.images.length) % room.images.length);

  return (
    <div style={{maxWidth: 600, margin: "40px auto", background: "#fff", borderRadius: 18, boxShadow: "0 4px 24px rgba(0,0,0,0.10)", overflow: "hidden"}}>
      <div style={{position: "relative", height: 320, background: "#eee"}}>
        <img src={room.images[imgIdx]} alt={room.name} style={{width: "100%", height: 320, objectFit: "cover"}} />
        <button onClick={prevImg} style={{position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 20, cursor: "pointer"}}>&lt;</button>
        <button onClick={nextImg} style={{position: "absolute", top: "50%", right: 10, transform: "translateY(-50%)", background: "rgba(0,0,0,0.4)", color: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, fontSize: 20, cursor: "pointer"}}>&gt;</button>
        <div style={{position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8}}>
          {room.images.map((_, i) => (
            <span key={i} style={{width: 10, height: 10, borderRadius: "50%", background: i === imgIdx ? "#ee4c40" : "#fff", border: "1px solid #ee4c40", display: "inline-block", cursor: "pointer"}} onClick={() => setImgIdx(i)}></span>
          ))}
        </div>
      </div>
      <div style={{padding: 28, background: "#fff"}}>
        <div style={{display: "flex", gap: 16, marginBottom: 18}}>
          {rooms.map((r, i) => (
            <button key={r.name} onClick={() => {setSelected(i); setImgIdx(0);}} style={{background: i === selected ? "#ee4c40" : "#e9e9e9", color: i === selected ? "#fff" : "#232329", border: "none", borderRadius: 16, padding: "8px 18px", fontWeight: 700, cursor: "pointer"}}>{r.name}</button>
          ))}
        </div>
        <h2 style={{margin: "8px 0 12px 0", color: "#232329"}}>{room.name}</h2>
        <div style={{fontSize: 22, color: "#ee4c40", fontWeight: 700, marginBottom: 10}}>{room.price}</div>
        <div style={{marginBottom: 10}}><b>Tiện ích:</b> {room.amenities.join(", ")}</div>
        <div style={{marginBottom: 10}}><b>Số người phù hợp:</b> {room.people}</div>
        <div style={{marginBottom: 10}}><b>Diện tích:</b> {room.size}</div>
        <div style={{marginBottom: 10}}><b>Nhận xét:</b> <i></i></div>
      </div>
    </div>
  );
}
