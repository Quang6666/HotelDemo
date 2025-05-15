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
  },
  {
    name: "Business Room",
    price: "1.600.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Bàn làm việc", "Wifi tốc độ cao", "TV", "Mini Bar"],
    people: 2,
    size: "28m²",
    reviews: "Phòng tiện nghi cho công tác, yên tĩnh, sạch sẽ."
  },
  {
    name: "Standard",
    price: "1.000.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Wifi miễn phí", "TV", "Điều hòa", "Tủ lạnh"],
    people: 2,
    size: "22m²",
    reviews: "Giá tốt, phòng sạch, đủ tiện nghi cơ bản."
  },
  {
    name: "Twin Room",
    price: "1.300.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["2 giường đơn", "TV", "Tủ lạnh", "Phòng tắm riêng"],
    people: 2,
    size: "26m²",
    reviews: "Phòng phù hợp bạn bè, tiện nghi ổn."
  },
  {
    name: "King Room",
    price: "2.200.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Giường King", "Bồn tắm lớn", "Ban công", "View thành phố"],
    people: 2,
    size: "35m²",
    reviews: "Phòng rộng, view đẹp, giường lớn thoải mái."
  },
  {
    name: "Studio",
    price: "1.700.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Bếp nhỏ", "Bàn ăn", "TV", "Wifi miễn phí"],
    people: 2,
    size: "30m²",
    reviews: "Phòng tiện nghi, phù hợp ở dài ngày."
  },
  {
    name: "Penthouse",
    price: "7.000.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Sân thượng riêng", "Bồn tắm sang trọng", "View toàn cảnh", "Phòng khách lớn"],
    people: 8,
    size: "150m²",
    reviews: "Không gian đẳng cấp, cực kỳ sang trọng."
  },
  {
    name: "Single Room",
    price: "900.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Giường đơn", "Wifi miễn phí", "TV"],
    people: 1,
    size: "18m²",
    reviews: "Phòng nhỏ gọn, giá rẻ, phù hợp đi công tác."
  },
  {
    name: "Triple Room",
    price: "1.900.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["3 giường đơn", "Bàn làm việc", "Tủ lạnh", "Phòng tắm riêng"],
    people: 3,
    size: "38m²",
    reviews: "Phòng rộng, phù hợp nhóm bạn hoặc gia đình nhỏ."
  },
  {
    name: "Queen Room",
    price: "2.000.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["Giường Queen", "Ban công", "Bồn tắm", "View thành phố"],
    people: 2,
    size: "33m²",
    reviews: "Phòng đẹp, tiện nghi, giường lớn."
  },
  {
    name: "Connecting Room",
    price: "2.400.000đ/đêm",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
    ],
    amenities: ["2 phòng thông nhau", "2 phòng tắm", "Bếp nhỏ", "TV"],
    people: 5,
    size: "60m²",
    reviews: "Rất tiện cho gia đình đông người hoặc nhóm bạn."
  }
];

function RoomCard({ room }: { room: typeof rooms[0] & { status?: string } }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [btnAnim, setBtnAnim] = useState<{left: boolean; right: boolean}>({left: false, right: false});
  // Hiệu ứng tự chuyển ảnh đơn giản (không slide)
  React.useEffect(() => {
    if (hovered) return;
    const timer = setInterval(() => {
      setImgIdx(idx => (idx + 1) % room.images.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [hovered, room.images.length]);
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
  // Trạng thái phòng: mặc định random cho demo
  const status = room.status || (room.name.length % 2 === 0 ? "Còn trống" : "Đang thương lượng");
  const statusColor = status === "Còn trống" ? "#27ae60" : "#f7b731";
  return (
    <div
      style={{
        width: 320,
        minHeight: 480,
        margin: "24px 16px",
        background: "#fff",
        borderRadius: 16,
        boxShadow: hovered ? "0 8px 32px rgba(238,76,64,0.18)" : "0 2px 12px rgba(0,0,0,0.10)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        transform: hovered ? "scale(1.045)" : "scale(1)",
        transition: "transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s cubic-bezier(.4,2,.3,1)",
        cursor: "pointer"
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{position: "relative", height: 180, background: "#eee", flexShrink: 0}}>
        {/* Trạng thái góc trên trái, chỉ hiện màu, không chữ "trạng thái" */}
        <div style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 2,
          background: statusColor,
          width: 18,
          height: 18,
          borderRadius: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          border: "2px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }} title={status}>
        </div>
        <Image src={room.images[imgIdx]} alt={room.name} width={320} height={180} style={{width: "100%", height: 180, objectFit: "cover", borderTopLeftRadius: 16, borderTopRightRadius: 16}} />
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
      <div style={{padding: 16, background: "#fff", display: "flex", flexDirection: "column", gap: 6, flex: 1, minHeight: 220, justifyContent: "flex-start"}}>
        <h2 style={{margin: "0 0 4px 0", color: "#232329", fontSize: 20}}>{room.name}</h2>
        <div style={{fontSize: 18, color: "#ee4c40", fontWeight: 700, marginBottom: 4}}>{room.price}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Tiện ích:</b> {room.amenities.join(", ")}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Số người phù hợp:</b> {room.people}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Diện tích:</b> {room.size}</div>
        <div style={{marginBottom: 2, color: "#232329", fontSize: 14}}><b>Nhận xét:</b> <i>&ldquo;{room.reviews}&rdquo;</i></div>
        {/* Nút xem chi tiết căn giữa dưới cùng */}
        <div style={{display: "flex", justifyContent: "center", marginTop: "auto", marginBottom: 0, flexGrow: 1, alignItems: "flex-end"}}>
          <a href="/rooms" style={{
            background: "#ee4c40",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 28px",
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
            boxShadow: "0 2px 8px rgba(238,76,64,0.10)",
            transition: "background 0.18s, box-shadow 0.18s, transform 0.18s",
            cursor: "pointer",
            minWidth: 120,
            textAlign: "center",
            display: "inline-block"
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#d63a2a'}
          onMouseLeave={e => e.currentTarget.style.background = '#ee4c40'}
          >Xem chi tiết</a>
        </div>
      </div>
    </div>
  );
}

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  return (
    <div style={{
      position: "relative",
      padding: "32px 0",
      background: "#232946", // bầu trời đêm đậm hơn
      minHeight: "100vh",
      overflow: "hidden"
    }}>
      {/* Bầu trời đêm với sao lấp lánh */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "55%",
        zIndex: 0,
        pointerEvents: "none",
        background: "linear-gradient(180deg, #232946 70%, rgba(35,41,70,0.0) 100%)"
      }}>
        {/* Sao băng xen kẽ để chồng lên nhau */}
        <g style={{mixBlendMode: "lighten"}}>
        {(() => {
          // Chỉ render sao băng, loại bỏ sao lấp lánh
          const numMeteors = 3;
          const meteorElements = Array.from({length: numMeteors}).map((_, meteorIdx) => {
            const mSeed = 9000 + meteorIdx * 100;
            function mRand(j: number) {
              const x = Math.sin(mSeed + j) * 10000;
              return x - Math.floor(x);
            }
            const startX = mRand(1) * 80 + 10; // 10% - 90%
            const startY = mRand(2) * 30 + 5;  // 5% - 35%
            const len = mRand(3) * 60 + 60;    // 60-120px
            const delay = (mRand(4) * 4).toFixed(2);
            const x1 = `${startX}%`;
            const y1 = `${startY}%`;
            const x2 = `${startX + 0.8}%`;
            const y2 = `${startY + 0.8}%`;
            const x1_2 = `${startX + len}%`;
            const y1_2 = `${startY + len * 0.25}%`;
            const x2_2 = `${startX + len + 0.8}%`;
            const y2_2 = `${startY + len * 0.25 + 0.8}%`;
            return (
              <g key={"meteor-"+meteorIdx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#fff"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  opacity="0.95"
                  filter="drop-shadow(0 0 16px #fff)"
                >
                  <animate attributeName="x1" values={`${x1};${x1_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="y1" values={`${y1};${y1_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="x2" values={`${x2};${x2_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="y2" values={`${y2};${y2_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="opacity" values="0.95;1;0" keyTimes="0;0.2;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                </line>
              </g>
            );
          });
          return meteorElements;
        })()}
        </g>
      </div>
      {/* SVG wave động nền */}
      <svg
        style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none"}}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00c6fb">
              <animate attributeName="stop-color" values="#00c6fb;#005bea;#00c6fb" dur="8s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#005bea">
              <animate attributeName="stop-color" values="#005bea;#00c6fb;#005bea" dur="8s" repeatCount="indefinite" />
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
      <svg width="100%" height="100%" style={{position: "absolute", top: 0, left: 0}}>
        {/* Mặt trăng */}
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
        {/* Chồng sao băng lên cả vùng mặt trăng */}
        <g style={{mixBlendMode: "lighter"}}>
        {(() => {
          // Chỉ render sao băng, loại bỏ sao lấp lánh
          const numMeteors = 3;
          const meteorElements = Array.from({length: numMeteors}).map((_, meteorIdx) => {
            const mSeed = 9000 + meteorIdx * 100;
            function mRand(j: number) {
              const x = Math.sin(mSeed + j) * 10000;
              return x - Math.floor(x);
            }
            const startX = mRand(1) * 80 + 10; // 10% - 90%
            const startY = mRand(2) * 30 + 5;  // 5% - 35%
            const len = mRand(3) * 60 + 60;    // 60-120px
            const delay = (mRand(4) * 4).toFixed(2);
            const x1 = `${startX}%`;
            const y1 = `${startY}%`;
            const x2 = `${startX + 0.8}%`;
            const y2 = `${startY + 0.8}%`;
            const x1_2 = `${startX + len}%`;
            const y1_2 = `${startY + len * 0.25}%`;
            const x2_2 = `${startX + len + 0.8}%`;
            const y2_2 = `${startY + len * 0.25 + 0.8}%`;
            return (
              <g key={"meteor-"+meteorIdx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#fff"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  opacity="0.95"
                  filter="drop-shadow(0 0 16px #fff)"
                >
                  <animate attributeName="x1" values={`${x1};${x1_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="y1" values={`${y1};${y1_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="x2" values={`${x2};${x2_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="y2" values={`${y2};${y2_2}`} keyTimes="0;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                  <animate attributeName="opacity" values="0.95;1;0" keyTimes="0;0.2;1" dur="2.8s" begin={delay + 's'} repeatCount="indefinite" fill="freeze" />
                </line>
              </g>
            );
          });
          return meteorElements;
        })()}
        </g>
      </svg>
      {/* Nội dung chính */}
      <div style={{position: "relative", zIndex: 1}}>
        <div style={{maxWidth: 700, margin: "0 auto 24px auto", display: "flex", alignItems: "center", gap: 16}}>
          <Link href="/" style={{
            background: "#ee4c40",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 16,
            cursor: "pointer",
            transition: "background 0.18s, transform 0.18s"
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#d63a2a'}
          onMouseLeave={e => e.currentTarget.style.background = '#ee4c40'}
          >← Trang chủ</Link>
          <input
            type="text"
            placeholder="Tìm kiếm phòng, tiện ích..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{flex: 1, padding: "10px 16px", borderRadius: 8, border: "1px solid #ccc", fontSize: 16}}
          />
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
          maxWidth: 3*340 + 2*24, // 3 khung + 2 khoảng cách
          margin: "0 auto"
        }}>
          {(() => {
            const filteredRooms = rooms.filter(room =>
              room.name.toLowerCase().includes(search.toLowerCase()) ||
              room.amenities.join(",").toLowerCase().includes(search.toLowerCase())
            );
            const pagedRooms = filteredRooms.slice((page-1)*perPage, page*perPage);
            return pagedRooms.length === 0 ? (
              <div style={{color: "#ee4c40", fontWeight: 700, fontSize: 18, marginTop: 32}}>Không tìm thấy phòng phù hợp.</div>
            ) : (
              pagedRooms.map((room) => (
                <div key={room.name} style={{flex: "0 0 320px", maxWidth: 320, minWidth: 280, boxSizing: "border-box"}}>
                  <RoomCard room={room} />
                </div>
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
          return totalPages > 1 ? (
            <div style={{display: "flex", justifyContent: "center", gap: 8, marginTop: 32}}>
              {Array.from({length: totalPages}, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i+1)}
                  style={{
                    background: page === i+1 ? "#ee4c40" : "#fff",
                    color: page === i+1 ? "#fff" : "#232329",
                    border: "1px solid #ee4c40",
                    borderRadius: 8,
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontWeight: 700,
                    fontSize: 16
                  }}
                >
                  {i+1}
                </button>
              ))}
            </div>
          ) : null;
        })()}
      </div>
    </div>
  );
}