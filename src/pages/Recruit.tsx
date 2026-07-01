import PageHero from "../components/common/PageHero";
import SectionBlock from "../components/common/SectionBlock";
import SubNav from "../components/navigation/SubNav";
import { subNavItems } from "../data/subNavData";

const talentCards = [
  {
    icon: "🛡",
    title: "책임감",
    desc: "약속한 온도와 시간을 끝까지 지키는 책임감을 가진 사람. 작은 변화도 소홀히 여기지 않으며 품질을 지키는 자세를 중요하게 생각합니다.",
    tag: "콜드체인서비스사람",
    color: "green",
  },
  {
    icon: "⚡",
    title: "실행력",
    desc: "현장의 문제를 빠르게 파악하고 바로 움직이는 실행력. 불확실성 속에서도 답을 찾고 실제 행동으로 이어지는 사람.",
    tag: "빠르게움직이는사람",
    color: "blue",
  },
  {
    icon: "📊",
    title: "데이터 사고",
    desc: "숫자와 데이터를 판단하고 개선하는 데이터 기반 사고. 감이 아닌 근거로 의사결정하며 지속적으로 개선하는 사람.",
    tag: "데이터로말하는사람",
    color: "orange",
  },
];

const jobs = [
  {
    label: "FIELD",
    title: "물류 운영",
    desc: "저온 물류센터와 재고 흐름을 관리합니다.",
  },
  {
    label: "DRIVE",
    title: "저온 배송",
    desc: "냉장·냉동 차량으로 점포 배송을 수행합니다.",
  },
  {
    label: "TECH",
    title: "시스템 개발",
    desc: "관제 업무 흐름을 플랫폼으로 개발합니다.",
  },
  {
    label: "PLAN",
    title: "물류 기획",
    desc: "네트워크 전략과 데이터 분석을 담당합니다.",
  },
];

const benefits = [
  {
    icon: "⏱",
    title: "유연 근무",
    desc: "직무별 탄력 근무와 교대 보상 체계를 운영합니다.",
  },
  {
    icon: "♡",
    title: "건강·안전",
    desc: "정기 건강검진과 현장 안전 장비를 지원합니다.",
  },
  {
    icon: "🎓",
    title: "성장 지원",
    desc: "사내 교육제도와 직무 역량 강화를 지원합니다.",
  },
  {
    icon: "🎁",
    title: "복리 후생",
    desc: "명절 선물, 경조사, 생활 복지 등 다양한 복지를 제공합니다.",
  },
  {
    icon: "👥",
    title: "팀 문화",
    desc: "정기 회고와 워크숍을 통해 수평적인 소통 문화를 만듭니다.",
  },
  {
    icon: "🏠",
    title: "주거 지원",
    desc: "장거리 근무자 대상 숙소 및 기숙사 연계를 지원합니다.",
  },
];

const postings = [
  {
    field: "FIELD",
    type: "정규직",
    title: "물류 운영 담당",
    desc: "저온 물류센터 재고 운영 · 출고/반품",
    location: "서울 성동구",
    career: "0~2년",
  },
  {
    field: "DRIVE",
    type: "정규직",
    title: "저온 배송 기사",
    desc: "냉장·냉동 차량 운행 · 점포 배송",
    location: "경기 북부",
    career: "0~2년",
  },
  {
    field: "PLAN",
    type: "계약직",
    title: "물류 시스템 개발자",
    desc: "관제 플랫폼 흐름 개발 · 정비",
    location: "서울 강남구",
    career: "0~4년",
  },
  {
    field: "PLAN",
    type: "계약직",
    title: "물류 기획자",
    desc: "네트워크 설계 데이터 분석 · 정리",
    location: "서울 강남구",
    career: "0~4년",
  },
];

function Recruit() {
  return (
    <div className="page page--recruit">
      <PageHero
        title="인재채용"
        description="콜드체인의 신선함을 끝까지 지키는 사람들. CoolRoute와 함께 성장할 인재를 찾습니다."
      />

      <SubNav items={subNavItems.recruit} />

      <div className="recruit-content">
        <SectionBlock id="talent" title="인재상">
          <p className="recruit-section-desc">
            CoolRoute가 함께하고 싶은 사람들의 모습입니다.
          </p>

          <div className="talent-grid">
            {talentCards.map((card) => (
              <article className="talent-card" key={card.title}>
                <div
                  className={`talent-card__icon talent-card__icon--${card.color}`}
                >
                  {card.icon}
                </div>

                <h3>{card.title}</h3>
                <p>{card.desc}</p>

                <span
                  className={`talent-card__tag talent-card__tag--${card.color}`}
                >
                  #{card.tag}
                </span>
              </article>
            ))}
          </div>

          <div className="recruit-image-card">
            <img src="/recruit-talent.png" alt="인재상 이미지" />
            <span>데이터로 함께 판단하는 팀 문화</span>
          </div>
        </SectionBlock>

        <SectionBlock id="job" title="직무 소개">
          <div className="job-grid">
            {jobs.map((job) => (
              <article className="job-item" key={job.title}>
                <span>{job.label}</span>
                <h3>{job.title}</h3>
                <p>{job.desc}</p>
              </article>
            ))}
          </div>

          <div className="recruit-image-card">
            <img src="/recruit-job.png" alt="직무 소개 이미지" />
            <span>현장에서 품질을 지키는 사람들</span>
          </div>
        </SectionBlock>

        <SectionBlock id="benefit" title="복지">
          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.title}>
                <div className="benefit-card__icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </article>
            ))}
          </div>

          <div className="recruit-image-card">
            <img src="/recruit-benefit.png" alt="복지 이미지" />
            <span>팀원들의 성장을 지지하는 사람들</span>
          </div>
        </SectionBlock>

        <SectionBlock id="posting" title="채용 공고">
          <div className="posting-grid">
            {postings.map((posting) => (
              <article className="posting-card" key={posting.title}>
                <div className="posting-card__labels">
                  <span className="posting-card__field">{posting.field}</span>
                  <span className="posting-card__type">{posting.type}</span>
                </div>

                <h3>{posting.title}</h3>
                <p>{posting.desc}</p>

                <ul>
                  <li>근무지 · {posting.location}</li>
                  <li>경력 · {posting.career}</li>
                </ul>

                <button type="button">지원하기</button>
              </article>
            ))}
          </div>

          <div className="posting-bottom">
            <div>
              <h3>지금 채용 중인 포지션을 확인하세요</h3>
              <p>
                물류 운영, 저온 배송, 시스템 개발, 물류 기획 부문에서 함께할
                동료를 찾고 있습니다.
              </p>
            </div>

            <button type="button">전체 공고보기</button>
          </div>
        </SectionBlock>
      </div>
    </div>
  );
}

export default Recruit;
