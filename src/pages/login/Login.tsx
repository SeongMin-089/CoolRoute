import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { DashboardRole } from '../../data/dashboardData'
import { setStoredDashboardRole } from '../../utils/dashboardAuth'

const roleOptions: Array<{
  id: DashboardRole
  label: string
  path: string
  description: string
}> = [
  {
    id: 'store',
    label: '편의점주',
    path: '/dashboard/store',
    description: '발주, 배송 현황, 폐기 상품을 확인합니다.',
  },
  {
    id: 'driver',
    label: '물류기사',
    path: '/dashboard/driver',
    description: '오늘 배송 목록과 배송 처리 상태를 확인합니다.',
  },
  {
    id: 'center',
    label: '물류센터',
    path: '/dashboard/center',
    description: '재고, 주문 처리, 입출고 현황을 확인합니다.',
  },
]

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRoleId, setSelectedRoleId] = useState(roleOptions[0].id)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedRole =
    roleOptions.find((role) => role.id === selectedRoleId) ?? roleOptions[0]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username !== 'admin' || password !== '1234') {
      setErrorMessage('아이디 또는 비밀번호를 확인해주세요.')
      return
    }

    setErrorMessage('')
    setStoredDashboardRole(selectedRole.id)
    navigate(selectedRole.path)
  }

  return (
    <main className="login-page">
      <section className="login-card" aria-labelledby="login-title">
        <div className="login-card__header">
          <h1 id="login-title" className="login-card__title">
            로그인
          </h1>
          <p className="login-card__desc">
            접속 역할을 선택하고 로그인하세요.
          </p>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit}>
          <div className="login-card__field">
            <label htmlFor="login-id">아이디</label>
            <input
              id="login-id"
              name="login-id"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="아이디를 입력하세요"
              autoComplete="username"
            />
          </div>

          <div className="login-card__field">
            <label htmlFor="login-password">비밀번호</label>
            <input
              id="login-password"
              name="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력하세요"
              autoComplete="current-password"
            />
          </div>

          <div className="login-card__field">
            <span>접속 역할</span>
            <div className="login-card__roles" role="tablist">
              {roleOptions.map((role) => {
                const isActive = selectedRoleId === role.id

                return (
                  <button
                    key={role.id}
                    type="button"
                    className={`login-card__role${
                      isActive ? ' is-active' : ''
                    }`}
                    onClick={() => setSelectedRoleId(role.id)}
                    role="tab"
                    aria-selected={isActive}
                  >
                    {role.label}
                  </button>
                )
              })}
            </div>
            <p className="login-card__role-desc">{selectedRole.description}</p>
          </div>

          {errorMessage && (
            <p className="login-card__error" role="alert">
              {errorMessage}
            </p>
          )}

          <div className="login-card__options">
            <label>
              <input type="checkbox" name="remember-login" />
              <span>로그인 상태 유지</span>
            </label>
            <a href="#" onClick={(event) => event.preventDefault()}>
              비밀번호 찾기
            </a>
          </div>

          <button className="login-card__submit" type="submit">
            로그인
          </button>
        </form>
      </section>
    </main>
  )
}

export default Login
