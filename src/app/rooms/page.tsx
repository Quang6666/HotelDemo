"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  },
  {
    name: "Family Room",
    price: "2.000.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["2 giường đôi", "Bàn làm việc", "Tủ lạnh", "Phòng tắm riêng"],
    people: 4,
    size: "40m²",
    reviews: "Phòng rộng rãi, phù hợp gia đình, tiện nghi đầy đủ."
  },
  {
    name: "Executive",
    price: "3.000.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Phòng họp riêng", "Bồn tắm Jacuzzi", "Máy pha cà phê", "View toàn cảnh"],
    people: 2,
    size: "45m²",
    reviews: "Không gian sang trọng, dịch vụ cao cấp, rất hài lòng cho công tác." 
  },
  {
    name: "Presidential Suite",
    price: "6.000.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Phòng khách lớn", "Bếp riêng", "Bồn tắm sang trọng", "Ban công rộng"],
    people: 6,
    size: "100m²",
    reviews: "Đẳng cấp, tiện nghi tuyệt vời, trải nghiệm như tổng thống!"
  }
];

function RoomCard({ room }: { room: typeof rooms[0] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [btnAnim, setBtnAnim] = useState<{left: boolean; right: boolean}>({left: false, right: false});
  const nextImg = () => {
    setBtnAnim(a => ({...a, right: true}));
    setTimeout(() => setBtnAnim(a => ({...a, right: false})), 180);
    setImgIdx((imgIdx + 1) % room.images.length);
  };
  const prevImg = () => {
    setBtnAnim(a => ({...a, left: true}));
    setTimeout(() => setBtnAnim(a => ({...a, left: false})), 180);
    setImgIdx((imgIdx - 1 + room.images.length) % room.images.length);
  };
  return (
    <div
      style={{
        width: 320,
        margin: "24px 16px",
        background: "#fff",
        borderRadius: 16,
        boxShadow: hovered ? "0 8px 32px rgba(238,76,64,0.18)" : "0 2px 12px rgba(0,0,0,0.10)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "scale(1.045)" : "scale(1)",
        transition: "transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s cubic-bezier(.4,2,.3,1)",
        cursor: "pointer"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{position: "relative", height: 180, background: "#eee"}}>
        <Image src={room.images[imgIdx]} alt={room.name} width={320} height={180} style={{width: "100%", height: 180, objectFit: "cover"}} />
        <button
          onClick={prevImg}
          style={{
            position: "absolute", top: "50%", left: 8, transform: "translateY(-50%)",
            background: btnAnim.left ? "#ee4c40" : "rgba(0,0,0,0.38)",
            color: btnAnim.left ? "#fff" : "#fff",
            border: btnAnim.left ? "2px solid #ee4c40" : "2px solid #fff",
            borderRadius: "50%", width: 32, height: 32, fontSize: 18, cursor: "pointer",
            outline: "none",
            boxShadow: btnAnim.left ? "0 0 0 4px rgba(238,76,64,0.12)" : "0 2px 8px rgba(0,0,0,0.10)",
            transition: "background 0.18s, border 0.18s, box-shadow 0.18s, transform 0.18s cubic-bezier(.4,2,.3,1)",
            transformOrigin: "center",
            ...(btnAnim.left ? {transform: "translateY(-50%) scale(1.25)"} : {})
          }}
          aria-label="Ảnh trước"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: "block", margin: "auto"}}>
            <path d="M10.5 13L6 8L10.5 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={nextImg}
          style={{
            position: "absolute", top: "50%", right: 8, transform: "translateY(-50%)",
            background: btnAnim.right ? "#ee4c40" : "rgba(0,0,0,0.38)",
            color: btnAnim.right ? "#fff" : "#fff",
            border: btnAnim.right ? "2px solid #ee4c40" : "2px solid #fff",
            borderRadius: "50%", width: 32, height: 32, fontSize: 18, cursor: "pointer",
            outline: "none",
            boxShadow: btnAnim.right ? "0 0 0 4px rgba(238,76,64,0.12)" : "0 2px 8px rgba(0,0,0,0.10)",
            transition: "background 0.18s, border 0.18s, box-shadow 0.18s, transform 0.18s cubic-bezier(.4,2,.3,1)",
            transformOrigin: "center",
            ...(btnAnim.right ? {transform: "translateY(-50%) scale(1.25)"} : {})
          }}
          aria-label="Ảnh sau"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: "block", margin: "auto"}}>
            <path d="M5.5 13L10 8L5.5 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div style={{position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6}}>
          {room.images.map((_, i) => (
            <span key={i} style={{width: 8, height: 8, borderRadius: "50%", background: i === imgIdx ? "#ee4c40" : "#fff", border: "1px solid #ee4c40", display: "inline-block", cursor: "pointer"}} onClick={() => setImgIdx(i)}></span>
          ))}
        </div>
      </div>
      <div style={{padding: 16, background: "#fff", display: "flex", flexDirection: "column", gap: 6}}>
        <h2 style={{margin: "0 0 4px 0", color: "#232329", fontSize: 20}}>{room.name}</h2>
        <div style={{fontSize: 18, color: "#ee4c40", fontWeight: 700, marginBottom: 4}}>{room.price}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Tiện ích:</b> {room.amenities.join(", ")}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Số người phù hợp:</b> {room.people}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Diện tích:</b> {room.size}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Nhận xét:</b> <i>&ldquo;{room.reviews}&rdquo;</i></div>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perRow = 3;
  const perCol = 5;
  const perPage = perRow * perCol;

  return (
    <div style={{position: "relative", padding: "32px 0", background: "#23262d", minHeight: "100vh", overflow: "hidden"}}>
      {/* SVG wave động nền */}
      <svg
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none"}}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ee4c40">
              <animate attributeName="stop-color" values="#ee4c40;#3a8dde;#ee4c40" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#232329">
              <animate attributeName="stop-color" values="#232329;#ee4c40;#232329" dur="8s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        {/* Wave 1: animate d để sóng lắc lư qua lại, không bị ngắt quãng */}
        <path
          id="wave1"
          d="M0,400 Q360,350 720,400 T1440,400 V600 H0 Z"
          fill="url(#waveGradient)"
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
        {/* Wave 2: animate d với pha lệch để tạo hiệu ứng sóng chồng */}
        <path
          id="wave2"
          d="M0,480 Q360,430 720,480 T1440,480 V600 H0 Z"
          fill="url(#waveGradient)"
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
      {/* Nội dung chính */}
      <div style={{position: "relative", zIndex: 1}}>
        <div style={{maxWidth: 700, margin: "0 auto 24px auto", display: "flex", alignItems: "center", gap: 16}}>
          <Link href="/" style={{background: "#ee4c40", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontWeight: 700, textDecoration: "none", fontSize: 16, cursor: "pointer"}}>← Trang chủ</Link>
          <input
            type="text"
            placeholder="Tìm kiếm phòng, tiện ích..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{flex: 1, padding: "10px 16px", borderRadius: 8, border: "1px solid #ccc", fontSize: 16}}
          />
        </div>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, maxWidth: perRow*340, margin: "0 auto"}}>
          {(() => {
            const filteredRooms = rooms.filter(room =>
              room.name.toLowerCase().includes(search.toLowerCase()) ||
              room.amenities.join(",").toLowerCase().includes(search.toLowerCase())
            );
            const totalPages = Math.ceil(filteredRooms.length / perPage);
            const pagedRooms = filteredRooms.slice((page-1)*perPage, page*perPage);
            return pagedRooms.length === 0 ? (
              <div style={{color: "#ee4c40", fontWeight: 700, fontSize: 18, marginTop: 32}}>Không tìm thấy phòng phù hợp.</div>
            ) : (
              pagedRooms.map((room) => (
                <RoomCard key={room.name} room={room} />
              ))
            );
          })()}
        </div>
        {/* Phân trang */}
        {(() => {
          const filteredRooms = rooms.filter(room =>
            room.name.toLowerCase().includes(search.toLowerCase()) ||
            room.amenities.join(",").toLowerCase().includes(search.toLowerCase())
          );
          const totalPages = Math.ceil(filteredRooms.length / perPage);
          return totalPages > 1 && (
            <div style={{display: "flex", justifyContent: "center", gap: 8, marginTop: 32}}>
              <button onClick={() => setPage(page-1)} disabled={page===1} style={{padding: "8px 14px", borderRadius: 6, border: "none", background: page===1?"#ccc":"#ee4c40", color: "#fff", fontWeight: 700, cursor: page===1?"not-allowed":"pointer"}}>&lt;</button>
              {Array.from({length: totalPages}).map((_,i)=>(
                <button key={i} onClick={()=>setPage(i+1)} style={{padding: "8px 14px", borderRadius: 6, border: "none", background: page===i+1?"#ee4c40":"#fff", color: page===i+1?"#fff":"#232329", fontWeight: 700, cursor: "pointer"}}>{i+1}</button>
              ))}
              <button onClick={() => setPage(page+1)} disabled={page===totalPages} style={{padding: "8px 14px", borderRadius: 6, border: "none", background: page===totalPages?"#ccc":"#ee4c40", color: "#fff", fontWeight: 700, cursor: page===totalPages?"not-allowed":"pointer"}}>&gt;</button>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
