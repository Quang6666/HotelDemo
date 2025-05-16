'use client';
import React, { useRef, useEffect } from "react";

export default function Home() {
  // Hiệu ứng nền gradient động theo chuột
  const bgRef = useRef<HTMLDivElement>(null);
  // Lưu vị trí mục tiêu và vị trí hiện tại để easing
  const pos = useRef({ x: 50, y: 50 }); // phần trăm
  const target = useRef({ x: 50, y: 50 });
  useEffect(() => {
    let running = true;
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      target.current = {
        x: (e.clientX / w) * 100,
        y: (e.clientY / h) * 100,
      };
    };
    const animate = () => {
      // easing
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;
      if (bgRef.current) {
        bgRef.current.style.background = `radial-gradient(circle at ${pos.current.x}% ${pos.current.y}%, #6dd5ed 0%, #2193b0 40%, #6e45e2 80%, #232946 100%)`;
        bgRef.current.style.filter = 'brightness(0.7) blur(0.5px)';
      }
      if (running) requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', handleMove);
    animate();
    return () => {
      running = false;
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);
  return (
    <>
      {/* Nền gradient động theo chuột, chỉ đổi màu background gốc */}
      <div
        ref={bgRef}
        className="interactive-bg"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1, // Đảm bảo nằm dưới mọi section
          pointerEvents: 'none',
          transition: 'background 0.2s',
          willChange: 'background',
          filter: 'brightness(0.1) blur(0.5px)',
        }}
        aria-hidden="true"
      />
      <header className="header">
        <div className="logo">FirstHotel</div>
        <nav className="nav">
          <a href="#services">Dịch vụ</a>
          <a href="#about">Giới thiệu</a>
          <a href="/contact-booking">Liên hệ</a>
          <span className="badge">Top Hotel 2025</span>
        </nav>
      </header>
      <section className="hero hero-grid-bg" id="home">
        <div className="hero-content">
          <h1>Khách sạn FirstHotel</h1>
          <p>Đặt phòng khách sạn cao cấp, tiện nghi, giá tốt!</p>
          <button className="btn-accent" onClick={() => window.location.href = '/rooms'} type="button">
            Đặt phòng ngay <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="hero-icons">
          <i className="fas fa-bed"></i>
          <i className="fas fa-swimmer"></i>
          <i className="fas fa-utensils"></i>
          <i className="fas fa-spa"></i>
        </div>
        <div className="social-bar">
          <a href="#" title="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="#" title="Zalo"><i className="fas fa-comment-dots"></i></a>
          <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" title="Tripadvisor"><i className="fab fa-tripadvisor"></i></a>
        </div>
      </section>
      <section className="divider"></section>
      <section className="featured-rooms" id="rooms">
        <div className="section-sub">PHÒNG NỔI BẬT</div>
        <h2 className="section-title">Các phòng yêu thích</h2>
        <div className="room-cards">
          <div className="room-card">
            <div className="room-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80')"}}></div>
            <div className="room-info">
              <h3>Superior</h3>
              <p>25m², 2 người, View thành phố, Wifi, TV, Mini Bar</p>
              <button className="btn-outline">Chi tiết phòng</button>
            </div>
          </div>
          <div className="room-card">
            <div className="room-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80')"}}></div>
            <div className="room-info">
              <h3>Deluxe</h3>
              <p>32m², 3 người, Ban công, Bồn tắm, Sofa, Máy pha cà phê</p>
              <button className="btn-outline">Chi tiết phòng</button>
            </div>
          </div>
          <div className="room-card">
            <div className="room-img" style={{backgroundImage: "url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80')"}}></div>
            <div className="room-info">
              <h3>Suite</h3>
              <p>50m², 4 người, Phòng khách riêng, Bếp nhỏ, View biển</p>
              <button className="btn-outline">Chi tiết phòng</button>
            </div>
          </div>
        </div>
      </section>
      <section className="divider"></section>
      <section className="services" id="services">
        <div className="section-sub">TIỆN ÍCH & DỊCH VỤ</div>
        <h2 className="section-title">Dịch vụ nổi bật</h2>
        <div className="service-list">
          <div className="service-item"><i className="fas fa-utensils"></i> Nhà hàng ẩm thực</div>
          <div className="service-item"><i className="fas fa-spa"></i> Spa & Massage</div>
          <div className="service-item"><i className="fas fa-shuttle-van"></i> Xe đưa đón sân bay</div>
          <div className="service-item"><i className="fas fa-map-marked-alt"></i> Tour tham quan</div>
          <div className="service-item"><i className="fas fa-wifi"></i> Wifi miễn phí</div>
          <div className="service-item"><i className="fas fa-swimmer"></i> Hồ bơi ngoài trời</div>
        </div>
      </section>
      <section className="divider"></section>
      <footer className="footer" id="contact">
        <div className="footer-logo">FirstHotel</div>
        <div className="footer-info">
          <div>Hotline: 0123 456 789</div>
          <div>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</div>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-tripadvisor"></i></a>
          </div>
          <div className="copyright">© 2025 FirstHotel. All rights reserved.</div>
        </div>
      </footer>
      <a href="/rooms" className="floating-btn"><i className="fas fa-phone-alt"></i> Đặt phòng</a>
    </>
  );
}
