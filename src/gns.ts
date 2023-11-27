import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
  // Import other events if needed
} from '../generated/Billing/Billing'
import { Account as AccountEntity } from '../generated/schema'

// Handle the TokensAdded event
export function handleTokensAdded(event: TokensAddedEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
  }
  account.billingBalance = account.billingBalance.plus(event.params.amount)
  account.save()
}

// Handle the TokensPulled event
export function handleTokensPulled(event: TokensPulledEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
}

// Handle the TokensRemoved event
export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let account = AccountEntity.load(event.params.from.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
}
