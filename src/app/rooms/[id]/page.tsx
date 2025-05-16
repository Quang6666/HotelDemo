import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Danh sách phòng đồng bộ với trang /rooms
const ROOMS = [
  {
    id: "superior",
    name: "Superior",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng Superior rộng 25m², 2 người, view thành phố, Wifi, TV, Mini Bar.",
    features: ["25m²", "2 người", "View thành phố", "Wifi", "TV", "Mini Bar"],
    status: "Còn phòng",
    price: "1.200.000đ/đêm"
  },
  {
    id: "deluxe",
    name: "Deluxe",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng Deluxe 32m², 3 người, ban công, bồn tắm, sofa, máy pha cà phê.",
    features: ["32m²", "3 người", "Ban công", "Bồn tắm", "Sofa", "Máy pha cà phê"],
    status: "Còn phòng",
    price: "1.800.000đ/đêm"
  },
  {
    id: "suite",
    name: "Suite",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng Suite 50m², 4 người, phòng khách riêng, bếp nhỏ, view biển.",
    features: ["50m²", "4 người", "Phòng khách riêng", "Bếp nhỏ", "View biển"],
    status: "Hết phòng",
    price: "2.500.000đ/đêm"
  },
  {
    id: "family-room",
    name: "Family Room",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng rộng rãi, phù hợp gia đình, tiện nghi đầy đủ.",
    features: ["2 giường đôi", "Bàn làm việc", "Tủ lạnh", "Phòng tắm riêng"],
    status: "Còn phòng",
    price: "2.000.000đ/đêm"
  },
  {
    id: "executive",
    name: "Executive",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Không gian sang trọng, dịch vụ cao cấp, rất hài lòng cho công tác.",
    features: ["Phòng họp riêng", "Bồn tắm Jacuzzi", "Máy pha cà phê", "View toàn cảnh"],
    status: "Còn phòng",
    price: "3.000.000đ/đêm"
  },
  {
    id: "presidential-suite",
    name: "Presidential Suite",
    images: [
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Đẳng cấp, tiện nghi tuyệt vời, trải nghiệm như tổng thống!",
    features: ["Phòng khách lớn", "Bếp riêng", "Bồn tắm sang trọng", "Ban công rộng"],
    status: "Còn phòng",
    price: "6.000.000đ/đêm"
  },
  {
    id: "business-room",
    name: "Business Room",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng tiện nghi cho công tác, yên tĩnh, sạch sẽ.",
    features: ["Bàn làm việc", "Wifi tốc độ cao", "TV", "Mini Bar"],
    status: "Còn phòng",
    price: "1.600.000đ/đêm"
  },
  {
    id: "standard",
    name: "Standard",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Giá tốt, phòng sạch, đủ tiện nghi cơ bản.",
    features: ["Wifi miễn phí", "TV", "Điều hòa", "Tủ lạnh"],
    status: "Còn phòng",
    price: "1.000.000đ/đêm"
  },
  {
    id: "twin-room",
    name: "Twin Room",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng phù hợp bạn bè, tiện nghi ổn.",
    features: ["2 giường đơn", "TV", "Tủ lạnh", "Phòng tắm riêng"],
    status: "Còn phòng",
    price: "1.300.000đ/đêm"
  },
  {
    id: "king-room",
    name: "King Room",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng rộng, view đẹp, giường lớn thoải mái.",
    features: ["Giường King", "Bồn tắm lớn", "Ban công", "View thành phố"],
    status: "Còn phòng",
    price: "2.200.000đ/đêm"
  },
  {
    id: "studio",
    name: "Studio",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng tiện nghi, phù hợp ở dài ngày.",
    features: ["Bếp nhỏ", "Bàn ăn", "TV", "Wifi miễn phí"],
    status: "Còn phòng",
    price: "1.700.000đ/đêm"
  },
  {
    id: "penthouse",
    name: "Penthouse",
    images: [
      "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Không gian đẳng cấp, cực kỳ sang trọng.",
    features: ["Sân thượng riêng", "Bồn tắm sang trọng", "View toàn cảnh", "Phòng khách lớn"],
    status: "Còn phòng",
    price: "7.000.000đ/đêm"
  },
  {
    id: "single-room",
    name: "Single Room",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng nhỏ gọn, giá rẻ, phù hợp đi công tác.",
    features: ["Giường đơn", "Wifi miễn phí", "TV"],
    status: "Còn phòng",
    price: "900.000đ/đêm"
  },
  {
    id: "triple-room",
    name: "Triple Room",
    images: [
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng rộng, phù hợp nhóm bạn hoặc gia đình nhỏ.",
    features: ["3 giường đơn", "Bàn làm việc", "Tủ lạnh", "Phòng tắm riêng"],
    status: "Còn phòng",
    price: "1.900.000đ/đêm"
  },
  {
    id: "queen-room",
    name: "Queen Room",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Phòng đẹp, tiện nghi, giường lớn.",
    features: ["Giường Queen", "Ban công", "Bồn tắm", "View thành phố"],
    status: "Còn phòng",
    price: "2.000.000đ/đêm"
  },
  {
    id: "connecting-room",
    name: "Connecting Room",
    images: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    ],
    desc: "Rất tiện cho gia đình đông người hoặc nhóm bạn.",
    features: ["2 phòng thông nhau", "2 phòng tắm", "Bếp nhỏ", "TV"],
    status: "Còn phòng",
    price: "2.400.000đ/đêm"
  }
];

export default function RoomDetail({ params }: { params: { id: string } }) {
  const room = ROOMS.find(r => r.id === params.id);
  if (!room) return notFound();

  return (
    <main className="room-detail-page">
      <div className="room-detail-container">
        <Link href="/rooms" className="room-detail-back-btn">
          ← Quay lại danh sách phòng
        </Link>
        <div className="room-detail-gallery">
          {room.images.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt={room.name}
              className="room-detail-img"
              width={600}
              height={450}
              style={{objectFit: 'cover', borderRadius: '18px'}}
              priority={i === 0}
            />
          ))}
        </div>
        <div className="room-detail-info">
          <h1>{room.name}</h1>
          <div className={`room-detail-status${room.status === 'Còn phòng' ? ' available' : ' unavailable'}`}>
            {room.status}
          </div>
          <div className="room-detail-price">{room.price}</div>
          <p className="room-detail-desc">{room.desc}</p>
          <ul className="room-detail-features">
            {room.features.map(f => <li key={f}>{f}</li>)}
          </ul>
          <button className="btn-accent" disabled={room.status !== 'Còn phòng'}>
            {room.status === 'Còn phòng' ? 'Đặt phòng ngay' : 'Hết phòng'}
          </button>
        </div>
      </div>
    </main>
  );
}
