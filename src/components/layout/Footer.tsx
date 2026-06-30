import { Link } from 'react-router-dom'

interface FooterMenuItem {
  label: string
  path: string
}

interface FooterMenu {
  title: string
  items: FooterMenuItem[]
}

const footerMenus: FooterMenu[] = [
  {
    title: '회사소개',
    items: [
      { label: '회사개요', path: '/company' },
      { label: '경영이념', path: '/company' },
      { label: '비전', path: '/company' },
      { label: '조직안내', path: '/company' },
    ],
  },
  {
    title: '사업분야',
    items: [
      { label: '콜드체인물류', path: '/business' },
      { label: '편의점 물류', path: '/business' },
      { label: '물류 운영 관리', path: '/business' },
    ],
  },
  {
    title: '물류솔루션',
    items: [
      { label: '통합 관리 시스템', path: '/solution' },
      { label: '역할별 관리 시스템', path: '/solution' },
      { label: '온도 모니터링', path: '/solution' },
    ],
  },
  {
    title: '물류정보',
    items: [
      { label: '콜드체인이란?', path: '/logistics-info' },
      { label: '편의점 물류 흐름', path: '/logistics-info' },
      { label: '상품 품질 관리', path: '/logistics-info' },
      { label: '물류정보', path: '/logistics-info' },
    ],
  },
  {
    title: '고객지원',
    items: [
      { label: '공지사항', path: '/support' },
      { label: '자주 묻는 질문', path: '/support' },
      { label: '이용안내', path: '/support' },
      { label: '문의안내', path: '/support' },
    ],
  },
  {
    title: '인재채용',
    items: [{ label: '인재채용', path: '/recruit' }],
  },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand-area">
            <Link to="/" className="site-footer__brand">
              <span className="site-footer__logo-mark" aria-hidden="true">
                <img src="/logo-icon.svg" alt="" />
              </span>
              <span className="site-footer__logo-text">CoolRoute</span>
            </Link>

            <div className="site-footer__info">
              <div className="site-footer__info-group">
                <span className="site-footer__info-label">ADDRESS</span>
                <p>서울특별시 강남구 테헤란로 000, 00층</p>
              </div>

              <div className="site-footer__info-group">
                <span className="site-footer__info-label">TEL</span>
                <p>1666-0000</p>
              </div>
            </div>
          </div>

          <nav className="site-footer__nav" aria-label="Footer navigation">
            {footerMenus.map((menu) => (
              <div key={menu.title} className="site-footer__menu">
                <h2 className="site-footer__menu-title">{menu.title}</h2>
                <ul className="site-footer__menu-list">
                  {menu.items.map((item) => (
                    <li key={`${menu.title}-${item.label}`}>
                      <Link to={item.path} className="site-footer__menu-link">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="site-footer__support">
            <h2 className="site-footer__support-title">고객지원</h2>
            <div className="site-footer__support-list">
              <div>
                <span className="site-footer__support-label">운영 시간</span>
                <p className="site-footer__support-text">
                  평일 09:00 ~ 18:00 · 주말·공휴일 휴무
                </p>
              </div>
              <div>
                <span className="site-footer__support-label">이메일</span>
                <p className="site-footer__support-text">
                  support@coolroute.co.kr
                </p>
              </div>
            </div>
            <Link to="/login" className="site-footer__login">
              시스템 로그인
            </Link>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__bottom-left">
            <ul className="site-footer__policy-list">
              <li>
                <Link to="/support">개인정보처리방침</Link>
              </li>
              <li>
                <Link to="/support">이용약관</Link>
              </li>
              <li>
                <Link to="/support">이메일무단수집거부</Link>
              </li>
              <li>
                <Link to="/support">윤리경영 제보</Link>
              </li>
              <li>
                <Link to="/support">사이트맵</Link>
              </li>
            </ul>

            <p className="site-footer__company">
              (주)쿨루트 · 대표이사 홍길동 · 사업자등록번호 000-00-00000 ·
              통신판매업신고 2026-서울강남-0000 · 화물자동차 운송사업 허가
              제0000호
            </p>

            <p className="site-footer__copy">
              © 2026 CoolRoute. All rights reserved.
            </p>
          </div>

          <p className="site-footer__slogan">편의점 콜드체인 물류 시스템</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
