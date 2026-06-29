import { useNavigate } from 'react-router-dom'
import PageHero from '../../components/common/PageHero'

function Login() {
  const navigate = useNavigate()

  return (
    <div className="page page--login">
      <PageHero title="로그인" />
      <section className="login-panel">
        <h2>Role select placeholder</h2>
        <div className="login-panel__actions">
          <button type="button" onClick={() => navigate('/dashboard/store')}>
            점주
          </button>
          <button type="button" onClick={() => navigate('/dashboard/driver')}>
            배송기사
          </button>
          <button type="button" onClick={() => navigate('/dashboard/center')}>
            물류센터
          </button>
        </div>
      </section>
    </div>
  )
}

export default Login
