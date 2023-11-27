import { BigInt } from '@graphprotocol/graph-ts'
import {
  TokensAdded as TokensAddedEvent,
  TokensPulled as TokensPulledEvent,
  TokensRemoved as TokensRemovedEvent,
} from '../generated/Billing/Billing'
import { Account as AccountEntity } from '../generated/schema'

export function handleTokensAdded(event: TokensAddedEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (!account) {
    account = new AccountEntity(event.params.user.toHex())
    account.billingBalance = BigInt.fromI32(0)
    // Initialize other necessary fields
  }

  account.billingBalance = account.billingBalance.plus(event.params.amount)
  account.save()
}

export function handleTokensPulled(event: TokensPulledEvent): void {
  let account = AccountEntity.load(event.params.user.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
  // Consider handling the case where the account does not exist
}

export function handleTokensRemoved(event: TokensRemovedEvent): void {
  let account = AccountEntity.load(event.params.from.toHex())
  if (account) {
    account.billingBalance = account.billingBalance.minus(event.params.amount)
    account.save()
  }
  // Additional logic may be required for removed tokens
}
