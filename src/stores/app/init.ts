import { forward } from '../../lib/effector'
import { resetApp } from './index'
import { resetAmount } from '../deposit'
import { resetFee } from '../fee'
import { resetPaymentSystems, resetPaymentSystemsSelectedId } from '../paymentSystems'
import { resetIframeUrl } from '../processing'

forward({
  from: resetApp,
  to: [resetAmount, resetFee, resetPaymentSystems, resetPaymentSystemsSelectedId, resetIframeUrl],
})
