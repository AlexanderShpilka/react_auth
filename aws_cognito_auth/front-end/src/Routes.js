import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { PrivateRoute } from './auth/PrivateRoute'
import { UserInfoPage } from './pages/UserInfoPage'
import { LogInPage } from './pages/LogInPage'
import { SignUpPage } from './pages/SignUpPage'
import { PleaseVerifyEmailPage } from './pages/PleaseVerifyEmailPage'
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage'
import { EmailVerificationCodePage } from './pages/EmailVerificationCodePage'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' exact>
          <UserInfoPage />
        </PrivateRoute>

        <Route path='/login' exact>
          <LogInPage />
        </Route>

        <Route path='/reset-password' exact>
          <PasswordResetLandingPage />
        </Route>

        <Route path='/please-verify' exact>
          <PleaseVerifyEmailPage />
        </Route>

        <Route path='/verify-email/:verificationString' exact>
          <EmailVerificationLandingPage />
        </Route>

        <Route path='/verify-email' exact>
          <EmailVerificationCodePage />
        </Route>

        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>

        <Route path='/signup' exact>
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  )
}
